import axios from 'axios'
import React, { useEffect } from 'react'

const Testcom = () => {

    useEffect(() => {
        axios.get('http://localhost:8000/user/test')
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [])
    
  return (
    <div>Testcom</div>
  )
}

export default Testcom