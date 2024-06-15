import React from 'react'
import Navbar from '../Components/Navbar'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Components/Footer';

const RegisterPage = () => {
//changes handler
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');
const [user, setUser] = useState(null);

const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setUsername(e.target.value);
};

const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEmail(e.target.value);
};

const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPassword(e.target.value);
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const data = {
      username,
      email,
      password,
    }
  try {
    // Data send to server
    const response = await axios.post('http://localhost:3000/auth/register',data, { withCredentials: true });
    if (response.data.error) {
      console.error('Błąd:', response.data.error);
  } else {
      console.log('Odpowiedź z serwera:', response);
      setMessage(response.data);
      if(response.data === 'Registered successfully!') window.location.replace('/'); //redirect to login page
  }
  } catch (error) {
    console.error('Error:', error);
  }
};
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/user', {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  fetchUser();
}, []);

return (
  <>
  <div className="pb-10">
    <Navbar user=""/>
  </div>
  <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-2xl shadow-blue-400 mt-10">
    <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-600 mb-2">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600 mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600 mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className='border-primary border-[1px] p-2 m-auto text-primary font-semibold hover:bg-primary hover:text-white duration-500 rounded-lg'
        >
          Sign up
        </button>
      </div>
    </form>
    {message && <p className={message === 'Registered successfully!' ? 'text-green-500 pt-2':'text-red-500 pt-2'}>{message}</p>}
  </div>
  <Footer/>
  </>
);
};

export default RegisterPage