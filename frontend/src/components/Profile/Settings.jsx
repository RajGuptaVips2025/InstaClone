import React from 'react';
import { CgProfile } from "react-icons/cg";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineLockPerson } from "react-icons/md";
import { MdStars } from "react-icons/md";
import { ImBlocked } from "react-icons/im";
import { MdHideSource } from "react-icons/md";
import { FiMessageCircle } from "react-icons/fi";
import { CiAt } from "react-icons/ci";
import { FiShare2 } from "react-icons/fi";
import { ImEyeBlocked } from "react-icons/im";
import { CiVolumeMute } from "react-icons/ci";
import { IoHeartDislike } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import { IoLanguage } from "react-icons/io5";
import { MdLaptop } from "react-icons/md";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import { IoHelpBuoySharp } from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { TiDeviceLaptop } from "react-icons/ti";
import { GrShieldSecurity } from "react-icons/gr";

function Settings() {
    const links = [
        { id: 1, icon: <CgProfile size={28} />, label: "Edit Profile", link: '/' }, // Update the icon path
        { id: 2, icon: <FaRegBell size={28} />, label: "Notifications", link: '/' },
        { id: 3, icon: <MdOutlineLockPerson size={28} />, label: "Account Privacy", link: '/' },
        { id: 4, icon: <MdStars size={28} />, label: "Close Friends", link: '/' },
        { id: 5, icon: <ImBlocked size={28} />, label: "Block", link: '/' },
        { id: 6, icon: <MdHideSource size={28} />, label: "Hide story and live", link: '/' },
        { id: 7, icon: <FiMessageCircle size={28} />, label: "Messages and story replies", link: '/' },
        { id: 8, icon: <CiAt size={28} />, label: "Tags and mentions", link: '/', },
        { id: 9, icon: <FiShare2 size={28} />, label: "Sharing and remixes", link: '/' },
        { id: 10, icon: <ImEyeBlocked size={28} />, label: "Restricted accounts", link: '/' },
        { id: 11, icon: <CiVolumeMute size={28} />, label: "Muted accounts", link: '/' },
        { id: 12, icon: <IoHeartDislike size={28} />, label: "Like and share counts", link: '/' },
        { id: 13, icon: <BsDownload size={28} />, label: "Archiving and downloading", link: '/' },
        { id: 14, icon: <IoLanguage size={28} />, label: "Language", link: '/' },
        { id: 15, icon: <MdLaptop size={28} />, label: "Website Permissions", link: '/' },
        { id: 16, icon: <MdOutlineSupervisorAccount size={28} />, label: "Supervision", link: '/' },
        { id: 17, icon: <HiOutlineChartBarSquare size={28} />, label: "Account type and tools", link: '/' },
        { id: 18, icon: <IoHelpBuoySharp size={28} />, label: "Help", link: '/' },
        { id: 19, icon: <MdOutlinePrivacyTip size={28} />, label: "Privacy Centre", link: '/' },
        { id: 20, icon: <IoPersonOutline size={28} />, label: "Account Status", link: '/' },
    ];

    return (
        <div className="flex">
            {/* Sidebar with scrolling */}
            <div className="w-[400px] p-4 bg-gray-100 h-screen overflow-y-auto">
                <h2 className="text-lg font-bold mb-4 ml-2">Settings</h2>
                <div className="space-y-2">
                    {/* Accounts Centre Section */}
                    <div className="p-5 rounded-md bg-white hover:bg-[#efefef] shadow-custom">
                        <h3 className="text-md font-medium mb-2 mx-1">Accounts Centre</h3>
                        <p className="text-sm text-gray-500 mx-1">
                            Manage your connected experiences and account settings across Meta technologies.
                        </p>
                        <ul className="mt-3 space-y-1">
                            <li>
                                <a href="#" className="flex items-center text-gray-700 hover:text-gray-900">
                                    <IoPersonOutline className='mx-1' size={14} />
                                    Personal details
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center text-gray-700 hover:text-gray-900">
                                    <GrShieldSecurity className='mx-1' size={14} />
                                    Password and security
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center text-gray-700 hover:text-gray-900">
                                    <TiDeviceLaptop className='mx-1' size={14} />
                                    Ad preferences
                                </a>
                            </li>
                        </ul>
                        <div className="mt-3 text-blue-500 mx-1">
                            See more in Accounts Centre
                        </div>
                    </div>

                    <div className="p-3 rounded-md bg-white flex flex-col items-start shadow-custom">
                        {/* <h3 className="text-md font-medium mb-2">How you use Instagram</h3> */}
                        <ul className="mt-3 space-y-1 mx-auto">
                            {links.map((link) => (
                                <li key={link.id} className="border-2 border-black pr-32 pl-4 py-2 rounded-md hover:bg-[#efefef] cursor-pointer">
                                    <a href="#" className="flex items-center text-gray-700 hover:text-gray-900 mx-2">
                                        <span className="mr-2">{link.icon}</span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Settings;
