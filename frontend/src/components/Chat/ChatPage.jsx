import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import useGetSuggestedUser from '@/hooks/useGetSuggestedUser';
import { setSelectedUser, setUserDetail } from '@/features/userSlice';
import { setMessages } from '@/features/chatSlice';
import { MessageCircleCode, MessageSquarePlus } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import AddUsers from './AddUsers'; // Import AddUsers component

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const [isAddUserVisible, setIsAddUserVisible] = useState(false); // State to toggle Add Users component
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user?.userDetail);
  const selectedUser = useSelector((state) => state?.user?.selectedUser);
  const onlineUsers = useSelector((state) => state?.chat?.onlineUsers);
  const messages = useSelector((state) => state?.chat?.messages);
  const suggestedUsers = useGetSuggestedUser();

  useEffect(() => {
    if (userDetails) {
      dispatch(setUserDetail(userDetails));
    }
  }, [dispatch, userDetails]);

  const sendMessageHandler = async () => {
    try {
      if (!selectedUser?._id) return;
      const response = await axios.post(
        `/api/message/send/${selectedUser._id}`,
        { textMessage },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setMessages([...messages, response.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleUserClick = (user) => {
    dispatch(setSelectedUser(user));
  };

  const toggleAddUser = () => {
    setIsAddUserVisible(!isAddUserVisible);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar Section for user list */}
      <section className="w-full md:w-1/4 p-4 bg-white shadow-md border-r border-gray-300">
        {/* Header for Chat Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl text-gray-800">
            {userDetails?.username}
          </h1>
          <MessageSquarePlus
            className="w-6 h-6 cursor-pointer text-gray-600 hover:text-black transition-all duration-200"
            title="New Chat"
            onClick={toggleAddUser} // Open AddUsers component
          />
        </div>

        <hr className="mb-4 border-gray-300" />

        {/* Suggested Users List */}
        <div className="overflow-y-auto h-[80vh]">
          {suggestedUsers && suggestedUsers.map((suggestion) => {
            const isOnline = onlineUsers.includes(suggestion._id);
            return (
              <div
                key={suggestion._id}
                onClick={() => handleUserClick(suggestion)}
                className="flex gap-3 items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200"
              >
                <Avatar className="w-14 h-14">
                  <AvatarImage
                    src={`http://localhost:3000/${suggestion?.profileImage}`}
                    alt={`${suggestion.username}'s profile`}
                  />
                  <AvatarFallback>{suggestion.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {suggestion.username}
                  </span>
                  <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chat Area */}
      <section className="flex-1 flex flex-col h-full bg-gray-50">
        {selectedUser ? (
          <>
            {/* Selected User Header */}
            <div className="flex gap-3 items-center px-4 py-3 border-b border-gray-200 sticky top-0 bg-white shadow-sm z-10">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={`http://localhost:3000/${selectedUser?.profileImage}`}
                  alt="profile"
                />
                <AvatarFallback>{selectedUser.username}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900">
                  {selectedUser?.username}
                </span>
              </div>
            </div>

            {/* Messages Section */}
            <Messages selectedUser={selectedUser} />

            {/* Message Input */}
            <div className="flex items-center px-4 py-3 bg-white border-t border-t-gray-200">
              <Input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                type="text"
                className="flex-1 mr-3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type a message..."
              />
              <Button
                onClick={sendMessageHandler}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
              >
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mx-auto">
            <MessageCircleCode className="w-32 h-32 my-4 text-gray-400" />
            <h1 className="text-lg font-semibold">Your Messages</h1>
            <span className="text-gray-500">Send a message to start a chat</span>
          </div>
        )}
      </section>

      {/* Add Users Component (Modal) */}
      {isAddUserVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <AddUsers onClose={toggleAddUser} /> {/* Pass the toggle function to close the component */}
        </div>
      )}
    </div>
  );
};

export default ChatPage;
