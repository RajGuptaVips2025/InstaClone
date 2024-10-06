import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import SideBar from '../Home/SideBar';
import Settings from './Settings';

function EditProfile() {
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/user/profile/${id}`, { withCredentials: true });
                setUsername(response.data.username);
                setName(response.data.name);
                setBio(response.data.bio);
                setProfileImage(response.data.profileImage);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('name', name);
        formData.append('bio', bio);

        // Align with Multer's 'fields' configuration for 'image'
        if (profileImage) {
            formData.append('image', profileImage); // Use 'image' instead of 'profileImage'
        }

        try {
            await axios.post(`/api/user/edit/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="flex items-center ml-[260px]">
            <SideBar />
            <Settings />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 w-full min-w-[865px] h-screen shadow-lg">
                    {/* Profile Header */}
                    <div className="flex items-center mb-6 bg-gray-100 p-4 rounded">
                        <img
                            src={previewImage || assets.profile_picture}
                            alt="Profile"
                            className="rounded-full w-20 h-20 object-cover"
                        />
                        <div className="ml-4">
                            <h2 className="text-xl font-bold">{name}</h2>
                            <p className="text-gray-500 text-sm">{username}</p>
                        </div>
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                            aria-label="Change Profile Photo"
                        >
                            Change photo
                        </button>
                    </div>

                    {/* Name Input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your name"
                            aria-label="Name"
                        />
                    </div>

                    {/* Username Input */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your username"
                            aria-label="Username"
                        />
                    </div>

                    {/* Bio Text Area */}
                    <div className="mb-4">
                        <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 resize-none text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Write something about yourself (up to 160 words)"
                            aria-label="Bio"
                            rows="3"
                            maxLength="160"
                        />
                    </div>

                    {/* File Input for Profile Image */}
                    <div className="mb-4">
                        <label htmlFor="profileImage" className="block text-gray-700 text-sm font-bold mb-2">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            id="profileImage"
                            name="profileImage"
                            onChange={handleFileChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                            aria-label="Profile Image"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-start">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
