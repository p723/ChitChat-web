import React from 'react'
import styles from './Input.module.css';

const Input = (props) => {
    return (
      <>
        <input className={styles.formControl} type="text" {...props}/>
      </> 
   )
}

export default Input;