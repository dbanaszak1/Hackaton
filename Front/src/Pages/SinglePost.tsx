import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Comment from '../Components/Comment';

interface User {
    completedTests: any[];
    forumPoints: number;
    id: string;
    isPremium: boolean;
    name: string;
    testPoints: number;
}

interface Comment {
    comment: string;
    creator: User;
}

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
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/post/id/${id}`)
            .then(response => {
                console.log(response.data);
                setPost(response.data.post);
            })
            .catch(error => {
                console.error("Error fetching post:", error);
            });

        axios.get(`http://localhost:5000/post/${id}/comments`)
            .then(response => {
                console.log(response.data);
                setComments(response.data.comments);
            })
            .catch(error => {
                console.error("Error fetching comments:", error);
            });
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar/>
            <div className="container mx-auto p-4 max-w-[1240px] mt-10">
                <div className='text-4xl text-primary w-full text-center text-bold pb-10'>FORUM</div>
                <div className="bg-white p-6 rounded-lg shadow-md shadow-primary">
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">Category: {post.category}</h2>
                            <h2 className="text-lg font-semibold">Subcategory: {post.subcategory}</h2>
                            <p className="text-gray-600">Status: {post.status}</p>
                        </div>
                    </div>
                    <div className='border-t border-primary text-3xl pt-4 mt-12'>Comments:</div>
                    {comments.map((comment, index) => (
                        <Comment
                            key={index}
                            comment={comment.comment}
                            creator={comment.creator}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SinglePost;
