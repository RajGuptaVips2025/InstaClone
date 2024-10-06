import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { BiBookmark } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import { assets } from '../../assets/assets';
import axios from 'axios';
import { useSelector } from 'react-redux';

function PostViewer({ post }) {
    const [user, setUser] = useState(null);
    const [caption, setCaption] = useState('');
    const userDetails = useSelector((state) => state?.user?.userDetail);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/user/profile/${userDetails?._id}`, { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchCaption = async () => {
            try {
                const response = await axios.get(`/api/posts/getpost/${userDetails?._id}`);
                const matchedPost = response.data.posts.find(p => p._id === post._id);
                if (matchedPost) {
                    setCaption(matchedPost.caption);
                }
            } catch (error) {
                console.error('Error fetching post caption:', error);
            }
        };

        fetchCaption();
        fetchUserData();
    }, [userDetails, post]);

    return (
        <div className="flex justify-center rounded-lg mx-auto mt-16 shadow-md w-[80rem] h-[600px]">
            {/* Post Media Section */}
            <div className="w-[60%] bg-black">
                {post?.mediaType === 'image' ? (
                    <img
                        src={`http://localhost:3000${post.image}`}
                        alt="Post"
                        className="w-full h-full object-cover"
                    />
                ) : post?.mediaType === 'video' ? (
                    <video
                        src={`http://localhost:3000${post.video}`}
                        controls
                        className="w-full h-full object-cover"
                    />
                ) : null}
            </div>

            {/* Post Details Section */}
            <div className="w-[40%] bg-white flex flex-col justify-between">
                {/* Header with User Info */}
                <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                        <img
                            src={assets.profile_picture}
                            alt="Profile Picture"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="ml-2 font-medium">{user ? user.username : 'Loading...'}</span>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2zm7 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H10a1 1 0 01-1-1v-2zm7 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" />
                        </svg>
                    </button>
                </div>

                {/* Comments and Post Actions */}
                <div className="flex-grow p-4 overflow-auto">
                    <div className="flex items-center mb-6">
                        <img
                            src={assets.profile_picture}
                            alt="Profile Picture"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="ml-2 font-medium">{user ? user.username : 'Loading...'}</span>
                        <div className='ml-2'>
                            <span>{caption}</span>
                        </div>
                    </div>
                    <div className='ml-3'>
                        <p className="text-gray-700 font-medium mb-2">No comments yet.</p>
                        <p className="text-gray-500">Start the conversation.</p>
                    </div>
                </div>

                {/* Actions and Add Comment Input */}
                <div className="border-t p-4">
                    <div className="flex justify-between mb-4">
                        <div className="flex space-x-4">
                            <FaRegHeart className="text-gray-700 hover:text-red-500 cursor-pointer" />
                            <FaRegComment className="text-gray-700 hover:text-blue-500 cursor-pointer" />
                            <IoIosSend className="text-gray-700 hover:text-blue-500 cursor-pointer" />
                        </div>
                        <BiBookmark className="text-gray-700 hover:text-blue-500 cursor-pointer" />
                    </div>
                    <div className="flex items-center border-t border-gray-300 pt-2">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-grow px-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none"
                        />
                        <button className="ml-4 text-blue-500 font-medium">Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostViewer;
