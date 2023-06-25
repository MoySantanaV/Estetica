import React from 'react'
import styles from '@/components/customInput/input.module.css'

export default function CustomInput({type, placeholder, required, error, errorMessage}) {
  return (
      <div className={styles.inputContainer}>
      <input type={type} placeholder={placeholder} required={required}></input>
      <label htmlFor='input-field'></label>
      </div>
  )
}
