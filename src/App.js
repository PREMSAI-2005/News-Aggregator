import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Newsapp from './components/Newsapp';

function App() {
  const isAuthenticated = localStorage.getItem("loggedIn");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/news"
          element={isAuthenticated ? <Newsapp /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;