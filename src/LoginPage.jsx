import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // if using React Router

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate(); // For redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:5274/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('jwt', data.token);
      alert('Login successful!');
      navigate('/CandidateForm'); // Adjust to your actual route
    } catch (error) {
      setErrorMsg('Invalid email or password');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Illustration */}
      <div className="w-1/2 bg-white flex justify-center items-center">
        <div className="text-center">
          <img
            src="https://cdn.dribbble.com/users/722246/screenshots/15127673/media/41b27b1f0b26ad72aa5cd61b12310b13.png"
            alt="Illustration"
            className="w-[70%] mx-auto"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-blue-600 flex justify-center items-center">
        <div className="bg-white p-10 rounded-xl w-[80%] max-w-md shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hello!</h2>
          <p className="text-gray-700 mb-6">Sign Up to Get Started</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none"
                required
              />
            </div>
            {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-gray-600 hover:underline">
              Forgot Password
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;