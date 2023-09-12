import React, { useState, useEffect } from 'react'
import '../Sidebar.css'
import '../App.css'
import App from '../three/create_warehouse'
// import '../three/02-geometry.css'
import axios from 'axios'

const CreateWarehouse = () => {

    useEffect(() => {
      new App();
    }, []);
  
    return (
      <div id="webgl-container"></div>
    );
  }

export default CreateWarehouse;