import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import TestContent from "../Components/TestContent"; // Adjust the import path as needed
import Footer from "../Components/Footer";

interface Answer {
  id: string;
  question: string;
  answers: string[];
}

interface Test {
  id: string;
  category: string;
  subcategory: string;
  level: string;
  name: string;
  tasks: Answer[];
}

const Tests: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [filteredTests, setFilteredTests] = useState<Test[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get<{ success: string; tests: Test[] }>("http://127.0.0.1:5000/test")
      .then((response) => {
        const testsData = response.data.tests;
        setTests(testsData);
        setFilteredTests(testsData); 

        const uniqueCategories = Array.from(
          new Set(testsData.map((test) => test.category).filter((category) => category !== null))
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.log("There was an error fetching the tests!", error);
      });
  }, []);

  const handleCategoryClick = (category: string) => {
    console.log(`Category clicked: ${category}`);
    if (category === "All Tests") {
      setFilteredTests(tests);
    } else {
      const filtered = tests.filter((test) => test.category === category);
      setFilteredTests(filtered);
    }
  };

  return (
    <>
      <Navbar user="" />
      <div className="container mx-auto mt-10 p-4 w-[1240px]">
        <div className="search-bar mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="category-selection col-span-1 bg-gray-200 p-4">
            <div className="bg-white p-4 border border-gray-300 rounded">
              <ol className="list-disc pl-5">
                <li
                  className="cursor-pointer text-gray-700 hover:text-gray-900 font-medium py-1"
                  style={{ textTransform: "capitalize" }}
                  onClick={() => handleCategoryClick("All Tests")}
                >
                  All Tests
                </li>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="cursor-pointer text-gray-700 hover:text-gray-900 font-medium py-1"
                    style={{ textTransform: "capitalize" }}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="main-content col-span-2 bg-white p-4">
            {filteredTests.map((test, index) => (
              <TestContent
                key={index}
                id={test.id}
                category={test.category}
                subcategory={test.subcategory}
                level={test.level}
              />
            ))}
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
      <Footer />
    </>
  );
};

export default Tests;
