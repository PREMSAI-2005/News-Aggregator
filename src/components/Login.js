import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser.email === input.email &&
      storedUser.password === input.password
    ) {
      localStorage.setItem("loggedIn", true);
      navigate("/news");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    
       <div className="auth-container">
       <div className="auth-header">Flash News</div> {/* Title */}
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setInput({ ...input, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setInput({ ...input, password: e.target.value })} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
