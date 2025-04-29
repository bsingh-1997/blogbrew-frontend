// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const UserDashboard = () => {
//   const [userPosts, setUserPosts] = useState([]);
//   const [userInfo, setUserInfo] = useState(null);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [tags, setTags] = useState('');
// const [category, setCategory] = useState('');
// const [image, setImage] = useState(null);
//   const [editTags, setEditTags] = useState('');
// const [editCategory, setEditCategory] = useState('');
// const [editImage, setEditImage] = useState(null);

//   const [editingPost, setEditingPost] = useState(null); // holds the post being edited
// const [editTitle, setEditTitle] = useState('');
// const [editContent, setEditContent] = useState('');
// const [oldImage, setOldImage] = useState('');

// // const handleEdit = (post) => {
// //   setEditingPost(post._id);
// //   setEditTitle(post.title);
// //   setEditContent(post.content);
// // };
// const handleEdit = (post) => {
//   setEditingPost(post._id);
//   setEditTitle(post.title);
//   setEditContent(post.content);
//   setEditTags(post.tags?.join(', ') || '');
//   setEditCategory(post.category || '');

//   setOldImage(post.image || '');

//   setEditImage(null); // We’ll only upload a new one if the user chooses
// };

// // const handleUpdate = async () => {
// //   try {
// //     const res = await axios.put(
// //       `http://localhost:5000/api/${editingPost}`,
// //       { title: editTitle, content: editContent },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${userInfo.token}`,
// //         },
// //       }
// //     );

// //     toast.success('Post updated!');
// //     setEditingPost(null);
// //     fetchUserPosts(userInfo._id);
// //   } catch (error) {
// //     toast.error('Failed to update post');
// //   }
// // };
// // const handleCancel = () => {
// //   setEditingPost(null);
// //   setEditTitle('');
// //   setEditContent('');
// // };

// const handleUpdate = async () => {
//   try {
//     const formData = new FormData();
//     formData.append('title', editTitle);
//     formData.append('content', editContent);
//     formData.append('tags', editTags);
//     formData.append('category', editCategory);
//     if (editImage) {
//       formData.append('image', editImage);
//     }

//     await axios.put(
//       `http://localhost:5000/api/${editingPost}`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );

//     toast.success('Post updated!');
//     setEditingPost(null);
//     fetchUserPosts(userInfo._id);
//   } catch (error) {
//     toast.error('Failed to update post');
//     console.error(error);
//   }
// };


// const handleDelete  = async (postId) => {
//     try {
//         const storedUser = JSON.parse(localStorage.getItem('user'));
//       await axios.delete(`http://localhost:5000/api/${postId}`, {
//         headers: {
//           Authorization: `Bearer ${storedUser.token}`, // sending token
//         },
//       });

//       setUserPosts(userPosts.filter((post) => post._id !== postId));
//     //   console.log(postId)
//     } catch (err) {
//       console.error("Failed to delete post:", err);
//     }
//   };
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));

//     if (storedUser) {
//       setUserInfo(storedUser);
//       fetchUserPosts(storedUser._id);
//     }
//   }, []);



// //   const fetchUserPosts = async (userId) => {
// //     try {
// //       const res = await axios.get(`http://localhost:5000/api/${userInfo._id}`);
// //     //   const userSpecificPosts = res.data.filter((post) => post.user._id === userId);
// //       setUserPosts(res.data);
// //     } catch (err) {
// //       console.error('Error fetching posts:', err);
// //     }
// //   };

// const fetchUserPosts = async (userId) => {
//     try {
//       // Fetch all posts
//       const res = await axios.get('http://localhost:5000/api/');
//     //   console.log(res.data)

//       // Filter posts where the userId of the post matches the logged-in user's ID
//     //   const userSpecificPosts = res.data.filter((post) => post.user._id === userInfo._id);
//       const userSpecificPosts = res.data.filter((post) => post.user._id === userId);

