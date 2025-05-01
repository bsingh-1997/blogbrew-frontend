  // import React from 'react';
  // import Slider from 'react-slick';
  // import './HeroCarousel.css'; // custom CSS

  // const HeroCarousel = ({ posts }) => {
  //   const settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 700,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     autoplay: true,
  //     // autoplaySpeed: 4000,
  //     autoplaySpeed: 1500,
  //     arrows: false,
  //   };

  //   return (
      // <div className="carousel-container">
      //   <Slider {...settings}>
      //     {posts.map((post, index) => (
      //       <div className="carousel-slide" key={index}>
      //         <div
      //           className="carousel-background"
      //           style={{ backgroundImage: `url(${post.imageUrl})` }}
      //         >
      //           <div className="carousel-content">
      //             <h2>{post.title}</h2>
      //             <p>{post.description.substring(0, 150)}...</p>
      //           </div>
      //         </div>
      //       </div>
      //     ))}
      //   </Slider>
      // </div>
      // <div>

      // <Slider  style={{width:"90%",height:"420px", overflow:"hidden",position:"relative", display:"flex", margin:"auto"}} {...settings}>
      //   <div>
      //     <img style={{ width:"100%", height:"auto",display:"block"}} src="https://wallpaperaccess.com/full/488392.jpg" alt="Slide 1"/>
          
      //   </div>
      //   <div>
      //     <img style={{ width:"100%", height:"auto",display:"block"}} src="https://wallpaperaccess.com/full/1510615.jpg" alt="Slide 1"/>
          
      //   </div>
      //   <div>
      //     <img style={{ width:"100%", height:"auto",display:"block"}} src="https://wallpaperaccess.com/full/1431600.jpg" alt="Slide 1"/>
          
      //   </div>
      //   <div>
      //     <img style={{ width:"100%", height:"auto",display:"block"}} src="https://www.hdwallpapers.in/download/new_york_cityscape_during_sunset_hd_travel-HD.jpg" alt="Slide 1"/>
          
      //   </div>
      //   <div>
          
      //     <img style={{ width:"100%", height:"auto",display:"block"}} src="https://cdn.wallpapersafari.com/52/24/5nr3L2.jpg" alt="Slide 1"/>
      //   </div>
      //   <div>
      //     <img style={{ width:"100%", height:"auto",display:"block"}} src="https://wallpaperaccess.com/full/2135329.jpg" alt="Slide 1"/>
      //     <h3>6</h3>
      //   </div>
      // </Slider>
      // <div className='textover'>
      //   text
      // </div>
      // </div>



  //     <div className='imgcont' >
  //   <Slider
  //     style={{
  //       width: "100%",
  //       height: "100%",
  //       overflow: "hidden",
  //       position: "relative",
  //       display: "flex",
  //     }}
  //     {...settings}
  //   >
  //     {/* <div>
  //       <img src="https://wallpaperaccess.com/full/488392.jpg" alt="Slide 1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  //     </div> */}
  //     <div>
  //       <img src="https://wallpaperaccess.com/full/1510615.jpg" alt="Slide 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  //     </div>
  //     <div>
  //       <img src="https://wallpaperaccess.com/full/1431600.jpg" alt="Slide 3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  //     </div>
  //     {/* add more slides if needed */}
  //   </Slider>

  //   <div className="textover">
  //     <h1>Welcome to BlogBrew</h1>
  //     <h2>Brew. Write. Share.</h2>
  //     <p>Where your ideas brew into stories. Start sharing now!</p>
  //   </div>
  // </div>


  //   );
  // };

  // export default HeroCarousel;


  import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './HeroCarousel.css';
import Loader from './Loader';

const imageUrls = [
  "https://wallpaperaccess.com/full/1510615.jpg",
  "https://wallpaperaccess.com/full/1431600.jpg",
  "https://wallpaperaccess.com/full/2135329.jpg",
  "https://cdn.wallpapersafari.com/52/24/5nr3L2.jpg",
];

const preloadImages = (urls) => {
  return Promise.all(
    urls.map((url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = resolve; // resolve even on error to avoid stuck state
      });
    })
  );
};

const HeroCarousel = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    preloadImages(imageUrls).then(() => setLoaded(true));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
  };

  return (
    <div className="imgcont">
      {loaded ? (
        <>
          <Slider
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              position: "relative",
              display: "flex",
            }}
            {...settings}
          >
            {imageUrls.map((url, index) => (
              <div key={index}>
                <img
                  src={url}
                  alt={`Slide ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </Slider>

          <div className="textover">
            <h1>Welcome to BlogBrew</h1>
            <h2>Brew. Write. Share.</h2>
            <p>Where your ideas brew into stories. Start sharing now!</p>
          </div>
        </>
      ) : (
        <div className="carousel-loading">
          <Loader/>
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
