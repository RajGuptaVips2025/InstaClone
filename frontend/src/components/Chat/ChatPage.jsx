import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setUserDetail } from '@/features/userSlice';
import { setMessages } from '@/features/chatSlice';
import { MessageCircleCode, MessageSquarePlus } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import AddUsers from './AddUsers';
import { IoIosInformationCircle } from "react-icons/io";
import ChatSidePanel from './ChatSidePanel';
import useGetChatMembers from '@/hooks/useGetChatMembers';

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState('');
  const [isAddUserVisible, setIsAddUserVisible] = useState(false);
  const [isChatSidePanelVisible, setIsChatSidePanelVisible] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user?.userDetail);
  const selectedUser = useSelector((state) => state?.user?.selectedUser);
  const messages = useSelector((state) => state?.chat?.messages);

  // Access the chat members from the Redux store
  const chatMembers = useSelector((state) => state.chat.chatMembers);
  console.log(chatMembers);

  useGetChatMembers();

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
        setTextMessage('');
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

  const toggleChatSidePanel = () => {
    setIsChatSidePanelVisible(!isChatSidePanelVisible); // Toggle the visibility of the side panel
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
            onClick={toggleAddUser}
          />
        </div>

        <hr className="mb-4 border-gray-300" />

        {/* Display Chat Members */}
        <div className="overflow-y-auto h-[80vh]">
          {Array.isArray(chatMembers) && chatMembers.length > 0 ? (
            chatMembers.map((member) => (
              <div
                key={member._id}
                onClick={() => handleUserClick(member)}
                className="flex gap-3 items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200"
              >
                <Avatar className="w-14 h-14">
                  <AvatarImage
                    src={`http://localhost:3000/${member.profileImage || ''}`}
                    alt={`${member.username || member.groupName}'s profile`}
                  />
                  <AvatarFallback>{member.username?.[0] || member.groupName?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {member.username || member.groupName}
                  </span>
                  <span className="text-sm text-gray-500">
                    {member.username ? 'User' : 'Group'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No chat members found</p>
          )}
        </div>

      </section>

      {/* Other sections remain unchanged */}
      <section className="flex-1 flex flex-col h-full bg-gray-50">
        {selectedUser ? (
          <>
            <div className="flex items-center px-4 py-3 border-b border-gray-200 sticky top-0 bg-white shadow-sm z-10">
              <div className="flex gap-3 items-center flex-grow">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={`http://localhost:3000/${selectedUser?.profileImage}`}
                    alt="profile"
                  />
                  <AvatarFallback>{selectedUser.username}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">
                    {selectedUser.type === 'user' ? selectedUser.username : selectedUser.groupName}
                  </span>
                </div>
              </div>
              <div className="ml-auto">
                {selectedUser.type === 'group' ? (
                  <IoIosInformationCircle size={24} className="text-gray-600 cursor-pointer" onClick={toggleChatSidePanel} />
                ) : null}
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
            <h1 className="text-lg font-semibold">Your Messages</h1>
            <span className="text-gray-500">Send a message to start a chat</span>
          </div>
        )}
      </section>

      {/* Chat Side Panel */}
      {isChatSidePanelVisible && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white border-l shadow-lg p-4 transform transition-transform duration-300 ease-in-out translate-x-0">
          <ChatSidePanel />
        </div>
      )}

      {/* Add Users Component (Modal) */}
      {isAddUserVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <AddUsers onClose={toggleAddUser} />
        </div>
      )}
    </div>
  );
};

export default ChatPage;




