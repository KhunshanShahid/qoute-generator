import React from 'react'
import styles from '../styles/Loader.module.css'


const Loader = () => {
  return (
    
     <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}>
      </div>
    </div>
    
  )
}

export default Loader