//       // Set the filtered posts to the state
//       setUserPosts(userSpecificPosts);
//     } catch (err) {
//       console.error('Error fetching posts:', err);
//     }
//   };



//   // const handleCreatePost = async (e) => {
//   //   e.preventDefault();
//   //   if (!title || !content) return alert('Title and content are required');

//   //   try {
//   //     await axios.post(
//   //       'http://localhost:5000/api',
//   //       { title, content  },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${userInfo.token}`,
//   //         },
//   //       }
//   //     );
//   //     // Clear form
//   //     setTitle('');
//   //     setContent('');
//   //     // Refresh posts
//   //     fetchUserPosts(userInfo._id);
//   //   } catch (err) {
//   //     console.error('Error creating post:', err);
//   //     alert('Failed to create post');
//   //   }
//   // };



//   const handleCreatePost = async (e) => {
//     e.preventDefault();
//     if (!title || !content) return alert('Title and content are required');

//     try {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('content', content);
//       formData.append('tags', tags);
//       formData.append('category', category);
//       if (image) formData.append('image', image);

//       await axios.post('http://localhost:5000/api', formData, {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Reset form after successful post
//       setTitle('');
//       setContent('');
//       setTags('');
//       setCategory('');
//       setImage(null);

//       fetchUserPosts(userInfo._id);
//     } catch (err) {
//       console.error('Error creating post:', err);
//       alert('Failed to create post');
//     }
//   };

//   const handleCancel = () => {
//     setEditingPost(null);
//     setEditTitle('');
//     setEditContent('');
//     setEditTags('');
//     setEditCategory('');
//     setEditImage(null);
//     setOldImage('');
//   };


//   if (!userInfo) {
//     return <div>Please login to view your dashboard.</div>;
//   }

//   return (
//     <div className="dashboard-container" style={{ padding: '2rem' }}>
//       {/* <p>Email: {userInfo.email}</p> */}
//       <h2>Welcome, {userInfo.name}</h2>
//       <hr />


//       <h3>Create New Post</h3>
//       <form onSubmit={handleCreatePost} style={{ marginBottom: '2rem' }}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
//         />
//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//           rows={5}
//           style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
//         />
//         <input
//   type="text"
//   placeholder="Tags (comma separated)"
//   value={tags}
//   onChange={(e) => setTags(e.target.value)}
//   style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
// />

// <input
//   type="text"
//   placeholder="Category"
//   value={category}
//   onChange={(e) => setCategory(e.target.value)}
//   style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
// />

// <input
//   type="file"
//   onChange={(e) => setImage(e.target.files[0])}
//   accept="image/*"
//   style={{ display: 'block', marginBottom: '1rem' }}
// />

//         <button type="submit">Create Post</button>
//       </form>






//     <h3>Your Posts:</h3>
//       {userPosts.length === 0 ? (
//   <p>You haven't written any posts yet.</p>
//       ) : (
//       <ul>
//      {userPosts.map((post) => (
//       <li key={post._id}>
//         {/* {editingPost === post._id ? (
//           <>
//             <input
//               type="text"
//               value={editTitle}
//               onChange={(e) => setEditTitle(e.target.value)}
//               style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
//             />
//             <textarea
//               value={editContent}
//               onChange={(e) => setEditContent(e.target.value)}
//               rows={5}
//               style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
//             />
//             <button onClick={handleUpdate} style={{ marginRight: '0.5rem' }}>Update</button>
//             <button onClick={handleCancel}>Cancel</button> */} 
//             {editingPost === post._id ? (
//   <>
//     <input
//       type="text"
//       value={editTitle}
//       onChange={(e) => setEditTitle(e.target.value)}
//       style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
//     />
//     <textarea
//       value={editContent}
//       onChange={(e) => setEditContent(e.target.value)}
//       rows={5}
//       style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
//     />
//     <input
//       type="text"
//       value={editTags}
//       onChange={(e) => setEditTags(e.target.value)}
//       placeholder="Tags (comma separated)"
//       style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
//     />
//     <input
//       type="text"
//       value={editCategory}
//       onChange={(e) => setEditCategory(e.target.value)}
//       placeholder="Category"
//       style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
//     />

