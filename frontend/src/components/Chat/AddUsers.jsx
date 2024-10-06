import React, { useState } from 'react';

const AddUsers = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    // Mock search results (replace with API call)
    const mockUsers = [
        { id: 1, username: 'saurav', avatar: 'https://via.placeholder.com/150' },
        { id: 2, username: 'sagar', avatar: 'https://via.placeholder.com/150' },
        { id: 3, username: 'rushil', avatar: 'https://via.placeholder.com/150' },
        { id: 4, username: 'harsh', avatar: 'https://via.placeholder.com/150' },
        { id: 5, username: 'pankaj', avatar: 'https://via.placeholder.com/150' },
        { id: 6, username: 'raghav', avatar: 'https://via.placeholder.com/150' },
        { id: 7, username: 'kartikey', avatar: 'https://via.placeholder.com/150' },
        // Add more mock users
    ];

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter mock users by search term (replace with actual API call)
        const results = mockUsers.filter((user) =>
            user.username.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(results);
    };

    const handleSelectUser = (user) => {
        if (selectedUsers.includes(user)) {
            setSelectedUsers(selectedUsers.filter((u) => u !== user));
        } else {
            setSelectedUsers([...selectedUsers, user]);
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

            {/* Search Input */}
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search users..."
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            />

            {/* Search Results */}
            <div className="mt-4">
                {searchResults.length > 0 ? (
                    searchResults.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => handleSelectUser(user)}
                            className={`flex items-center p-2 rounded-lg cursor-pointer ${selectedUsers.includes(user) ? 'bg-blue-100' : ''
                                }`}
                        >
                            <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full mr-2" />
                            <span>{user.username}</span>
                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>

            <div className="mt-4">
                <button
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
