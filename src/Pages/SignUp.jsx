import React, { useState } from 'react'
import styles from '../styles/homeStyle.module.css'
import LoginStyles from '../styles/Login.module.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [user,setUser]=useState([{
        name:"",
        email: "",
        password: "",
        
    }])

    const formHandler=(e)=>{
        e.preventDefault()
        localStorage.setItem(`Qoute-${user.name}`, JSON.stringify(user))

        toast.success('Account successfully created!');

        setUser({
            name:"",
        email: "",
        password: "",
        })
    
    }
    const dataHandler = (e)=>{
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className={styles.main} style={{ display: 'flex', flexDirection: 'column', height: '87vh' }}>
          
                <div className={LoginStyles.loginbox}>

                    <div className={LoginStyles.loginHeading}>
                        Sign up
                    </div>

                    <form className={LoginStyles.formBox} >
                        <label htmlFor="name" className={LoginStyles.inptLabel}>Name</label>
                        <input type="name" name='name'  value={user.name} onChange={dataHandler} className={LoginStyles.formInput} />
                        <label htmlFor="email" className={LoginStyles.inptLabel}>Email</label>
                        <input type="email"  name='email' value={user.email} onChange={dataHandler} className={LoginStyles.formInput} />
                        <label htmlFor="password" className={LoginStyles.inptLabel}>Password</label>
                        <input type="password" name='password' value={user.password} onChange={dataHandler} className={LoginStyles.formInput} />
                        <input type="submit" value="Sign up"  onClick={formHandler} className={LoginStyles.formBtn} />
                    </form>
                </div>

            </div>
           
        </div>
    )
}

export default SignUp
