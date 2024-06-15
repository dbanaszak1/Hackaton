import React, { useState } from "react"
import Navbar from "../Components/Navbar"
import ForumQuestion from "../Components/ForumQuestion"
import AddForumQuestionModal from "../Components/AddForumQuestionModal" // Ensure this path is correct

const Forum = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 max-w-[1240px]">
        <div className="text-2xl text-center flex flex-col items-center">
          <div className="w-full flex justify-center items-center mb-4">
            <div className="search-div flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-[1240px]">
              <input
                className="search-forum flex-grow p-2 border border-gray-300 rounded-lg"
                type="search"
                name="search"
                placeholder="Search..."
              />
              <button className="order px-4 py-2 bg-blue-500 text-white rounded-lg">
                Sort
              </button>
              <button
                className="add-question px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={openModal}
              >
                Add Question
              </button>
            </div>
          </div>
          <div className="flex space-x-4 w-full">
            <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
              <div>
                <h3>Zadania rozwiązane</h3>
                <h3>Zadanie nierozwiązanie</h3>
                <h3>Kategorie:</h3>
                <ul>
                  <li>- 1</li>
                  <li>- 1</li>
                  <li>- 1</li>
                  <li>- 1</li>
                  <li>- 1</li>
                  <li>- 1</li>
                </ul>
              </div>
            </div>
            <div className="w-3/4 flex flex-col space-y-4">
              <ForumQuestion
                category="Programming"
                subcategory="JavaScript"
                question="How do I use React Hooks?"
                description="I am trying to use React Hooks in my project but facing issues with state management..."
                answerCount={5}
              />
              <ForumQuestion
                category="Programming"
                subcategory="TypeScript"
                question="How do I use TypeScript with React?"
                description="I am trying to use TypeScript with React but facing issues with type definitions..."
                answerCount={3}
              />
            </div>
            <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
              <h2>REKLAMY</h2>
            </div>
          </div>
        </div>
      </div>
      <AddForumQuestionModal isVisible={isModalVisible} onClose={closeModal} />
    </>
  )
}

export default Forum
