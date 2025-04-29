import React from 'react'
import loadergif from './css/loader.gif'
const Loader = () => {
  return (
    <div style={{height:'40vh',display:'flex',justifyContent:'center',alignItems:'center', maxWidth:'80%',margin:'auto'}}>
      <img style={{height:'20vh'}} src={loadergif}/>
    </div>
  )
}

export default Loader
