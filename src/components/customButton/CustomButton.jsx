import React from 'react'
import styles from '@/components/customButton/button.module.css'

export default function CustomButton({ text, handleSubmit}) {
  return (
    <button className={styles.button} onClick={handleSubmit}>{text}</button>
  )
}
