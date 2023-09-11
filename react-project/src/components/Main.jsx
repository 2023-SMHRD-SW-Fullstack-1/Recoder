import React, { useState, useEffect } from 'react'
import '../Sidebar.css'
import '../App.css'
import App from '../three/02-geometry'
import '../three/02-geometry.css'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Main = () => {

  // const isLoggedIn = false  

  useEffect(() => {
    new App(); 
    // if (!isLoggedIn) {
    //   return <Navigate to='/login' replace={true} />
    // } else {
           
    // }
  }, []);

  return (
    <div id="webgl-container"></div>
  );
}

export default Main