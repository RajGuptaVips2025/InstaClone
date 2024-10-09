import React, { useState } from 'react';
import { assets } from '../../assets/assets'; // Ensure this is correctly defined and imported
import { GoHomeFill } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import useGetSearchUser from '@/hooks/useGetSearchUser';

function Sidebar() {
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [query, setQuery] = useState('');
   const { results, loading, error } = useGetSearchUser(query); // Use the hook and pass the query

   const handleSearchClick = () => {
      setIsSearchOpen(!isSearchOpen);
   };

   const handleSearchChange = (e) => {
      setQuery(e.target.value); // Update the query state with user input
   };

   const links = [
      { id: 1, icon: <GoHomeFill size={25} />, label: "Home", link: '/' },
      { id: 2, icon: <IoSearchOutline size={25} />, label: "Search", link: '#', onClick: handleSearchClick },
      { id: 3, icon: <MdOutlineExplore size={25} />, label: "Explore", link: '/explore/' },
      { id: 4, icon: <BiSolidMoviePlay size={25} />, label: "Reels", link: '/reels/' },
      { id: 5, icon: <FiSend size={25} />, label: "Messages", link: '/direct/inbox' },
      { id: 6, icon: <FaRegHeart size={25} />, label: "Notification", link: '/' },
      { id: 7, icon: <CiSquarePlus size={25} />, label: "Create", link: '/' },
      { id: 8, icon: <RxHamburgerMenu size={25} />, label: "More", link: '/' },
   ];

   return (
      <aside className={`fixed hidden z-10 sm:block top-0 ${isSearchOpen ? "w-[35.2%]" : "w-[18.2%]"} duration-150 h-screen p-2 bg-white border-r border-zinc-800`}>
         <div className="flex">
            <div className={`flex ${isSearchOpen ? "w-8" : "w-full"} flex-col items-start`}>
               <div className="w-44 ml-3 mb-5 mt-8 h-16">
                  {isSearchOpen ? <FaInstagram size={25} /> : <img className="w-28 -ml-2" src={assets.instagram_png} alt="Instagram Logo" />}
               </div>

               <nav className={`flex flex-col gap-1 ${isSearchOpen ? "" : "w-full"}`}>
                  {links.map((link) => (
                     <Link key={link.id} to={link.link} className={`${isSearchOpen ? "w-[20%]" : "w-[90%]"}`}>
                        <div onClick={link.onClick} className={`${isSearchOpen ? "w-[50px]" : "w-full"} flex items-center gap-4 p-3 rounded-md cursor-pointer hover:scale-105 duration-150 hover:bg-[#efefef]`}>
                           <span className="text-black">{link.icon}</span>
                           <span className={`text-black ${isSearchOpen && "hidden"}`}>{link.label}</span>
                        </div>
                     </Link>
                  ))}
               </nav>
            </div>
            {isSearchOpen && (
               <div className="w-full ml-6 mt-36 relative">
                  <input
                     type="text"
                     className="w-96 px-4 py-2 outline-none bg-[#efefef] rounded-lg"
                     placeholder="Search..."
                     value={query}
                     onChange={handleSearchChange}
                  />
                  {loading && <p>Loading...</p>} {/* Display loading state */}
                  {error && <p>{error}</p>} {/* Display error message */}
                  {results.length > 0 && (
                     <div className="absolute border-t-[.1px] border-zinc-900 z-10 mt-5 w-full bg-white rounded-lg shadow-lg">
                        <p className='p-5 text-black'>Recent</p>
                        <ul>
                           {results.map((result) => (
                              <Link key={result._id} to={`/profile/${result.username}`}>
                                 <li className="w-96 px-4 py-2 cursor-pointer hover:bg-zinc-800">
                                    <div className="flex items-center gap-3">
                                       <div className="w-[42px] h-[42px] border border-zinc-500 rounded-full overflow-hidden p-0.5">
                                          <img className="w-full h-full rounded-full object-cover" src={result.profilePicture || assets.profile_picture} alt={result.username} />
                                       </div>
                                       <span className="text-black">{result.username}</span>
                                    </div>
                                 </li>
                              </Link>
                           ))}
                        </ul>
                     </div>
                  )}
               </div>
            )}
         </div>
      </aside>
   );
}

export default Sidebar;
