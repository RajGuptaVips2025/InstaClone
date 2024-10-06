import React, { useEffect, useState } from 'react';
import Sidebar from '../Home/SideBar';
import axios from 'axios';
import { BiSolidMoviePlay } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { IoChatbubbleSharp } from "react-icons/io5";
import PostViewer from '../Profile/PostViewer';

const ExploreGrid = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [isPostViewerOpen, setIsPostViewerOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/posts/getPosts');
            console.log(response.data.posts); // Check if posts are being fetched correctly
            setAllPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const showPostViewer = (e, post) => {
        e.preventDefault();
        console.log('Post clicked:', post); // Debugging
        setSelectedPost(post);
        setIsPostViewerOpen(true);
    };

    const closePostViewer = () => {
        setSelectedPost(null);
        setIsPostViewerOpen(false); // Ensure this is set to false
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderMedia = (post) => {
        return (
            <>
                {post?.mediaType === 'image' ? (
                    <img
                        src={`http://localhost:3000/${post?.image}`}
                        alt={post?.caption}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <video
                        autoPlay
                        muted
                        src={`http://localhost:3000/${post?.video}`}
                        loop
                        className="object-cover w-full h-full duration-300"
                    />
                )}
                <div className="bg-black/20 text-white absolute w-full h-full top-0 hidden group-hover:flex justify-center items-center gap-5">
                    <div className="likes flex justify-center items-center gap-1">
                        <FaHeart size={18} />
                        <p>{post?.likes?.length}</p>
                    </div>
                    <div className="comments flex justify-center items-center gap-1">
                        <IoChatbubbleSharp className="transition-colors text-white duration-100" size={25} style={{ transform: 'scaleX(-1)' }} />
                        <p>{post?.comments?.length}</p>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            {isPostViewerOpen && selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-4 rounded-lg">
                        <PostViewer post={selectedPost} />
                        <button
                            className="absolute top-0 right-0 m-4 text-black hover:text-gray-700"
                            onClick={closePostViewer}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="w-[81.8%] bg-white h-screen grid grid-cols-3 gap-1 px-20 py-12 ml-auto">
                {allPosts?.map((post, index) => {
                    if (index === 2) {
                        return (
                            <div onClick={(e) => showPostViewer(e, post)}
                                key={post?._id}
                                className="relative h-full col-span-1 row-span-2 group cursor-pointer"
                            >
                                {renderMedia(post)}
                                <div className="absolute top-5 right-5 text-white">
                                    <BiSolidMoviePlay size={25} />
                                </div>
                                <p className="absolute bottom-2 left-2 text-white">{post?.caption}</p>
                            </div>
                        );
                    }
                    return (
                        <div onClick={(e) => showPostViewer(e, post)} key={post?._id} className="w-full relative h-80 bg-gray-800 col-span-1 group cursor-pointer">
                            {renderMedia(post)}
                            <div className="absolute top-5 right-5 text-white">
                                <BiSolidMoviePlay size={25} />
                            </div>
                            <p className="absolute bottom-2 left-2 text-white">{post?.caption}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

const Explore = () => {
    return (
        <>
            <Sidebar />
            <ExploreGrid />
        </>
    );
};

export default Explore;
