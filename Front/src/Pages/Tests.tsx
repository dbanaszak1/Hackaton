import React from 'react';
import Navbar from '../Components/Navbar';
import TestContent from '../Components/TestContent'; // Adjust the import path as needed

const Tests = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="search-bar mb-4">
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Search" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="category-selection col-span-1 bg-gray-200 p-4">
            <div className="bg-white p-4 border border-gray-300 rounded">
              <h2 className="text-lg font-bold mb-2">Kategoria:</h2>
              <ul>
                <li>- 1</li>
                <li>- 1</li>
                <li>- 1</li>
                <li>- 1</li>
                <li>- 1</li>
                <li>- 1</li>
                <li>- 1</li>
              </ul>
            </div>
          </div>
          <div className="main-content col-span-2 bg-white p-4">
            <TestContent category="Category 1" subcategory="Subcategory 1" level="Level 1" />
            <TestContent category="Category 2" subcategory="Subcategory 2" level="Level 2" />
            <TestContent category="Category 3" subcategory="Subcategory 3" level="Level 3" />
            <TestContent category="Category 4" subcategory="Subcategory 4" level="Level 4" />
          </div>
          <div className="ads col-span-1 bg-gray-200 p-4">
            <div className="ad-content mb-4 bg-white p-4 border border-gray-300 rounded">
              <h2 className="text-lg font-bold">Reklama</h2>
              {/* Add your ad content here */}
            </div>
            <div className="ad-content bg-white p-4 border border-gray-300 rounded">
              <h2 className="text-lg font-bold">Reklama</h2>
              {/* Add your ad content here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tests;
