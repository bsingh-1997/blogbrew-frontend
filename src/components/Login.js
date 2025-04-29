import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // Updated for React Router v6
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/login.css'
const Login = () => {
  const navigate = useNavigate();  // Updated for React Router v6
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const now = new Date();
  const expiry = now.getTime() + 24 * 60 * 60 * 1000; // 24 hours in m
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/route/login`, { email, password });
      // const response = await axios.post('http://localhost:5000/route/login', { email, password });

      // On successful login, store token and user info
    //   localStorage.setItem('token', response.data.token);
      // localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('user', JSON.stringify({...response.data,expiresAt:expiry}));
      console.log(response.data)

      toast.success('Login successful!');
      // Redirect user to a dashboard or home page
    //   navigate('/allblogs');  // Updated for React Router v6
      navigate('/dashboard');  // Updated for React Router v6
    } catch (error) {
      toast.error('Invalid credentials or error logging in!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='divcont'>

    <div className="login-container" style={{display:'flex',flexDirection:'column',gap:'1vh', width:'100%',}}>
      <h1>Login</h1>
      <form style={{width:'80%'}} onSubmit={handleLogin}>
        
          
          <input
            type="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              height:'5vh',
              width:'100%',
              border:'.5px solid grey',
              borderRadius:'4px',
              marginBottom:'2vh',
              padding:'.4vh'
            }}
            />
        
        
          
          <input
          placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required  style={{
              height:'5vh',
              width:'100%',
              border:'.5px solid grey',
              borderRadius:'4px',
              marginBottom:'2vh',
              padding:'.4vh'
            }}
            />
        
        <button type="submit" disabled={loading}  style={{
              height:'6vh',
              width:'100%',
              border:'.5px solid grey',
              borderRadius:'4px',
              marginBottom:'2vh',
              padding:'.4vh',
              backgroundColor:'blue',
              color:'white'
            }}>
          {loading ? 'Logging in...' : 'Login'} 
        </button>
      </form>
      <Link style={{ marginLeft:'30%'}} to ="/forgot-password" style={{
        textDecoration:'none',color:'blue'
      }}>Forgot Password?</Link>
      <ToastContainer />
      <div>

      Are you a new user?
      </div>
      <div>

       <Link style={{
         textDecoration:'none',color:'blue'
        }} to='/signup'>Sign up</Link> here
        </div>
    </div>
        </div>
  );
};

export default Login;
