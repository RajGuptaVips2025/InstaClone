import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
import SideBar from '../Home/SideBar';
import UploadPost from './UploadPost';
import PostViewer from './PostViewer';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useGetUsersProfiles from '../../hooks/useGetUsersProfiles';
import { setUserDetail } from '../../features/userSlice';

function Profile() {
    const params = useParams();
    const userId = params.id; // Get user ID from the URL
    useGetUsersProfiles(userId); // Fetch user profile based on URL ID
    const userDetails = useSelector((state) => state?.user?.userDetail); // Logged-in user details
    // console.log(userDetails)
    const userDetail = useSelector((state) => state.user.userDetail);

    useEffect(() => {
        console.log("Profile page userDetail:", userDetail);
    }, [userDetail]);

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null); // Track selected post
    const [isPostViewerOpen, setIsPostViewerOpen] = useState(false); // Toggle PostViewer visibility
    const [user, setUser] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true); // Loading state for data fetching
    const [followorUnfollow, setFollowOrUnfollow] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const dispatch = useDispatch();


    const fetchFollowOrUnfollow = async () => {
        try {
            const response = await axios.put(`/api/user/followOrUnfollow/${userId}`);

            console.log(response.data)
            fetchUserData()
            setFollowOrUnfollow(response);
            console.log(response);
        } catch (error) {
            console.error('Error while following or unfollowing the user:', error.message);
        }
    }


    const fetchUserData = async () => {
        try {
            // Fetch user data from the backend using the userId from URL (params)
            const response = await axios.get(`/api/user/profile/${userId}`, { withCredentials: true });
            console.log(response.data.user)
            console.log(response.data.user)
            // const userDetail = response?.data?.user
            // dispatch(setUserDetail(userDetail))
            setUser(response.data.user); // Set the clicked user's profile
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };


    useEffect(() => {
       

        const fetchPosts = async () => {
            try {
                // Fetch posts for the clicked user
                const response = await axios.get(`/api/posts/getpost/${userId}`);
                setPosts(response.data.posts); // Ensure posts are correctly set
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };


        fetchUserData();
        fetchPosts();
    }, [userId]); // Re-fetch whenever the userId in the URL changes

    const handleMediaClick = (post) => {
        setSelectedPost(post); // Set the selected post
        setIsPostViewerOpen(true); // Open PostViewer
        setIsPlaying(true); // playing video
    };

    const closePostViewer = () => {
        setIsPostViewerOpen(false); // Close PostViewer when needed
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    if (!user) {
        return <div>User not found. Please log in.</div>; // Show message if user data is not found
    }

    // Check if the logged-in user is viewing their own profile
    const isCurrentUserProfile = userDetails?._id === user?._id;

    return (
        <div className="flex">
            <SideBar />
            <div className="flex-1 container p-4 mt-6">
                <div className="flex items-center justify-center mb-6">
                    <div className="flex-shrink-0">
                        <img
                            className="w-48 h-48 rounded-full object-cover"
                            src={`http://localhost:3000/${user?.profileImage}` || assets.profile_picture}
                            alt="Profile"
                        />
                    </div>
                    <div className="ml-8 flex flex-col justify-center">
                        <div className="flex items-center mb-4">
                            {/* Render username dynamically */}
                            <h1 className="text-2xl font-semibold">{user.username}</h1>

                            {/* Conditional Buttons */}
                            <div className="flex space-x-4 ml-8">
                                {isCurrentUserProfile ? (
                                    <>
                                        <Link to={`/profile/edit/${user._id}`}>
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                                                Edit Profile
                                            </button>
                                        </Link>
                                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md">
                                            View Archive
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={fetchFollowOrUnfollow} className={`  ${user?.followers?.includes(userDetails?._id) ? "bg-gray-300 text-black" : "bg-blue-500  text-white"} font-semibold py-2 px-4 rounded-md`}>
                                            {user?.followers?.includes(userDetails?._id) ? "Following" : "Follow"}
                                        </button>
                                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md">
                                       messages
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Follow Information */}
                        <div className="flex space-x-10 mb-4">

                            <div className="text-center flex items-center" >
                                <p className="text-lg font-semibold px-1">
                                    {user?.posts?.length}
                                </p>
                                <p className="text-sm text-gray-500">Posts</p>
                            </div>
                            <div className="text-center flex items-center" >
                                <p className="text-lg font-semibold px-1">
                                    {user?.followers?.length}
                                </p>
                                <p className="text-sm text-gray-500">followers</p>
                            </div>
                            <div className="text-center flex items-center" >
                                <p className="text-lg font-semibold px-1">
                                    {user?.following?.length}
                                </p>
                                <p className="text-sm text-gray-500">following</p>
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <div>
                                {user.bio}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className='border-[1px] border-gray-500 w-[75%] ml-[325px]'></div>

                {/* Profile Tabs */}
                <div className="flex justify-center ml-44 border-gray-300 pt-4">
                    {['POSTS', 'SAVED', 'TAGGED'].map((tab) => (
                        <div className='px-3' key={tab}>
                            <button className="text-lg font-bold text-gray-700">
                                {tab}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Image Grid */}
                <div className="flex justify-center mt-6">
                    <div className="flex flex-wrap justify-center w-[800px] ml-[190px] ">
                        {posts?.map((post, idx) => (
                            <div
                                key={idx}
                                className="shadow-custom w-1/3 h-[300px] flex justify-center items-center p-1 cursor-pointer"
                                onClick={() => handleMediaClick(post)} // Handle media click
                            >
                                {post.mediaType === 'image' ? (
                                    <img
                                        src={`http://localhost:3000${post.image}`}
                                        className="object-cover w-full h-full"
                                        alt="Post"
                                    />
                                ) : post.mediaType === 'video' ? (
                                    <video
                                        width="320"
                                        height="240"
                                        className="rounded-md"                                    
                                        muted
                                        autoPlay
                                    >
                                        <source src={`http://localhost:3000${post.video}`} type="video/mp4" />
                                    </video>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>

                {isCurrentUserProfile ?
                    (<div className='ml-[190px]'>
                        <UploadPost />
                    </div>) : ''
                }

                {/* Render PostViewer as a modal */}
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
            </div>
        </div>
    );
}

export default Profile;