// {post.image && (
//           <div>
//             <img
//               src={post.image}
//               alt="Post"
//               style={{ maxWidth: '100%', height: '30px', marginTop: '1rem' }}
//             />
//           </div>
//         )}


//     <input
//       type="file"
//       onChange={(e) => setEditImage(e.target.files[0])}
//       accept="image/*" 
//       style={{ display: 'block', marginBottom: '1rem' }}
//     />





//     <button onClick={handleUpdate} style={{ marginRight: '0.5rem' }}>Update</button>
//     <button onClick={handleCancel}>Cancel</button>

//   {/* // Non-editing mode display */}

//           </>
//         ) : (
//           <>
//             <h4>{post.title}</h4>
//             <p>{post.content}</p>
//             <p>👍 Likes: {post.likes?.length || 0}</p>
//         <p>👎 Dislikes: {post.dislikes?.length || 0}</p>
//         <p>🏷️ Tags: {post.tags?.join(', ') || 'None'}</p>
//         <p>📂 Category: {post.category || 'Uncategorized'}</p>

//         {post.image && (
//           <div>
//             <img
//               src={post.image}
//               alt="Post"
//               style={{ maxWidth: '200px', height: 'auto', marginTop: '1rem' }}
//             />
//           </div>
//         )}

//             <small>Created At: {new Date(post.createdAt).toLocaleString()}</small><br />
//             <button onClick={() => handleEdit(post)} style={{ marginRight: '0.5rem' }}>Edit</button>
//             <button onClick={() => handleDelete(post._id)}>Delete</button>
//           </>
//         )}
//         <hr />
//       </li>
//     ))}
//        </ul>
//       )}




//               <hr />
//             {/* </li> */}
//           {/* ))} */}
//         {/* </ul> */}
//       {/* )} */}
//     </div>
//   );
// };

// export default UserDashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UserDashboard = () => {
//   const [userPosts, setUserPosts] = useState([]);
//   const [userInfo, setUserInfo] = useState(null);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [tags, setTags] = useState('');
//   const [category, setCategory] = useState('');
//   const [image, setImage] = useState(null);
//   const [editTags, setEditTags] = useState('');
//   const [editCategory, setEditCategory] = useState('');
//   const [editImage, setEditImage] = useState(null);
//   const [editingPost, setEditingPost] = useState(null);
//   const [editTitle, setEditTitle] = useState('');
//   const [editContent, setEditContent] = useState('');
//   const [oldImage, setOldImage] = useState('');

//   const handleEdit = (post) => {
//     setEditingPost(post._id);
//     setEditTitle(post.title);
//     setEditContent(post.content);
//     setEditTags(post.tags?.join(', ') || '');
//     setEditCategory(post.category || '');
//     setOldImage(post.image || '');
//     setEditImage(null);
//   };

//   const handleUpdate = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('title', editTitle);
//       formData.append('content', editContent);
//       formData.append('tags', editTags);
//       formData.append('category', editCategory);
//       if (editImage) {
//         formData.append('image', editImage);
//       }

//       await axios.put(
//         `http://localhost:5000/api/${editingPost}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${userInfo.token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       toast.success('Post updated!');
//       setEditingPost(null);
//       fetchUserPosts(userInfo._id);
//     } catch (error) {
//       toast.error('Failed to update post');
//       console.error(error);
//     }
//   };

//   const handleDelete = async (postId) => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem('user'));
//       await axios.delete(`http://localhost:5000/api/${postId}`, {
//         headers: {
//           Authorization: `Bearer ${storedUser.token}`,
//         },
//       });

