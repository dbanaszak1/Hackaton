import React, { useState } from "react"
import Navbar from "../Components/Navbar"
import ForumQuestion from "../Components/ForumQuestion"
import AddForumQuestionModal from "../Components/AddForumQuestionModal" // Ensure this path is correct
import Footer from "../Components/Footer"

const Forum = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)
  const svgplus = <svg className="mr-3" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>

  return (
    <>
      <Navbar user=""/>
      <div className="container mx-auto p-4 max-w-[1240px] mt-10">
        <div className="text-2xl text-center flex flex-col items-center">
          <div className="w-full flex justify-center items-center mb-4">
            <div className="search-div flex items-center space-x-4 bg-gray-100 py-4 px-52 rounded-lg shadow-md w-full max-w-[1240px]">
              <input
                className="search-forum flex-grow p-2 border border-gray-300 rounded-lg"
                type="search"
                name="search"
                placeholder="Search..."
              />
              <div
                className="add-question px-4 py-2 bg-primary text-white rounded-lg inline-flex items-center cursor-pointer
                hover:bg-secondary  ease-in-out hover:scale-110 duration-500"
                onClick={openModal}
              >{svgplus}
                Add Question
              </div>
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
      <Footer />
    </>
  )
}

export default Forum