import React from 'react';
import { VscGithubInverted } from 'react-icons/vsc'
import styles from './styles.module.scss'

export const LoginBox: React.FC = () => {
  return (
    <div className={styles.loginBoxWrapper} >
      <strong>Entre e compartilhe sua mensagen</strong>
      <a href="#" className={styles.signInWithGithub}>
        <VscGithubInverted size="24" />
        Entrar com github
      </a>
    </div>
  )
}
