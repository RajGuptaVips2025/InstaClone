import React, { useState } from 'react';
import useGetSearchUser from '@/hooks/useGetSearchUser'; // Import the hook
import axios from 'axios';

const AddUsers = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState(''); // State for the search input
    const [selectedUsers, setSelectedUsers] = useState([]); // State to hold selected users
    const [groupname, setGroupname] = useState(''); // State for the group name input
    console.log(selectedUsers)

    // Use the custom hook to fetch users based on search term
    const { results: searchResults, loading, error } = useGetSearchUser(searchTerm);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Update search term
    };

    const handleGroupname = (e) => {
        const value = e.target.value;
        setGroupname(value); // Update group name
    };

    const handleSelectUser = (user) => {
        if (selectedUsers.includes(user)) {
            setSelectedUsers(selectedUsers.filter((u) => u !== user));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleRemoveUser = (user) => {
        setSelectedUsers(selectedUsers.filter((u) => u !== user));
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        console.log('Creating group with selected users:', selectedUsers);
        const usersID = selectedUsers.map(obj => obj._id);
        console.log('Participants IDs:', usersID);

        try {
            const res = await axios.post('/api/message/group/create', { groupName: groupname, participants: usersID });

            // Log the complete response
            // Optionally, close the modal or reset states
            onClose();
            setSelectedUsers([]);
            setGroupname('');
        } catch (error) {
            console.error('Error creating group:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            {/* Top bar */}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">New message</h3>
                <button
                    className="text-gray-500 hover:text-black"
                    onClick={onClose} // Call the onClose function to close the modal
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Add Users Label and Input */}
            <label htmlFor="add-users" className="block text-gray-700 font-semibold mt-2">Add Users</label>
            <input
                id="add-users"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search users..."
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />

            {/* Group Name Label and Input */}
            <label htmlFor="group-name" className="block text-gray-700 font-semibold mt-4">Group Name</label>
            <input
                id="group-name"
                type="text"
                value={groupname}
                onChange={handleGroupname}
                placeholder="Enter group name..."
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />

            {/* Added Users Section */}
            <label className="block text-gray-700 font-semibold mt-2">Added</label>
            <div className="flex flex-wrap gap-2 mt-2">
                {selectedUsers.map((user) => (
                    <div key={user._id} className="flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-3 py-1">
                        <span>{user.username}</span>
                        <button onClick={() => handleRemoveUser(user)}>
                            {/* Adjust the size and color of the cross icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 hover:text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9l-3-3m0 6l3-3m0 0l3 3m-3-3l-3-3" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* Loading State */}
            {loading && <p>Loading...</p>}
            {/* Error State */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Search Results */}
            <div className="mt-4">
                {searchResults.length > 0 ? (
                    searchResults.map((user) => (
                        <div
                            key={user._id}
                            onClick={() => handleSelectUser(user)}
                            className={`flex items-center p-2 rounded-lg cursor-pointer ${selectedUsers.includes(user) ? 'bg-blue-100' : ''
                                }`}
                        >
                            <img src={user.profilePicture} alt={user.username} className="w-10 h-10 rounded-full mr-2" />
                            <span>{user.username}</span>
                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>

            {/* Chat Button */}
            <div className="mt-4">
                <button onClick={handleCreateGroup}
                    className={`w-full p-2 rounded-lg text-white font-semibold ${selectedUsers.length === 0
                        ? 'bg-blue-300 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    disabled={selectedUsers.length === 0}
                >
                    Chat
                </button>
            </div>
        </div>
    );
};

export default AddUsers;

