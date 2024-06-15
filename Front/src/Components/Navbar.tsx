import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
  const[currentState, setCurrentState]=useState(false);
  return (
  <>
    <nav className="sticky top-0 z-50 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-4 inline-flex w-full h-20">
    <div className="text-gray-700 text-xl w-1/2 text-center items-center inline-flex">
        <Link to="" className="m-auto h-full inline-flex items-center">      
          <img src="src/Assets/Images/logo.png" alt="logo" className="h-16 w-20" />           
        </Link>
    </div>
        <svg onClick={()=>setCurrentState(!currentState)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={false===currentState?"w-10 h-10 absolute right-5 lg:hidden":"w-10 h-10 hidden absolute right-5 lg:hidden"}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <svg onClick={()=>setCurrentState(!currentState)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={false===currentState?"w-10 h-10 absolute hidden right-5 lg:hidden":"w-10 h-10 absolute right-5 lg:hidden"}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>



    <ul className="space-x-4 text-gray-700 w-1/2 text-3xl place-content-center hidden lg:flex">
      <li>
        <a href="" className="hover:text-gray-500">Home</a>
      </li>
      <li>
        <a href="/tests" className="text-2xl hover:text-gray-500">Tests</a>
      </li>
      <li>
        <a href="/forum" className="text-xl hover:text-gray-500">Forum</a>
      </li>
      <li>
        <a href="/planner" className="text-lg hover:text-gray-500">AI Planner</a>
      </li>
    </ul>    

  </nav>

  <div className={false === currentState ? "hidden" : "flex text-3xl w-full sticky top-20 border-b-2 border-black z-50"}>
    <ul className="bg-white w-full flex-row text-center">
      <li className='w-full text-center py-2 hover:bg-gray-700 hover:text-white duration-300'>
        <a href="">Home</a>
      </li>
      <li className="py-2 border-y-2 text-center hover:bg-gray-700 hover:text-white duration-300">
        <a href="/tests">Tests</a>
      </li>
      <li className="py-2 text-center hover:bg-gray-700 hover:text-white duration-300 border-b-2">
        <a href="/forum">Forum</a>
      </li>
      <li className="py-2 text-center hover:bg-gray-700 hover:text-white duration-300">
        <a href="/planner">AI Planer</a>
      </li>
    </ul>   
  </div>  
</>
  )
}

export default Navbar