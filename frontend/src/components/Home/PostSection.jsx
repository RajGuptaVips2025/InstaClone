import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { BiBookmarks } from "react-icons/bi";
import StorySection from "./StorySection";
import SideBar from "./SideBar";
import SuggestionSection from "./SuggestionSection";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useSelector } from "react-redux";

const PostSection = () => {
    const [posts, setPosts] = useState([]);
    const userDetail = useSelector((state) => state?.user?.userDetail);

    useEffect(() => {
        console.log("PostSection userDetail:", userDetail);
    }, [userDetail]);

    useEffect(() => {
        console.log("PostSection userDetail:", userDetail);
    }, [userDetail]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("/api/posts/getposts");
                // console.log(response.data.posts)
                setPosts(response.data.posts); // Save fetched posts to state
            } catch (error) {
                console.error("Error fetching posts:", error.message);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <div className="flex">
                <SideBar />
            </div>

            <div className="flex justify-center w-full mt-4">
                {/* Middle Content: Story and Post Section */}
                <div className="flex flex-col gap-4 w-full md:w-2/5 items-center ml-96 mr-32">
                    {/* Story Section */}
                    <div className="w-full flex justify-center">
                        <StorySection />
                    </div>

                    {/* Post Section */}
                    <div className="w-[500px]">
                        {posts.map((post) => (
                            <Post key={post._id} post={post} />
                        ))}
                    </div>
                </div>

                {/* Suggestions Section */}
                <SuggestionSection />
            </div>
        </>
    );
};

const Post = memo(({ post }) => (
    <article className="rounded-lg shadow-lg overflow-hidden mb-4">
        <header className="p-4 flex items-center">
            <Link to={`/profile/${post.user}`} className="flex items-center">
                <img
                    src={assets.profile_picture} // Replace with your default profile image
                    alt={`Profile of ${post.user}`}
                    className="w-10 h-10 rounded-full mr-2"
                    loading="lazy"
                />
                <h2 className="font-bold text-gray-900">{post.user}</h2>
            </Link>
        </header>
        <figure>
            {post?.mediaType === 'video' ? <video autoPlay muted controls className="w-full h-full" src={`http://localhost:3000${post.video}`}></video> : <img
                src={`http://localhost:3000${post.image}`}
                alt={`Post by ${post.user}`}
                className="w-full"
                loading="lazy"
            />}

        </figure>
        <section className="flex flex-row items-center justify-between m-2">
            <div className="text-black flex gap-3">
                <IconButton icon={FaRegHeart} label="Like" />
                <IconButton icon={FaRegComment} label="Comment" />
                <IconButton icon={IoIosSend} label="Send" />
            </div>
            <IconButton icon={BiBookmarks} label="Save" />
        </section>
        <p className="text-black-300 px-3 pb-3">0 likes</p>
        <p className="text-gray-700 px-3">{post.caption}</p>
        <CommentForm />
    </article>
));

const IconButton = ({ icon: Icon, label }) => (
    <button aria-label={label}>
        <Icon size={20} />
    </button>
);

const CommentForm = () => (
    <form className="flex items-center gap-2 px-3 pb-3" method="" action="">
        <textarea
            placeholder="Add a Comment"
            className="block outline-none w-full pt-2 resize-none bg-transparent rounded-md"
            name="content"
            aria-label="Comment"
        ></textarea>
        <button
            type="submit"
            className="text-sm block rounded-md bg-transparent text-black"
            aria-label="Post Comment"
        >
            Post
        </button>
    </form>
);

export default PostSection;
