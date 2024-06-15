import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

interface Post {
  category: string;
  id: string;
  content: string;
  status: string;
  subcategory: string;
  title: string;
  comments: Comment[];
}

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/post/${id}`)
      .then(response => {
        setPost(response.data.post);
      })
      .catch(error => {
        console.error("Error fetching post:", error);
      });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar user="" />
      <div className="container mx-auto p-4 max-w-[1240px] mt-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{post[0].title}</h1>
          <p className="text-gray-700 mb-4">{post[0].content}</p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Category: {post[0].category}</h2>
              <h2 className="text-lg font-semibold">Subcategory: {post[0].subcategory}</h2>
              <p className="text-gray-600">Status: {post[0].status}</p>
            </div>
            <div>
              <p className="text-gray-600">Posted by: {post[0].creator.name}</p>
              <p className="text-gray-600">Forum Points: {post[0].creator.forumPoints}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SinglePost;
