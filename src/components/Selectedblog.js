
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
import './css/allblogs.css'
const SelectedBlog = () => {

  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [commentText, setCommentText] = useState({});

  const fetchBlog = async () => {
    try {
      // const res = await axios.get(`${process.env.REACT_APP_URL}/api/${id}`);
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/${id}`);
      setBlog(res.data);
      
    } catch (err) {
      console.error('Error fetching blog:', err);
    }
  };

  useEffect(() => {
    
    fetchBlog();
  }, [id]);
  
  console.log(blog)

  const likePost = async (postId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      if (!token) return;

      await axios.put(
        `${process.env.REACT_APP_URL}/api/posts/${postId}/like`,
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
        `${process.env.REACT_APP_URL}/api/posts/${postId}/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
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
        `${process.env.REACT_APP_URL}/api/posts/${postId}/dislike`,
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


  const commentOnPost = async (postId, text) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      if (!token || !text.trim()) return;

      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/posts/${postId}/comments`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedComments = response.data;

  
      fetchBlog()
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  
  
  if (!blog) return <Loader/>;
  

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
    
          <h2>Comments <FaRegCommentDots /> </h2>

{Array.isArray(blog.comments) &&
  blog.comments.map((comment, idx) => (
    <div key={idx} className="comment">
      <div className='cmntimg'>
      <img style={{height:"50px",width:'50px',borderRadius:'50%',objectFit:'cover'}} src={comment.user.image || 'https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg'}/>
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
      
    
    </div>
))}


        </div>
  <div style={{
    display:'flex',
    gap:'2vw'
  }} >

  
        {/* Add Comment Input */}
        <input id='comments' className='addcmnt' 
          type="text"
          placeholder="Add a comment"
          value={commentText[blog._id] || ""}
          onChange={(e) =>
            setCommentText((prev) => ({ ...prev, [blog._id]: e.target.value }))
          }
        />
        
        
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
