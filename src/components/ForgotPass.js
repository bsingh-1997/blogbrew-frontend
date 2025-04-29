import React, { useState } from 'react';
import axios from 'axios';
import './css/login.css'
const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/route/forgot-password', { email });
      setMessage(response.data.message); // Assuming backend sends message on success
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='forgpass' >
      <h1>Forgot Password</h1>
      <form  onSubmit={handleSubmit}>
        <div>
          
          <input className='inpfp' 
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className='inpfp' style={{backgroundColor:'orangered',color:'white'}} type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Submit'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPass;
