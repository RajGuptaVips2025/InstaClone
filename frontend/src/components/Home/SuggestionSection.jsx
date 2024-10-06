import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from '../../assets/assets';
import useGetSuggestedUser from "@/hooks/useGetSuggestedUser";

function SuggestionSection() {
    const suggestedUser = useGetSuggestedUser();

    const handleClickUser = (userId) => {
        setHighlightedUserId(userId); // Set the clicked user ID to highlight
    };

    return (
        <div className="mt-4 w-[25%] pr-8">
            <div className="flex items-center justify-between">
                <h2 className="text-lg text-gray-600 pl-3">Suggested for you</h2>
                <button className="pr-3 text-zinc-700 text-xs text-bold">See All</button>
            </div>
            {suggestedUser && suggestedUser.map((suggestion) => (
                <div
                    key={suggestion._id} // Unique key using _id
                    className={`flex items-center justify-between gap-3 py-2}`} // Highlight the clicked user
                    onClick={() => handleClickUser(suggestion._id)} // Set the clicked user ID
                >
                    {/* Link to the suggested user's profile */}
                    <Link to={`/profile/${suggestion._id}`} className="flex items-center justify-center pb-1 pl-1">
                        <img
                            src={assets.profile_picture}
                            alt={suggestion.username}
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="p-2">
                            <span className="font-medium">{suggestion.username}</span>
                            {suggestion.followedBy && (
                                <span className="text-gray-500">
                                    Followed by {suggestion.followedBy}
                                </span>
                            )}
                        </div>
                    </Link>
                    <div>
                        {/* Display Follow or Following button */}
                        <button
                            className={`px-4 py-2 rounded-md ${suggestion.isFollowing
                                ? "text-gray-700"
                                : "text-black"
                                }`}
                        >
                            {suggestion.isFollowing ? "Following" : "Follow"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SuggestionSection;

