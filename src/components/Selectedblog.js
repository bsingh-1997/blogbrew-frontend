
import { Link, useLocation, useNavigate, useParams, } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { FcLike } from 'react-icons/fc';
import { AiTwotoneDislike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from './Loader';

const SelectedBlog = () => {



//   const location = useLocation();

// useEffect(() => {
//   if (location.hash === '#comments') {
//     const el = document.getElementById('comments');
//     if (el) {
//       el.scrollIntoView({ behavior: 'smooth' });
//     }
//   }
// }, [location]);





  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState({});

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error('Error fetching blog:', err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);



  const likePost = async (postId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      if (!token) return;

      await axios.put(
        `http://localhost:5000/api/posts/${postId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchBlog();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };


  const deleteComment = async (postId, commentId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      if (!token) return;
  
      // Send a DELETE request to remove the comment
      const response = await axios.delete(
        `http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // Update the blog state with the updated comments
      // setBlog((prevBlog) => ({
      //   ...prevBlog,
      //   comments: response.data,
      // }));
      fetchBlog()
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const dislikePost = async (postId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      if (!token) return;

      await axios.put(
        `http://localhost:5000/api/posts/${postId}/dislike`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchBlog();
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };


  // const loggedInUser = JSON.parse(localStorage.getItem('user'));
  // const isPostOwner = blog.user._id.toString() === req.user.id;
  // const currentUser = JSON.parse(localStorage.getItem('user'));
  // const currentUser = JSON.parse(localStorage.getItem('user'));
  // const isPostOwner = blog.user === currentUser?._id;
  
  const commentOnPost = async (postId, text) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      if (!token || !text.trim()) return;

      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comments`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedComments = response.data;

      // setBlog((prevBlog) => ({
      //   ...prevBlog,
      //   comments: updatedComments,
      // }));

      fetchBlog()
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    // ... rest of your code
  
  // const location = useLocation();
  // const navigate = useNavigate();
  
  // useEffect(() => {
  //   if (location.hash === '#comments') {
  //     const el = document.getElementById('comments');
  //     if (el) {
  //       el.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   } else {
  //     window.scrollTo(0, 0);
  //   }
  // }, [location]);

  // useEffect(() => {
  //   if (location.hash === '#comments') {
  //     setTimeout(() => {
  //       const el = document.getElementById('comments');
  //       if (el) {
  //         el.scrollIntoView({ behavior: 'smooth' });
  //       }
  //     }, 100); // small delay to ensure rendering
  //   } else {
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // }, [location]);


  
  // useEffect(() => {
  //   if (location.hash === '#comments') {
  //     // Prevent default hash behavior
  //     useNavigate.replace(location.pathname); // remove #comments from URL temporarily
  
  //     setTimeout(() => {
  //       const el = document.getElementById('comments');
  //       if (el) {
  //         el.scrollIntoView({ behavior: 'smooth' });
  
  //         // Optionally re-add the hash to the URL after scroll
  //         useNavigate.replace(`${location.pathname}#comments`);
  //       }
  //     }, 100); // wait for DOM to settle
  //   } else {
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // }, [location]);
  


  
  // useEffect(() => {
  //   if (location.hash === '#comments') {
  //     // Remove hash from URL temporarily
  //     navigate(location.pathname, { replace: true });

  //     // Scroll after short delay
  //     setTimeout(() => {
  //       const commentSection = document.getElementById('comments');
  //       if (commentSection) {
  //         commentSection.scrollIntoView({ behavior: 'smooth' });

  //         // Optional: restore hash to URL if needed
  //         navigate(`${location.pathname}#comments`, { replace: true });
  //       }
  //     }, 100);
  //   } else {
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // }, [location, navigate]);



  
  if (!blog) return <Loader/>;
  // console.log(blog)


  

  return (
    <div>
      <div className='BlogContainerforidblog'>
        <div className='Blogimage'>
          <img
            style={{ width: "100%", objectFit: 'cover' }}
            src={blog.image || 'https://www.hdwallpapers.in/download/building_city_manhattan_new_york_night_skyscraper_usa_4k_5k_hd_travel-2560x1440.jpg'}
            alt={blog.title}
          />
        </div>

        <div className='likdis'>
          <div className='BlogLikes' onClick={() => likePost(blog._id)}><FcLike /> {blog.likes?.length || 0}</div>
          <div className='BlogLikes' onClick={() => dislikePost(blog._id)}><AiTwotoneDislike /> {blog.dislikes?.length || 0}</div>
          <div className='BlogLikes' ><FaRegCommentDots /> {blog.comments?.length || 0}</div>
        </div>

        <div className='BlogTitle'>{blog.title}</div>

        <div className='BlogInfo gr'>
          <img className='userImage' src={blog.user?.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
          <div><small>By: {blog.user?.name || 'Unknown'}</small></div>
          <div>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</div>
          <div>Category: {blog.category || 'Uncategorized'}</div>
        </div>

        <div className='BlogContent gr'>{blog.content}</div>

        {/* Comments section */}
        <div  className='comments'>
          {/* {blog.comments?.map((comment, idx) => (
            <div key={idx} className="comment">
              <p><strong>{comment.user?.name || 'Anonymous'}:</strong> {comment.text}
              
                 {comment.user?._id === JSON.parse(localStorage.getItem('user'))?._id && (
            <button onClick={() => deleteComment(blog._id, comment._id)}>
              Delete
            </button>
          )}
              
              </p>
              <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </div>
          ))} */}
          <h2>Comments <FaRegCommentDots /> </h2>

{Array.isArray(blog.comments) &&
  blog.comments.map((comment, idx) => (
    <div key={idx} className="comment">
      <div className='cmntimg'>
      <img style={{height:"50px",width:'50px',borderRadius:'50%'}} src={comment.user.image}/>
      </div>
      <div className='cmntdata'>

      <p className='gr'><strong>{comment.user?.name || 'Anonymous'}</strong></p>
      {/* <p>{comment.createdAt}</p> */}
      <p className='' style={{display:'flex', gap:'1.5vw', alignItems:'center'}}>

       {comment.text}
      <p className='grd'>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }).replace('about ', '')}</p>
        {comment.user?._id === JSON.parse(localStorage.getItem('user'))?._id && (
          <div style={{display:'flex', alignItems:'center'}} onClick={() => deleteComment(blog._id, comment._id)}>
            <MdDelete />
          </div>
        )}
      </p>
      </div>
        {/* {(comment.user?._id === loggedInUser?._id || blog.user?._id === loggedInUser?._id) && (
  <button onClick={() => deleteComment(blog._id, comment._id)}>
  Delete
  </button>
)} */}
{/* {(comment.user?._id === user?._id || blog.user?._id === user?._id) && (
  <button onClick={() => deleteComment(blog._id, comment._id)}>Delete</button>
)} */}
{/* {(comment.user?._id === currentUser?._id || isPostOwner) && (
  <button onClick={() => deleteComment(blog._id, comment._id)}>
    Delete
  </button>
)} */}

      {/* </p>  */}
    </div>
))}


        </div>
  <div style={{
    display:'flex',
    gap:'2vw'
  }} >

  
        {/* Add Comment Input */}
        <input id='comments'  style={{
          width:'25vw',
          minHeight:'5vh',
          padding:'2vh',
          border:'0.5px solid grey',
          borderRadius:'40px',
          // color:'red'
        }}
          type="text"
          placeholder="Add a comment"
          value={commentText[blog._id] || ""}
          onChange={(e) =>
            setCommentText((prev) => ({ ...prev, [blog._id]: e.target.value }))
          }
        />
        {/* <div style={{
          // width:'8vw',
          // minHeight:'10vh',
          // padding:'2vh',
          // border:'none'
          color:'blue',
          // backgroundColor:'red'
        }} onClick={() => commentOnPost(blog._id, commentText[blog._id])}>
          < FaArrowCircleUp size='8vh'/>
        </div> */}
        
{commentText[blog._id]?.trim() && (
  <div
    style={{
      color: 'blue',
      cursor: 'pointer'
    }}
    onClick={() => commentOnPost(blog._id, commentText[blog._id])}
  >
    <FaArrowCircleUp size="8vh" />
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default SelectedBlog;
