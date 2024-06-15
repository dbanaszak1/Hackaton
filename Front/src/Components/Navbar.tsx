import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import checkUser from '../App'

interface Props {
  user: string | null;
}

const Navbar = ({user}: Props) => {
  const[currentState, setCurrentState]=useState(false);
  const isLoggedIn = checkUser();
  return (
  <>
    <nav className="sticky top-0 z-50 bg-white shadow-custom-blue p-4 inline-flex w-full h-20">
    <div className="text-gray-700 text-xl w-1/4 text-center items-center inline-flex">
        <Link to="/home" className="m-auto h-full inline-flex items-center place-content-center">      
          <img src="src/Assets/Images/logo.png" alt="logo" className="h-16 w-20 mx-4" />
          <span className='text- font-bold text-2xl font-sans'>KNOWLEDGEHUB</span>      
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
        <a href="/home" className="text-2xl hover:text-primary hover:scale-125 duration-300">Home</a>
      </li>
      <li>
        <a href="/tests" className="text-2xl text-blue hover:text-primary hover:scale-125 duration-300">Tests</a>
      </li>
      <li>
        <a href="/forum" className="text-2xl hover:text-primary hover:scale-125 duration-300">Forum</a>
      </li>
      <li>
        <a href="/planner" className="text-2xl hover:text-primary hover:scale-125 duration-300">AI Planner</a>
      </li>
    </ul>    
    <div className='w-1/4 items-center place-content-center'>
    {
        !isLoggedIn ?
        (      
        <div className='inline-flex'>
            <a href='/register'>
              <button className='text-sm lg:text-lg font-semibold text-gray-600 px-4 hover:text-primary duration-500'>
              SIGN UP
              </button>
            </a> 
            <a href='/login'>
              <button className='text-sm lg:text-lg font-semibold text-gray-600 border-primary border-[1px] px-3 rounded-full hover:bg-primary hover:text-white hover:scale-110 duration-500'>
              LOG IN
              </button>
            </a>            
          </div> 
          ) :
          ( 
          <div className='text-sm lg:text-lg font-semibold text-gray-600 flex justify-end'>
            {localStorage.getItem('authToken')}
          </div>
          )}     
    </div>
  </nav>

  <div className={false === currentState ? "hidden" : "flex text-3xl w-full sticky top-20 border-b-2 border-black z-50"}>
    <ul className="bg-white w-full flex-row text-center">
      <li className='w-full text-center py-2 hover:bg-gray-700 hover:text-white duration-300'>
        <a href="/home">Home</a>
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