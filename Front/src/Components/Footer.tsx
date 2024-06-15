import React from 'react'

const Footer = () => {
  return (
   <footer className="bg-gray-800 text-gray-300 mt-12 py-8">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex justify-between">
       <div>
         <span className="text-lg font-bold">KnowledgeHub</span>
       </div>
       <div>
         <a href="#" className="text-gray-300 hover:text-white px-3 py-2">
           Home
         </a>
         <a href="#" className="text-gray-300 hover:text-white px-3 py-2">
           About
         </a>
         <a href="#" className="text-gray-300 hover:text-white px-3 py-2">
           Services
         </a>
         <a href="#" className="text-gray-300 hover:text-white px-3 py-2">
           Contact
         </a>
       </div>
     </div>
     <div className="mt-4">
       <p>&copy; {new Date().getFullYear()} KowledgeHub. All rights reserved.</p>
     </div>
   </div>
 </footer>
);
};

export default Footer