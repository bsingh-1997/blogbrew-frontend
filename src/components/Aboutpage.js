// import React from 'react'

// const Aboutpage = () => {
//   return (
//     <div>
//       <div style={{width:"90%", height:"420px", overflow:"hidden",position:"relative", display:"flex", margin:"auto"}}>

//       <img style={{ width:"100%",objectFit:'cover',objectPosition:'top'}} src='https://wallpaperaccess.com/full/1510615.jpg'/>
//       </div>


//       <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             // display:'flex',
//             margin:'auto',
//             // left: "10%",
//             color: "white",
//             fontSize: "2.2rem",
//             fontWeight: "bold",
//             textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
//             maxWidth: "70%",
//           }}
//         >
//           Welcome to Our Blog Platform
//           <p style={{ fontSize: "1rem", fontWeight: "normal", marginTop: "10px" }}>
//             A space where ideas meet expression. Explore stories, share knowledge, and connect through words.
//           </p>
//         </div>
//       {/* </div> */}

//       About page
//     </div>
//   )
// }

// export default Aboutpage



import React from 'react';
import { MdOpacity } from 'react-icons/md';

const Aboutpage = () => {
  return (
    <div>
      <div
        style={{
          width: "90%",
          height: "420px",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          margin: "auto",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
            opacity:"70%"
            // 
          }}
          src="https://wallpaperaccess.com/full/1510615.jpg"
          alt="About Banner"
        />

        {/* ✅ Text Overlay with Flexbox Centering */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "2.2rem",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
              maxWidth: "700px",
              margin: "auto",
            }}
          >
            Welcome to Our Blog Platform
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "normal",
                marginTop: "10px",
              }}
            >
              A space where ideas meet expression. Explore stories, share knowledge, and connect through words.
            </p>
          </div>
        </div>
      </div>

      <div style={{ width:'90%', display:'flex',flexDirection:'column',margin:'auto', textAlign: "center" }}>
        <h2>About Us</h2>
        <p>
  This platform was built with passion and creativity. Our goal is to offer a seamless and interactive
  blogging experience for everyone. Whether you're a writer or a reader, you're in the right place.
</p>
<p>
  Built on the powerful MERN stack, the app allows users to create, edit, and manage their blogs while also customizing their profile.
</p>
<p>
  Admins help maintain the quality of content, ensuring a space that's both expressive and respectful.
</p>
<p>
  Stay tuned for more updates as we continue to improve and expand the features. Happy blogging!
</p>
<p>
  Our platform values safety and trust. All user data is securely handled, and token-based authentication ensures that only authorized users have access to protected areas.
</p>
<p>
  Users can upload profile images, create blogs with rich content and images, add categories and tags for better discoverability, and engage with others through likes and comments.
</p>
<p>
  Admin users have advanced control to manage content, ensuring a safe and curated blogging experience for the entire community.
</p>
<p>
  We also offer a responsive design so that you can read and write blogs comfortably on any device — be it mobile, tablet, or desktop.
</p>
<p>
  Your voice matters here. This platform encourages individuality, creativity, and genuine expression through writing.
</p>
<p>
  As we grow, we're committed to adding features that support writers — including analytics, reading stats, bookmarks, and more customization options.
</p>
<p>
  Thank you for being part of this growing community. We hope this platform becomes your favorite place to read, write, and connect through stories.
</p>

      </div>
    </div>
  );
};

export default Aboutpage;
