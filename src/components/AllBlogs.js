
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import HeroCarousel from './HeroCarousel';
import './css/allblogs.css';
import { FcLike } from "react-icons/fc";
import { FaFacebookF, FaTwitter, FaPinterest, FaInstagram, FaArrowRight, FaCheck } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { AiTwotoneDislike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import searchBarRef from './scrollRef';
import { IoIosArrowBack } from "react-icons/io";
import bsimg from './css/bsbs.JPG'
import Loader from './Loader';

const AllBlogs = () => { 

  const searchRef = useRef(null);
  const location = useLocation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingsub, setLoadingsub] = useState(false);
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [placeholder, setPlaceholder] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);



  const texts = [
    "Search blogs...",
    "Explore travel stories...",
    "Discover coding tips...",
    "Find something inspiring..."
  ];


  useEffect(() => {
    const currentText = texts[textIndex];
    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setPlaceholder(prev => prev + currentText[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 70);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPlaceholder("");
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 1000); // Wait before switching to next text
      return () => clearTimeout(timeout);
    }
  }, [charIndex, textIndex]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/api`);
      // console.log(process.env.REACT_APP_URL)
      // console.log('hello')
      // const res = await axios.get('http://localhost:5000/api');
      // const res = await axios.get('https://blogbrew-backend.vercel.app/api');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
      // setLoading(true);
    }
  };

  const handleSubscribe = async () => {
    if (!email) return alert("Please enter an email!");
    setLoadingsub(true)
    setSubscribed(false)
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/route/subscribetonewsletter`, { email });

      setSubscribed(true);
      setEmail(''); // Clear the email input after successful subscription

      setTimeout(() => {
        setSubscribed(false); // Hide the subscribed state after 2-3 seconds
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Subscription failed. Please try again later.");
    } finally {
      setLoadingsub(false)
    }
  };


  useEffect(() => {
    fetchPosts();
    // setSubscribed(true)
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.email) {
      setEmail(user.email);
    }
  }, []);



  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    setCurrentPage(1);
    blogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });

  };

  const uniqueTags = [...new Set(
    posts
      .flatMap(post => post.tags)
      .flatMap(tagString => tagString.split(/[,\s]+/)) // split by commas or spaces
      .map(tag => tag.trim().toLowerCase()) // normalize
      .filter(tag => tag.length > 0)
  )];

  const blogSectionRef = useRef(null);


  const likePost = async (postId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Get the user object
      const token = user?.token; // Get the token safely

      if (!token) {
        console.error('No token found in localStorage.');
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_URL}/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      fetchPosts()
    } catch (error) {
      console.error('Error liking the post:', error.response?.data || error.message);
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

      fetchPosts();
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };



  const handleclear = () => {
    setSearchQuery('')
  }


  if (loading) return <Loader />;

  return (
    <div>
      <HeroCarousel />
      <div className='HomeContainer'>

        <div ref={blogSectionRef} className='LeftHomeSection'>
          {/* Search Bar */}
          <div className='srchbar' ref={searchBarRef} style={{ marginBottom: '10px' }}>
            <input
              type='text'
              // placeholder='Search posts...'
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginTop: '2.7vh'
              }}
            />
          </div >

          {/* Showing results for */}
          {searchQuery && (
            <div style={{ marginBottom: '20px', fontStyle: 'italic', color: 'gray', display: 'flex', gap: '3vw' }}>
              <div>Showing results for "<strong>{searchQuery} </strong>"</div><div style={{ display: 'flex', alignItems: 'center', gap: '1vw', color: 'orangered', cursor: 'pointer' }} onClick={handleclear}><IoIosArrowBack /> Back to all posts </div>
            </div>
          )}

          {/* Blog Posts */}
          {currentPosts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            currentPosts.map((post) => (
              <div className='BlogContainer' key={post._id}>
                <div className='Blogimage'>
                  <img
                    style={{ width: "100%", objectFit: 'cover' }}
                    src={post.image || 'https://www.hdwallpapers.in/download/building_city_manhattan_new_york_night_skyscraper_usa_4k_5k_hd_travel-2560x1440.jpg'}
                    alt={post.title}
                  />
                </div>
                {/* <div className='BlogLikes' onClick={() => likePost(post._id)}><FcLike /> {post.likes?.length || 0}</div> */}

                <div className='likdis'>
                  <div className='BlogLikes' onClick={() => likePost(post._id)}><FcLike /> {post.likes?.length || 0}</div>
                  <div className='BlogLikes' onClick={() => dislikePost(post._id)}><AiTwotoneDislike /> {post.dislikes?.length || 0}</div>

                  {/* <div>Read more...</div> */}
                  {/* </Link> */}
                  <div className='BlogLikes'> <Link style={{ textDecoration: 'none', color: 'black', display: 'flex', gap: '.5vw', alignItems: 'center' }} to={`/blog/${post._id}`}><FaRegCommentDots />{post.comments?.length || 0}</Link> </div>
                </div>


                <div className='BlogTitle'>{post.title}</div>
                <div className='BlogInfo gr'>
                  <img className='userImage' src={post.user?.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
                  <div><small>By: {post.user?.name || 'Unknown'}</small></div>
                  {/* <div>{post.createdAt}</div> */}
                  {/* <div>{onlyDate}{onlyTime}</div> */}
                  {/* <div>{new Date(post.createdAt).toLocaleDateString()}</div> */}
                  {/* <div>{new Date(post.createdAt).toLocaleTimeString()} */}
                  <div>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</div>
                  {/* </div> */}

                  <div>Category: {post.category || 'Uncategorized'}</div>
                </div>
                <div style={{
                  display:'flex',
                  flexDirection:'column',
                  gap:'1vh'
                }} >

                  <div className='BlogContent gr'>{post.content}</div>
                  <Link style={{ color: 'blue', textDecoration: 'none' }} to={`/blog/${post._id}`}>
                    <div>Read more...</div>
                  </Link>
                </div>
                <div className='Socials'><FaFacebookF /><FaTwitter /><FaPinterest /> <FaInstagram /> - - - - - - - - - - - - - - </div>
              </div>
            ))
          )}
        </div>

        {/* Right Section */}
        <div className='RightHomeSection'>
          <div className='aboutme'>
            <h2>About Me</h2>
            <img className='abtimg' src={bsimg || 'https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg'} />
            <div>Hey, I'm Barinder Singh — a web developer on a mission to explore the world.
              I'm creating a platform where anyone with a passion — whether it's travel, art, food, or anything else — can share their stories, ideas, and experiences with a like-minded community.</div>
            <Link className='readmore' style={{ textDecoration: 'none' }} to='/about'>More about me <FaArrowRight /></Link>
          </div>

          {/* <div className='newslettr'>
            <h2>FOLLOW US</h2>
            <div className='logos'><FaFacebookF /><FaTwitter /><FaPinterest /> <FaInstagram /></div>
            <h2>NEWSLETTER</h2>
            <div style={{ textAlign: "center" }}>Fill your email below to subscribe to my newsletter</div>
            <input className='emailent' placeholder='Email' />
            <button className='subbuttn'>Subscribe</button>
          </div> */}

          <div className='newslettr'>
            <h2>FOLLOW US</h2>
            <div className='logos'><FaFacebookF /><FaTwitter /><FaPinterest /><FaInstagram /></div>

            <h2>NEWSLETTER</h2>
            <div style={{ textAlign: "center" }}>Fill your email below to subscribe to my newsletter</div>

            <input
              className='emailent'
              placeholder='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <button className='subbuttn' onClick={handleSubscribe}>Subscribe</button> */}
            <button
              className='subbuttn'
              onClick={handleSubscribe}
              disabled={loading || subscribed}
            >
              {/* {loadingsub ? (<>
          <div className="spinner"></div>
          Subscribing
        </>
        ) : (
          'Subscribe'
        )} */}
              {loadingsub ? (
                <div className="spinner"></div>  // Show spinner while loading
              ) : subscribed ? (
                <div className="subscribed">
                  Subscribed <FaCheck className="tick" />  {/* Green tick */}
                </div>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>

          {/* <div className='popularsec'>
            <h2>Popular Posts -</h2>
            {[...Array(3)].map((_, i) => (
              <div className='ppdetails' key={i}>
                <div className='ppimdg'><img className='ppimg' src='https://www.hdwallpapers.in/download/building_city_manhattan_new_york_night_skyscraper_usa_4k_5k_hd_travel-2560x1440.jpg' /></div>
                <div className='ppod'><h2>The rise of Ev culture</h2><div className='gr'> date time </div></div>
              </div>
            ))}
          </div> */}


          <div className='popularsec' >
            <h2>Popular Posts -</h2>
            {[...posts]
              .sort((a, b) => b.likes.length - a.likes.length) // sort by most likes
              .slice(0, 3) // take top 3
              .map((post) => (
                <Link style={{ textDecoration: 'none', color: 'black' }} key={post._id} to={`/blog/${post._id}`}>
                  <div className='ppdetails' key={post._id}>
                    
                      <img className='ppimg' src={post.image || 'fallback-image-url.jpg'} alt={post.title} />
                    
                    <div className='ppod'>
                      <h2 style={{fontSize:'1rem',display:'flex'}}>{post.title}</h2>
                      <div className='gr'>{new Date(post.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>




          {/* Category Section */}
          {/* <div className='categories'>
            <h1>Category</h1>
            {["Fashion", "Travel", "Lifestyle", "Tech", "Food"].map((cat, i) => (
              <div
                className='catbutn'
                key={i}
                style={{ backgroundImage: `url("https://wallpaperaccess.com/full/3482571.jpg")` }}
                onClick={() => handleTagClick(cat)}
              >
                {cat}
              </div>
            ))}
          </div> */}


          {/* Category Section */}
          <div className='categories'>
            <h1>Category</h1>
            {[...new Set(posts.map((post) => post.category))] // Extract unique categories
              .slice(0, 10) // Limit to 10 categories
              .map((cat, i) => (
                <div
                  className='catbutn'
                  key={i}
                  style={{ backgroundImage: `url("https://wallpaperaccess.com/full/3482571.jpg")`, cursor: 'pointer' }}
                  onClick={() => handleTagClick(cat)}
                >
                  {cat}
                </div>
              ))}
          </div>


          {/* Tags Section */}
          {/* <div className='tagssec'>
            <h1 style={{ width: "100%", marginBottom: '4vh' }}>Tags</h1>
            {["Coffee", "Cars", "Photography", "Trekk", "Riding", "Tuning", "Racing", "Reading", "Poetry", "Sleeping", "Peace", "Alone"].map((tag, i) => (
              <div className='tagstg' key={i} onClick={() => handleTagClick(tag)}>
                {tag}
              </div>
            ))}
          </div> */}


          {/* <div className='tagssec'>
  <h1 style={{ width: "100%", marginBottom: '4vh' }}>Tags</h1>
  {posts.map((tag, i) => (
    <div className='tagstg' key={i} onClick={() => handleTagClick(tag)}>
      {tag.tags}
    </div>
  ))}
</div> */}


          {/* <div className='tagssec'>
  <h1 style={{ width: "100%", marginBottom: '4vh' }}>Tags</h1>
  {
    // Flattening all the tags from posts, and then removing duplicates
    [...new Set(posts.flatMap(post => post.tags || []))].map((tag, i) => (
      <div className='tagstg' key={i} onClick={() => handleTagClick(tag)}>
        {tag}
      </div>
    ))
  }
</div>

 */}


          <div className='tagssec'>
            <h1 style={{ width: "100%", marginBottom: '4vh', }}>Tags</h1>
            {uniqueTags.map((tag, i) => (
              <div className='tagstg' key={i} style={{ cursor: 'pointer' }} onClick={() => handleTagClick(tag)}>
                {tag}
              </div>
            ))}
          </div>



          {/* <div className='recentposts'>
            <h1>Recent Posts</h1>
            {[...Array(3)].map((_, i) => (
              <div className='postsr' key={i}>
                <img className='postrimg' src='https://wallpapercave.com/wp/wp9628495.jpg' />
                <h2>Check out the most awesome vr headset in 2025</h2>
                <div className='gr'>12-04-2025 13:44pm</div>
              </div>
            ))}
          </div> */}
          {posts.length === 0 ? (<p>No Posts Found!</p>) : (
            <div className='recentposts'>
              <h1>Recent Posts</h1>
              {posts
                .slice() // create a shallow copy to avoid mutating original
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
                .slice(0, 3) // get only top 3
                .map((post) => (
                  // <Link style={{ textDecoration: 'none', color: 'black' }} to={`${process.env.FRONTEND_APP_URL}/blog/${post._id}`}>
                  <Link style={{ textDecoration: 'none', color: 'black' }} to={`/blog/${post._id}`}>
                    <div className='postsr' key={post._id}>
                      <img
                        className='postrimg'
                        src={post.image || 'https://www.hdwallpapers.in/download/building_city_manhattan_new_york_night_skyscraper_usa_4k_5k_hd_travel-2560x1440.jpg'}
                        alt={post.title}
                      />
                      <h2>{post.title}</h2>
                      <div className='gr'>{post.user.name}{'   -  '} {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</div>
                    </div>
                  </Link>
                ))}
            </div>

          )}

        </div>
      </div>

      {/* Pagination Buttons */}
      <div style={{ textAlign: 'center', marginTop: '10vh', maxWidth:'90%', margin:'auto' ,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            marginRight: '10px',
            // padding: '0.5rem 1rem',
            backgroundColor: '#ddd',
            // border: 'none',
            // borderRadius: '50px',
            // width: '2.2rem',
            height:'40px',
            width:'40px',
            borderRadius:'50%',
            paddingTop:'5px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <MdKeyboardArrowLeft />
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: '0 5px',
              padding: '0.5rem 1rem',
              backgroundColor: currentPage === i + 1 ? 'rgb(255, 72, 0)' : '#eee',
              color: currentPage === i + 1 ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            marginLeft: '10px',
            // padding: '0.5rem 1rem',
            // paddingTop:'7px',
            backgroundColor: '#ddd',
            height:'40px',
            width:'40px',
            border:'none',
            borderRadius:'50%',
            paddingTop:'4px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
          }}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
      </div>
    // </div>
  );
};

export default AllBlogs;
