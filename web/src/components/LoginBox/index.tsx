import React from 'react';
import styles from './styles.module.scss'

export const LoginBox: React.FC = () => {
  return (
    <div className={styles.loginBoxWrapper} >
      <strong>Entre e compartilhe sua mensagen</strong>
      <a href="#" className={styles.signInWithGithub}>
        Entrar com github
      </a>
    </div>
  )
}
