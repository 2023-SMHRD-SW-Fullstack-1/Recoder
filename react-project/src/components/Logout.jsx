import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Logout = () => {

    const nav = useNavigate()

    useEffect(() => {
        axios.post('http://localhost:8000/user/logout')
        .then((res) => {
            console.log(res);
            if (res.data === 'ok') {
                nav('/')
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }, [])

  return (
    <div>
        
    </div>
  )
}

export default Logout