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
  const [searchInput, setSearchInput] = useState<string>("");

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

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchInput(input);
    const filtered = tests.filter((test) => 
      test.category.toLowerCase().includes(input.toLowerCase()) ||
      test.subcategory.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredTests(filtered);
  };

  return (
    <>
      <Navbar user="" />
      <div className="container mx-auto mt-10 p-4 w-[1240px]">
        <div className="search-bar mb-4 w-1/2 mx-auto">
          <input
            type="text"
            className="w-full p-2 border border-primary rounded border-opacity-30"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="category-selection col-span-1 p-4">
            <div className="rounded-xl p-4 shadow-md">
              <ol className="list-disc pl-5 ">
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
          <div className="main-content col-span-2 bg-white p-4 shadow-lg shadow-primary">
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
          <div className="w-5/7 rounded-xl p-4 shadow-md">
            <img
              className="w-full h-auto rounded-xl"
              src="src/Assets/Images/reklama.jpg"
              alt="Lech-reklama"
            />
            <img
              className="w-full h-auto rounded-xl my-10"
              src="src/Assets/Images/30lat-logo.png"
              alt="UAM-reklama"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tests;
