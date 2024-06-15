import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/Navbar';
import Footer from '../Components/Footer';

const LoginPage = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');
   const [user, setUser] = useState(null);

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const data = {
        email,
        password,
      }
    try {
      const response = await axios.post('http://localhost:5000/auth/login',data, { withCredentials: true } );
      if (response.data.error) {
        console.error('Błąd:', response.data.error);
    } else {
        console.log('Odpowiedź z serwera:', response);
        setMessage(response.data);
        if(response.data === 'Logged in') window.location.replace('/'); //redirect to main page after login
    }
    } catch (error) {
      console.error('Error:', error);
    }
      console.log('Submitted:', { email, password });
    };
  return (
   <>
   <div className="pb-10">
     <NavBar user=''/>
   </div>
     <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-2xl mt-10 shadow-blue-400">
     <h2 className="text-2xl font-semibold mb-4">Log In</h2>
     <form onSubmit={handleSubmit}>
       <div className="mb-4">
         <label htmlFor="email" className="block text-gray-600 mb-2">Email:</label>
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
         <label htmlFor="password" className="block text-gray-600 mb-2">Password:</label>
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
           Log In
         </button>

       </div>
     </form> 
     {message && <p className={message === 'Logged in' ? 'text-green-500 pt-2':'text-red-500 pt-2'}>{message}</p>}
     <div className="py-4">
         <span>Don't have an account?</span>
         <a href="/register">
           <button className='px-2 border-[1px] mx-2 rounded-xl hover:border-primary duration-500'>
               Register here!
           </button>
         </a>        
     </div>
    
   </div>
   <Footer/>
   </>
  )
}

export default LoginPage