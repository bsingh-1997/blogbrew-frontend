import React from 'react'
import './css/footer.css'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Footer = () => {
  const handlefbtn = ()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <div className='footer'> 
      <div className='footer1'>
        
        <div className='sec1'>
          <div>

          <h1>Barinder Singh</h1>
          </div>
          <div className='grey'>

          <p>Kurukshetra, Haryana.</p>
          <p style={{color:"orangered"}}>Blogbrewofficial@gmail.com</p>
          </div>
        </div>
        <div className='sec2'>
          <h1>Category</h1>
          <div className='cats'>

          <div className='cat1'>
          <p>Technology</p>
          <p>Travel</p>
          <p>Food</p>
          </div>
          <div className='cat1'>
          <p>Photography</p>
          <p>Fashion</p>
          <p>Travelling</p>
          </div>
          </div>
          
        </div>
        <div className='sec3'>
          <h1>Follow us</h1>
          <div className='logos'>
          <FaFacebookF/><FaTwitter /><FaPinterest/> <FaInstagram/>
          </div>
        </div>
      </div>
      <div className='footer2'>
        <div className='f2sec1'>
          <button onClick={handlefbtn} className='fbtn a'><FaArrowUp /></button>
          <p className='grey'>Copyright 2025 Blogbrew, All Rights Reserved </p>
        </div>
        <div className='f2sec1'>
          <Link to='/allblogs'>Home</Link> 
          <Link to='/about'>About </Link>
          <Link to='/'>Updates </Link>
          {/* <p><Link to='/'> </Link>Advertising</p> */}
          <Link to='/contactus'>Contact Us </Link>
          <button className='fbtn ' onClick={handlefbtn}><FaArrowUp className='arrow' /></button>
        </div>
      </div>
    </div>
  )
}

export default Footer
