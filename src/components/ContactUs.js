import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const isLoggedIn = storedUser && storedUser.token;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setFormData(prev => ({
        ...prev,
        name: storedUser.name,
        email: storedUser.email,
      }));
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_URL}/route/contactus`, formData);
      alert('Your message has been sent!');
      setFormData({
        name: isLoggedIn ? storedUser.name : '',
        email: isLoggedIn ? storedUser.email : '',
        phone: '',
        message: '',
      });
    } catch (err) {
      alert('Failed to send. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: '70%', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '3vh',marginTop:'8vh' }}
      >
      <h1>SEND US A MESSAGE</h1>
      <input style={{
        height:'5vh',
        borderRadius:'5px',
        padding:'.5vw',
        border:'.5px solid grey'
        // backgroundColor:'wheat'
      }}
      
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
        readOnly={isLoggedIn}
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
        readOnly={isLoggedIn}
        style={{
          height:'5vh',
          borderRadius:'5px',
          padding:'.5vw',
          border:'.5px solid grey'
          // backgroundColor:'wheat'
        }}
      />

      <input
        name="phone"
        type='tel'
        value={formData.phone}
        onChange={handleChange}
        pattern="[0-9]*"
        onKeyDown={(e) => {
            // Allow only numbers, backspace, delete, arrow keys
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
            if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
              e.preventDefault();
            }
          }}
        placeholder="Phone (Optional)"
        style={{
          height:'5vh',
          borderRadius:'5px',
          padding:'.5vw',
          border:'.5px solid grey'
          // backgroundColor:'wheat'
        }}
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your message..."
        required
        rows={5}
        style={{
          
          borderRadius:'5px',
          padding:'1vw',
          border:'.5px solid grey'
          // backgroundColor:'wheat'
        }}
        />

      <button type="submit" disabled={loading} style={{ position: 'relative', height: '40px' ,backgroundColor:'lightblue',borderRadius:'5px',border:'0.5px solid grey'}} >
        {loading ? (
          <>
            <span className="spinner" style={{
              width: '16px',
              height: '16px',
              border: '2px solid #fff',
              borderTop: '2px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginRight: '8px',
              display: 'inline-block',
              verticalAlign: 'middle'
            }}></span>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }
            `}
      </style>
    </form>
            </div>
  );
};

export default ContactUs;
