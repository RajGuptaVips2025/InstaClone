import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets.js';
import './StorySection.css';

const StorySection = () => {
    const stories = [
        { id: 1, img: assets.profile_picture, username: 'ayush98994', link: '/profile/1' },
        { id: 2, img: assets.profile_picture, username: 'singh.arya...', link: '/profile/2' },
        { id: 3, img: assets.profile_picture, username: 'harshbeni...', link: '/profile/3' },
        { id: 4, img: assets.profile_picture, username: 'sanjeetbud...', link: '/profile/4' },
        { id: 5, img: assets.profile_picture, username: 'lecan.india', link: '/profile/5' },
        { id: 6, img: assets.profile_picture, username: 'coachshan...', link: '/profile/6' },
        { id: 7, img: assets.profile_picture, username: 'piyu.sshh__', link: '/profile/7' },
        { id: 8, img: assets.profile_picture, username: 'gulati.04', link: '/profile/8' },
        { id: 9, img: assets.profile_picture, username: 'gulati.04', link: '/profile/9' },
        { id: 10, img: assets.profile_picture, username: 'gulati.04', link: '/profile/10' },
        { id: 11, img: assets.profile_picture, username: 'gulati.04', link: '/profile/11' },
        { id: 12, img: assets.profile_picture, username: 'gulati.04', link: '/profile/12' },
        { id: 13, img: assets.profile_picture, username: 'gulati.04', link: '/profile/13' },
        { id: 14, img: assets.profile_picture, username: 'gulati.04', link: '/profile/14' },
        { id: 15, img: assets.profile_picture, username: 'gulati.04', link: '/profile/15' },
    ];

    const scrollRef = useRef(null);

    const handleScroll = (direction) => {
        const { current } = scrollRef;
        if (direction === 'left') {
            current.scrollLeft -= 100; // Adjust scroll amount
        } else if (direction === 'right') {
            current.scrollLeft += 100; // Adjust scroll amount
        }
    };

    return (
        <div className="relative flex items-center justify-center w-[650px] h-[100px] overflow-hidden">
            {/* Left Arrow */}
            <button
                onClick={() => handleScroll('left')}
                className="absolute left-0 z-10 p-2 text-black bg-white rounded-full shadow-md"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
                &#8592;
            </button>

            {/* Stories Container */}
            <div
                ref={scrollRef}
                className="scrollbar-hide flex gap-4 overflow-x-auto items-center h-full"
                style={{ scrollBehavior: 'smooth' }}
            >
                {stories.map((story) => (
                    <Link to={story.link} key={story.id} className="relative w-[70px] h-[70px] flex-shrink-0">
                        <img
                            src={story.img}
                            alt={story.username}
                            className="rounded-full w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-1 text-black text-[10px] bg-white px-1 rounded">
                            {story.username}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={() => handleScroll('right')}
                className="absolute right-0 z-10 p-2 text-black bg-white rounded-full shadow-md"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
                &#8594;
            </button>
        </div>
    );
};

export default StorySection;
