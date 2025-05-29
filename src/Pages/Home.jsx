/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import qoute from '../assets/qoute.jpg'
import styles from '../styles/homeStyle.module.css'

export default function Home() {
  return (
    <div className={styles.main} >
      <div className={styles.mainText}>
        Make Your Day Exceptional with Magic Qoutes Daily
      </div>
      <div>
      <img src={qoute} className={styles.mainImg} />
      </div>
      
    </div>
  )
}
