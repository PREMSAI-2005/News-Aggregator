import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    age: "",
    region: "",
    language: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
  try {
    const response = await fetch("http://localhost:8080/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/login");
    } else {
      console.error("Signup failed:", data);
      alert("Signup failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Error connecting to the server.");
  }
};


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-header">Flash News</div>
      <h2>Signup</h2>

      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input name="region" placeholder="Region" onChange={handleChange} />
      <input name="language" placeholder="Language Preference" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;