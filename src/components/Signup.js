import React, { useState } from "react";
import './css/login.css'
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/route/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registration successful!");
        setFormData({ name: "", email: "", password: "" });
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("Server error");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "80%", margin: "auto" , gap:'3vh',display:'flex',flexDirection:'column'}}>
      <h1>Signup</h1>
      <form className="signupform" onSubmit={handleSubmit} >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            height:'5vh',
            
            border:'.5px solid grey',
            borderRadius:'4px',
            marginBottom:'2vh',
            padding:'.4vh'
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            height:'5vh',
            
            border:'.5px solid grey',
            borderRadius:'4px',
            marginBottom:'2vh',
            padding:'.4vh'
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            height:'5vh',
            
            border:'.5px solid grey',
            borderRadius:'4px',
            marginBottom:'2vh',
            padding:'.4vh'
          }}
        />
        <button type="submit"  style={{
            height:'6vh',
            
            border:'.5px solid grey',
            borderRadius:'4px',
            marginBottom:'2vh',
            padding:'.4vh',
            backgroundColor:'orangered',
            color:'white'
          }}>Sign Up</button>
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default Signup;
