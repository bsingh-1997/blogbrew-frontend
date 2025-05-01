
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Settings = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [image, setImage] = useState(null);
//   const [removeImage, setRemoveImage] = useState(false);
//   const [oldPassword, setOldPassword] = useState('');
//   const [password, setPassword] = useState('');

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formData = new FormData();

//     if (name.trim()) formData.append('name', name);
//     if (email.trim()) formData.append('email', email);
//     if (image) formData.append('image', image);
//     if (removeImage) formData.append('removeImage', 'true');
//     if (oldPassword && password) {
//       formData.append('oldPassword', oldPassword);
//       formData.append('password', password);
//     }

//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       console.log(user.token)
//       const res = await axios.put(`${process.env.REACT_APP_URL}/api/profile`, formData, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       });
      

//       const updatedUser = {
//         ...user, // keeps token and anything else
//         name: res.data.name,
//         email: res.data.email,
//         image: res.data.image,
//       };

//       localStorage.setItem('user', JSON.stringify(updatedUser));


//       setMessage(res.data.message);
//       setError('');
//       setTimeout(() => {
//         window.location.reload(); // This reloads the full page
//       }, 2000);
//     } catch (err) {
//       setMessage('');
//       if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError('Something went wrong');
//       }
//     }
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: 'auto' }}>
//       <h2>Update Your Settings</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="New Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={{ display: 'block', marginBottom: '10px', width: '100%' }}
//         />
//         <input
//           type="email"
//           placeholder="New Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ display: 'block', marginBottom: '10px', width: '100%' }}
//         />
//         <input
//           type="file"
//           onChange={(e) => setImage(e.target.files[0])}
//           style={{ display: 'block', marginBottom: '10px' }}
//         />
//         <label style={{ display: 'block', marginBottom: '10px' }}>
//           <input
//             type="checkbox"
//             checked={removeImage}
//             onChange={(e) => setRemoveImage(e.target.checked)}
//           />{" "}
//           Remove current image
//         </label>
//         <Link to='/forgot-password'>Forgot password?</Link>
//         <input
//           type="password"
//           placeholder="Old Password"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//           style={{ display: 'block', marginBottom: '10px', width: '100%' }}
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ display: 'block', marginBottom: '10px', width: '100%' }}
//         />
//         <button type="submit" style={{ padding: '10px 20px' }}>Update Profile</button>
//       </form>

//       {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
//       {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
//     </div>
//   );
// };

// export default Settings;



import React, { useState, useEffect } from 'react';
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
  const [user, setUser] = useState(null);

  const [showName, setShowName] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) setUser(localUser);
  }, []);

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
      const res = await axios.put(`${process.env.REACT_APP_URL}/api/profile`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const updatedUser = {
        ...user,
        name: res.data.name,
        email: res.data.email,
        image: res.data.image,
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setMessage(res.data.message);
      setError('');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const isFormValid = () => {
    return (
      name.trim() ||
      email.trim() ||
      image ||
      removeImage ||
      (oldPassword && password)
    );
  };

  return (
    <div style={{ maxWidth: '80%', margin: 'auto', }}>
      <h2 style={{marginBottom:'3vh'}}>Update Your Settings</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Section */}
        <div style={{ marginBottom: '10px' }}>
          <div
            onClick={() => setShowName(!showName)}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {showName ? '▼' : '▶'} Change Name
          </div>
          {showName && (
            <input
              type="text"
              placeholder="New Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                display: 'block',
                marginTop: '5px',
                marginBottom: '10px',
                width: '100%',
                transition: 'all 0.3s ease',
              }}
            />
          )}
        </div>

        {/* Email Section */}
        <div style={{ marginBottom: '10px' }}>
          <div
            onClick={() => setShowEmail(!showEmail)}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {showEmail ? '▼' : '▶'} Change Email
          </div>
          {showEmail && (
            <input
              type="email"
              placeholder="New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                display: 'block',
                marginTop: '5px',
                marginBottom: '10px',
                width: '100%',
                transition: 'all 0.3s ease',
              }}
            />
          )}
        </div>

        {/* Image Section */}
        <div style={{ marginBottom: '10px' }}>
          <div
            onClick={() => setShowImage(!showImage)}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {showImage ? '▼' : '▶'} Update Profile Image
          </div>
          {showImage && (
            <div style={{ marginTop: '5px' }}>
              {user?.image ? (
                <div style={{ marginBottom: '10px' }}>
                  <p>Current Image:</p>
                  <img
                    src={user.image}
                    alt="Old Profile"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px' }}
                  />
                </div>
              ) : (
                <p>No profile image found.</p>
              )}
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
            </div>
          )}
        </div>

        {/* Password Section */}
        <div style={{ marginBottom: '10px' }}>
          <div
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {showPassword ? '▼' : '▶'} Change Password
          </div>
          {showPassword && (
            <div style={{ marginTop: '5px' }}>
              <Link to="/forgot-password">Forgot password?</Link>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  width: '50%',
                  transition: 'all 0.3s ease',
                }}
              />
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  width: '50%',
                  transition: 'all 0.3s ease',
                }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            background: isFormValid() ? '#007bff' : '#ccc',
            color: '#fff',
            border: 'none',
            cursor: isFormValid() ? 'pointer' : 'not-allowed',
          }}
          disabled={!isFormValid()}
        >
          Update Profile
        </button>
      </form>

      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default Settings;