//       setUserPosts(userPosts.filter((post) => post._id !== postId));
//     } catch (err) {
//       console.error('Failed to delete post:', err);
//     }
//   };

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));

//     if (storedUser) {
//       setUserInfo(storedUser);
//       fetchUserPosts(storedUser._id, storedUser.isAdmin); // Pass isAdmin flag to fetch all posts if admin
//     }
//   }, []);

//   const fetchUserPosts = async (userId, isAdmin) => {
//     try {
//       // Fetch all posts if user is admin
//       const res = await axios.get('http://localhost:5000/api/');
//       let userSpecificPosts = res.data;

//       if (!isAdmin) {
//         // Filter posts to show only the user's posts if not admin
//         userSpecificPosts = res.data.filter((post) => post.user._id === userId);
//       }

//       setUserPosts(userSpecificPosts);
//     } catch (err) {
//       console.error('Error fetching posts:', err);
//     }
//   };

//   const handleCreatePost = async (e) => {
//     e.preventDefault();
//     if (!title || !content) return alert('Title and content are required');

//     try {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('content', content);
//       formData.append('tags', tags);
//       formData.append('category', category);
//       if (image) formData.append('image', image);

//       await axios.post('http://localhost:5000/api', formData, {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setTitle('');
//       setContent('');
//       setTags('');
//       setCategory('');
//       setImage(null);

//       fetchUserPosts(userInfo._id, userInfo.isAdmin);
//     } catch (err) {
//       console.error('Error creating post:', err);
//       alert('Failed to create post');
//     }
//   };

//   const handleCancel = () => {
//     setEditingPost(null);
//     setEditTitle('');
//     setEditContent('');
//     setEditTags('');
//     setEditCategory('');
//     setEditImage(null);
//     setOldImage('');
//   };

//   if (!userInfo) {
//     return <div>Please login to view your dashboard.</div>;
//   }

//   return (
//     <div className="dashboard-container" style={{ padding: '2rem' }}>
//       <h2>Welcome, {userInfo.name}</h2>
//       <hr />

//       <h3>Create New Post</h3>
//       <form onSubmit={handleCreatePost} style={{ marginBottom: '2rem' }}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
//         />
//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//           rows={5}
//           style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
//         />
//         <input
//           type="text"
//           placeholder="Tags (comma separated)"
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//           style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
//         />
//         <input
//           type="text"
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
//         />
//         <input
//           type="file"
//           onChange={(e) => setImage(e.target.files[0])}
//           accept="image/*"
//           style={{ display: 'block', marginBottom: '1rem' }}
//         />
//         <button type="submit">Create Post</button>
//       </form>

//       <h3>Your Posts:</h3>
//       {userPosts.length === 0 ? (
//         <p>You haven't written any posts yet.</p>
//       ) : (
//         <ul>
//           {userPosts.map((post) => (
//             <li key={post._id}>
//               {editingPost === post._id ? (
//                 <>
//                   <input
//                     type="text"
//                     value={editTitle}
//                     onChange={(e) => setEditTitle(e.target.value)}
//                     style={{
//                       display: 'block',
//                       marginBottom: '0.5rem',
//                       width: '100%',
//                     }}
//                   />
//                   <textarea
//                     value={editContent}
//                     onChange={(e) => setEditContent(e.target.value)}
//                     rows={5}
//                     style={{
//                       display: 'block',
//                       marginBottom: '0.5rem',
//                       width: '100%',
//                     }}
//                   />
//                   <input
//                     type="text"
//                     value={editTags}
//                     onChange={(e) => setEditTags(e.target.value)}
//                     placeholder="Tags (comma separated)"
//                     style={{
//                       display: 'block',
//                       marginBottom: '0.5rem',
//                       width: '100%',
//                     }}
//                   />
//                   <input
//                     type="text"
//                     value={editCategory}
//                     onChange={(e) => setEditCategory(e.target.value)}
//                     placeholder="Category"
//                     style={{
//                       display: 'block',
//                       marginBottom: '0.5rem',
//                       width: '100%',
//                     }}
//                   />
//                   {post.image && (
//                     <div>
//                       <img
//                         src={post.image}
//                         alt="Post"
//                         style={{
//                           maxWidth: '100%',
//                           height: '30px',
//                           marginTop: '1rem',
//                         }}
//                       />
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     onChange={(e) => setEditImage(e.target.files[0])}
//                     accept="image/*"
//                     style={{ display: 'block', marginBottom: '1rem' }}
//                   />
//                   <button onClick={handleUpdate} style={{ marginRight: '0.5rem' }}>
//                     Update
//                   </button>
//                   <button onClick={handleCancel}>Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <h4>{post.title}</h4>
//                   <p>{post.content}</p>
//                   <p>{post.user.name}</p>
//                   <p>👍 Likes: {post.likes?.length || 0}</p>
//                   <p>👎 Dislikes: {post.dislikes?.length || 0}</p>
//                   <p>🏷️ Tags: {post.tags?.join(', ') || 'None'}</p>
//                   <p>📂 Category: {post.category || 'Uncategorized'}</p>

