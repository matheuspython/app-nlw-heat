import React, { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg'
import io from 'socket.io-client'
import { api } from '../../server/api';

import styles from './styles.module.scss'
import { AuthContext } from '../../contexts/auth';

type Message = {
  id: string;
  text:string;
  user:{
    name: string;
    avatar_url: string;
  }
}

const messagesQueue: Message[] = []

const socket = io('http://localhost:4000/')
socket.on('new_message', (newMessage: Message) => {
  messagesQueue.push(newMessage);
  
})

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const {user: usuario} = useContext(AuthContext)
  useEffect(()=>{
    setInterval(()=>{
  
      if(messagesQueue.length > 0){
        setMessages(prevState =>[
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean))
        messagesQueue.shift()
      }
      
    },3000)
  },[])

  useEffect(()=>{
    api.get<Message[]>('/messages/last3').then(response =>{
      setMessages(response.data)
    })

  },[])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map(message =>{
          return(
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>

              </div>
            </li>
          )
        })}
        

      </ul>
    </div>
  );
}

export default MessageList;