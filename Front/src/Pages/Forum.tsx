import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import ForumQuestion from "../Components/ForumQuestion";
import AddForumQuestionModal from "../Components/AddForumQuestionModal";
import Footer from "../Components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

interface Post {
  category: string;
  id: string;
  content: string;
  status: string;
  subcategory: string;
  title: string;
  comments: Comment[];
}

const Forum = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  
  useEffect(() => {
    axios.get("http://localhost:5000/post")
      .then(response => {
        setPosts(response.data.posts);
        console.log(response.data.posts);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const svgplus = (
    <svg className="mr-3" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  const svgstar = (
    <svg fill="#f7b602" className="mx-2" width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"/>
  </svg> );

  return (
    <>
      <Navbar/>
      <div className="container mx-auto p-4 max-w-[1240px] mt-10">
        <div className="text-2xl text-center flex flex-col items-center">
          <div className="w-full flex justify-center items-center mb-4">
            <div className="search-div flex items-center space-x-4 py-4 px-52 rounded-lg w-full max-w-[1240px]">
              <input
                className="search-forum flex-grow p-2 border border-gray-300 rounded-lg"
                type="search"
                name="search"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div
                className="text-lg px-4 py-2 bg-primary text-white rounded-lg inline-flex items-center cursor-pointer
                hover:bg-secondary  ease-in-out hover:scale-110 duration-500"
                onClick={openModal}
              >
                {svgplus}
                Add Question
              </div>
            </div>
          </div>
          <div className="flex space-x-4 w-full">
            <div className="w-1/4 p-4 rounded-lg shadow-md">
              <div>
                <div className="w-full inline-flex place-content-center text-xl items-center h-10"><input className="mx-2" type="checkbox"/>Task solved</div>
                <div className="w-full inline-flex place-content-center text-xl items-center border-y border-primary h-10"><input className="mx-2" type="checkbox"/>Task unsolved</div>
                <div className="w-full inline-flex place-content-center text-xl items-center h-10"><input className="mx-2" type="checkbox"/>Most {svgstar}</div>
                <div className="w-full inline-flex place-content-center text-xl items-center h-10 border-y border-primary"><input className="mx-2" type="checkbox"/>Most answers</div>
                <h3 className="text-primary mt-10">Categories:</h3>
                <ul className="text-secondary text-lg">
                  <li><input className="mx-2" type="checkbox"/>Programming</li>
                  <li><input className="mx-2" type="checkbox"/>IT</li>
                  <li><input className="mx-2" type="checkbox"/>Math</li>
                  <li><input className="mx-2" type="checkbox"/>Languages</li>
                  <li><input className="mx-2" type="checkbox"/>Biology</li>
                  <li><input className="mx-2" type="checkbox"/>Other</li>
                </ul>
              </div>
            </div>
            <div className="w-3/4 flex flex-col space-y-4">
              {posts
              .filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.subcategory.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((post, index) => (
                <Link key={index} to={`/forum/${post.id}`}>
                  <ForumQuestion
                    
                    title={post.title}
                    category={post.category}
                    subcategory={post.subcategory}
                    description={post.content}
                    answerCount={post.comments.length}
                  />                
                </Link>

              ))}
            </div>
            <div className="w-1/4 p-4 rounded-lg shadow-md">
              <img
                className="w-full h-auto rounded-xl"
                src="src/Assets/Images/reklama.jpg"
                alt="Lech-reklama"/>
              <img  className="w-full h-auto rounded-xl my-10"
                src="src/Assets/Images/30lat-logo.png"
                alt="UAM-reklama" />
            </div>
          </div>
        </div>
      </div>
      <AddForumQuestionModal isVisible={isModalVisible} onClose={closeModal} />
      <Footer />
    </>
  );
};

export default Forum;
