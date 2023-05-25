import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Protected = (props) => {
    const {Comp} = props;

    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.isLoggedIn); 
    useEffect(() =>{
        if(!isLoggedIn){
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div>
        <h1><Comp /></h1>
    </div>
  )
}

export default Protected