//                   {post.image && (
//                     <div>
//                       <img
//                         src={post.image}
//                         alt="Post"
//                         style={{
//                           maxWidth: '200px',
//                           height: 'auto',
//                           marginTop: '1rem',
//                         }}
//                       />
//                     </div>
//                   )}

//                   <small>
//                     Created At: {new Date(post.createdAt).toLocaleString()}
//                   </small>
//                   <br />
//                   {userInfo.isAdmin ? (
//                     <>
//                       <button
//                         onClick={() => handleEdit(post)}
//                         style={{ marginRight: '0.5rem' }}
//                       >
//                         Edit
//                       </button>
//                       <button onClick={() => handleDelete(post._id)}>Delete</button>
//                     </>
//                   ) : post.user._id === userInfo._id ? (
//                     <>
//                       <button
//                         onClick={() => handleEdit(post)}
//                         style={{ marginRight: '0.5rem' }}
//                       >
//                         Edit
//                       </button>
//                       <button onClick={() => handleDelete(post._id)}>
//                         Delete
//                       </button>
//                     </>
//                   ) : null}
//                 </>
//               )}
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [editTags, setEditTags] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [oldImage, setOldImage] = useState('');

  const handleEdit = (post) => {
    setEditingPost(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditTags(post.tags?.join(', ') || '');
    setEditCategory(post.category || '');
    setOldImage(post.image || '');
    setEditImage(null);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('title', editTitle);
      formData.append('content', editContent);
      formData.append('tags', editTags);
      formData.append('category', editCategory);
      if (editImage) {
        formData.append('image', editImage);
      }

      await axios.put(
        `http://localhost:5000/api/${editingPost}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success('Post updated!');
      setEditingPost(null);
      fetchUserPosts(userInfo._id);
    } catch (error) {
      toast.error('Failed to update post');
      console.error(error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      await axios.delete(`http://localhost:5000/api/${postId}`, {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });

      setUserPosts(userPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem('user'));

  //   // token ecpiry check
  //   if (storedUser) {
      
  //     const now = new Date().getTime();
  
  //     if (now > user.expiresAt) {
  //       // Token expired
  //       localStorage.removeItem("user");
  //       // Optional: redirect to login or update app state
  //       window.location.href = "/login"; // or setUser(null)
  //     }
  //   }


  //   if (storedUser) {
  //     setUserInfo(storedUser);
  //     fetchUserPosts(storedUser._id, storedUser.isAdmin); // Pass isAdmin flag to fetch all posts if admin
  //   }
  // }, []);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // ✅ Only parse once
  
    // token expiry check
    if (storedUser) {
      const now = new Date().getTime();
  
      if (now > storedUser.expiresAt) {
        // Token expired
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        setUserInfo(storedUser);
        fetchUserPosts(storedUser._id, storedUser.isAdmin); // Fetch posts if not expired
      }
    }
  }, []);
  

  const fetchUserPosts = async (userId, isAdmin) => {
    try {
      // Fetch all posts if user is admin
      const res = await axios.get('http://localhost:5000/api/');
      let userSpecificPosts = res.data;

      if (!isAdmin) {
        // Filter posts to show only the user's posts if not admin
        userSpecificPosts = res.data.filter((post) => post.user._id === userId);
      }

      setUserPosts(userSpecificPosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert('Title and content are required');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('tags', tags);
      formData.append('category', category);
      if (image) formData.append('image', image);

      await axios.post('http://localhost:5000/api', formData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setTitle('');
      setContent('');
      setTags('');
      setCategory('');
      setImage(null);

      fetchUserPosts(userInfo._id, userInfo.isAdmin);
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post');
    }
  };

  const handleCancel = () => {
    setEditingPost(null);
    setEditTitle('');
    setEditContent('');
    setEditTags('');
    setEditCategory('');
    setEditImage(null);
    setOldImage('');
  };

  if (!userInfo) {
    return <div>Please login to view your dashboard.</div>;
  }

  return (
    <div className="dashboard-container" style={{ padding: '2rem' }}>
      <h2>Welcome, {userInfo.name}</h2>
      <hr />

      <h3>Create New Post</h3>
      <form onSubmit={handleCreatePost} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={5}
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          style={{ display: 'block', marginBottom: '1rem' }}
        />
        <button type="submit">Create Post</button>
      </form>

      <h3>Your Posts:</h3>
      {userPosts.length === 0 ? (
        <p>You haven't written any posts yet.</p>
      ) : (
        <ul>
          {userPosts.map((post) => (
            <li key={post._id}>
              {editingPost === post._id ? (
                <>
                  <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      width: '100%',
                    }}
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={5}
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      width: '100%',
                    }}
                  />
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      width: '100%',
                    }}
                  />
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    placeholder="Category"
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      width: '100%',
                    }}
                  />
                  {post.image && (
                    <div>
                      <img
                        src={post.image}
                        alt="Post"
                        style={{
                          maxWidth: '100%',
                          height: '30px',
                          marginTop: '1rem',
                        }}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={(e) => setEditImage(e.target.files[0])}
                    accept="image/*"
                    style={{ display: 'block', marginBottom: '1rem' }}
                  />
                  <button onClick={handleUpdate} style={{ marginRight: '0.5rem' }}>
                    Update
                  </button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                  <p>👍 Likes: {post.likes?.length || 0}</p>
                  <p>👎 Dislikes: {post.dislikes?.length || 0}</p>
                  <p>🏷️ Tags: {post.tags?.join(', ') || 'None'}</p>
                  <p>📂 Category: {post.category || 'Uncategorized'}</p>

                  {post.image && (
                    <div>
                      <img
                        src={post.image}
                        alt="Post"
                        style={{
                          maxWidth: '200px',
                          height: 'auto',
                          marginTop: '1rem',
                        }}
                      />
                    </div>
                  )}

                  <small>
                    Created At: {new Date(post.createdAt).toLocaleString()}
                  </small>
                  <br />
                  {userInfo.isAdmin ? (
                    <>
                      <p>
                        <strong>Author:</strong> {post.user.name} (
                        {post.user._id === userInfo._id ? 'You' : 'Other User'})
                      </p>
                      <button
                        onClick={() => handleEdit(post)}
                        style={{ marginRight: '0.5rem' }}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDelete(post._id)}>Delete</button>
                    </>
                  ) : post.user._id === userInfo._id ? (
                    <>
                      <button
                        onClick={() => handleEdit(post)}
                        style={{ marginRight: '0.5rem' }}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDelete(post._id)}>
                        Delete
                      </button>
                    </>
                  ) : null}
                </>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
