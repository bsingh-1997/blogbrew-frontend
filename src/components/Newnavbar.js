

import './css/navbar.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import bblogo from './css/blogbrew.JPG'
import searchBarRef from './scrollRef';

export default function Newnavbar() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (searchBarRef.current) {
      searchBarRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to toggle dropdown visibility
  const [dropdownlinksVisible, setDropdownlinksVisible] = useState(false); // State to toggle dropdown visibility

  const userInfo = JSON.parse(localStorage.getItem('user'));
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  const handleLogout = () => {
    localStorage.removeItem('user');
    setDropdownlinksVisible(false)
    // setTimeout(() => {
    //     window.location.reload(); // This reloads the full page
    // }, 300);
    navigate('/allblogs');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle the dropdown visibility
  };
  const toggleDropdownlinks = () => {
    setDropdownlinksVisible(!dropdownlinksVisible); // Toggle the dropdown visibility
  };
  const close =()=>{
    setDropdownlinksVisible(false)
  }

  
  
  return (

<div className='NavBar'>
  <div className='firstlayer'>
    <div className='navLogos'> <FaFacebookF/><FaTwitter /><FaPinterest/> <FaInstagram/> </div>
    <div className='navLogos'><CiSearch onClick={handleSearchClick} size={22}/><RxHamburgerMenu size={22}  className='ham' onClick={toggleDropdownlinks} /></div>
          
  </div>
  <div className='secondlayer'>
    <img src={bblogo}/>
  </div>
  <div className={`thirdlayer ${dropdownlinksVisible?'isopen':''}` }>
  <hr/>
    <ul className='nav-btns '>
      <li><Link to='/allblogs' onClick={close}>Home</Link></li>
      <li><Link to='/about' onClick={close}>About</Link></li>
      
      <li><Link to='/contactus'onClick={close}>Contact Us</Link> </li>
      
      {userInfo?(
        <>
        <li><Link onClick={close} to='/dashboard'>Dashboard</Link> </li>
        <li className='userdetailsweb'> <img src={userInfo.image || defaultAvatar} onClick={toggleDropdown}  style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '1px solid #ccc',
            cursor: 'pointer',
        }}/> </li>



        </>

        
      ):(
        <>
        <li><Link onClick={close} to='/login' >Login</Link> </li>
        <li><Link onClick={close} to='/signup'>Signup</Link> </li>
        </>

      )}
     


     <div className='opendropdown'>
     {userInfo &&
<>
{dropdownlinksVisible &&  (
  <div className='opendropcontainer'>

  <div className='drop'>
    <div className='drop1'>

  <img src={userInfo.image || defaultAvatar}  style={{
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid #ccc',
    cursor: 'pointer',
  }}/>
  <div style={{ marginBottom: '10px', fontWeight: 'bold', color: 'red' }}>
  {userInfo.isAdmin ? "Admin Account" : "User Account"}
  </div>
  </div>
  
  
 
  <Link onClick={close} style={{
    display:'flex',
    gap:'1vw',
    alignItems:'center',
    justifyContent:'center',
    textDecoration:'none',
    color:'black'
  }} to='/settings'>Settings <IoIosSettings /> </Link>   
   <button style={{
    backgroundColor:'white',
    border:'1px solid black ',
    width:'90%'
  }} onClick={handleLogout} > Logout <CiLogout /></button> 
  </div>
</div>
)}

</>
}
     </div>

      
    </ul>
  </div>
  {/* { dropdownVisible?( <div>

<div style={{ marginBottom: '10px', fontWeight: 'bold', color: 'red' }}>
{userInfo.isAdmin ? "Admin Account" : "User Account"}
 </div>
<button onClick={handleLogout}>Logout</button>    
</div>
):('')} */}
{userInfo &&
<>
{dropdownVisible &&  (
  <div className='dropcontainer'>

  <div className='drop'>
  
  <div style={{ marginBottom: '10px', fontWeight: 'bold', color: 'red' }}>
  {userInfo.isAdmin ? "Admin Account" : "User Account"}
  </div>
  
  
  <button style={{
    backgroundColor:'white',
    border:'1px solid black ',
    width:'90%'
  }} onClick={handleLogout}> Logout <CiLogout /></button> 
  <Link style={{
    display:'flex',
    gap:'1vw',
    alignItems:'center',
    justifyContent:'center',
    textDecoration:'none',
    color:'black'
  }} to='/settings'>Settings <IoIosSettings /> </Link>   
  </div>
</div>
)}

</>
}


</div>
  );
}
