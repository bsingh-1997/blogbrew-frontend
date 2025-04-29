// import React, { useState } from 'react';
// import axios from 'axios';

// const Settings = ({ token }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [image, setImage] = useState(null);
//   const [removeImage, setRemoveImage] = useState(false);
//   const [oldPassword, setOldPassword] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
// const [error, setError] = useState('');

//   const userInfo = JSON.parse(localStorage.getItem('user'));
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     if (name) formData.append('name', name);
//     if (email) formData.append('email', email);
//     if (image) formData.append('image', image);
//     if (removeImage) formData.append('removeImage', true);
//     if (oldPassword && password) {
//       formData.append('oldPassword', oldPassword);
//       formData.append('password', password);
//     }

//     // try {
//     //   const res = await axios.put('http://localhost:5000/api/profile', formData, {
//     //     headers: {
//     //       Authorization: `Bearer ${token}`,
//     //     },
//     //   });
//     //   console.log('Profile updated:', res.data);
//     // } catch (err) {
//     //   console.error('Error updating profile:', err);
//     // }
//     try {
//         const res = await axios.put('http://localhost:5000/api/profile', formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setMessage(res.data.message); // success message
//         setError('');
//       } catch (err) {
//         console.error('Error updating profile:', err);
//         setMessage('');
//         if (err.response && err.response.data && err.response.data.message) {
//           setError(err.response.data.message);
//         } else {
//           setError('Something went wrong');
//         }
//       }
      
//   };

//   return (
//       <div>
//         {userInfo?(
//             <form onSubmit={handleSubmit}>
//             <h2>Update Your Profile</h2>
//             <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
//             <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//             <input type="file" onChange={e => setImage(e.target.files[0])} />
//             <label>
//               <input type="checkbox" checked={removeImage} onChange={() => setRemoveImage(!removeImage)} />
//               Remove existing image
//             </label>
//             <input type="password" placeholder="Old Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
//             <input type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} />
//             <button type="submit">Save Changes</button>
//           </form>
//         ):(
//             <p>Please Login first before accessing this page !</p>
//         )}

    
//     </div>
//   );
// };

// export default Settings;




import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    if (name.trim()) formData.append('name', name);
    if (email.trim()) formData.append('email', email);
    if (image) formData.append('image', image);
    if (removeImage) formData.append('removeImage', 'true');
    if (oldPassword && password) {
      formData.append('oldPassword', oldPassword);
      formData.append('password', password);
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user.token)
      const res = await axios.put(`${process.env.REACT_APP_URL}/api/profile`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      

      const updatedUser = {
        ...user, // keeps token and anything else
        name: res.data.name,
        email: res.data.email,
        image: res.data.image,
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));


      setMessage(res.data.message);
      setError('');
      setTimeout(() => {
        window.location.reload(); // This reloads the full page
      }, 2000);
    } catch (err) {
      setMessage('');
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Update Your Settings</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input
          type="email"
          placeholder="New Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <input
            type="checkbox"
            checked={removeImage}
            onChange={(e) => setRemoveImage(e.target.checked)}
          />{" "}
          Remove current image
        </label>
        <Link to='forgot-password'>Forgot password?</Link>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Update Profile</button>
      </form>

      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default Settings;
