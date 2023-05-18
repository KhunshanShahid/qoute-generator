import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Card.module.css'
import Loader from './Loader'
import { SocialIcon } from 'react-social-icons'




export default function Exchange() {

  const [product, setProduct] = useState({})
  const [loader, setLoader] = useState(true)
  const [qoute, setMyQoute] = useState(true)
  const [APIData, setAPIData] = useState(true)


  useEffect(() => {
    let product= localStorage.getItem("Qoutations")
    product = JSON.parse(product)
    

    if(product){
      setProduct(product[Math.floor(Math.random()*(product.length))])
      setLoader(false)
    }
    else{
      axios.get('https://type.fit/api/quotes')
      .then(res => { localStorage.setItem("Qoutations", JSON.stringify(res.data))})
    setLoader(false)
    setAPIData(false)
    }

   
  }, [APIData])

  const changeQoute =()=>{
    setMyQoute(!qoute)
   
   
  }
useEffect(()=>{
  let product= localStorage.getItem("Qoutations")
  product = JSON.parse(product)
  setProduct(product[Math.floor(Math.random()*(product.length))]) 
},[qoute])

  return (
    <div className={styles.cardBox}>
      
      {loader? <Loader />:
      <>
      <div className={styles.qouteBox}>
        <div className={styles.mainQoute}>
        {product.text}
        </div>
        <div className={styles.Author}>
          <div className={styles.icon}>
            <SocialIcon url="https://twitter.com/jaketrent" />
            <SocialIcon url="https://facebook.com/jaketrent" />
          </div>
          <div>
           <b> ~{product.author? product.author:'UnKnown'  }</b>
            <div>
            </div>
          </div>
        </div>
      </div>
      <div >
        <button className={styles.NewBtn} onClick={changeQoute}>New Qoute</button>
      </div>
      </>

  }
    </div>
  
  )
}
