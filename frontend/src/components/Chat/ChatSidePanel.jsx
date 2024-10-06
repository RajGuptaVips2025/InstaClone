import React from 'react';
import { Bell, MoreVertical } from 'lucide-react'; // Import icons

const ChatSidePanel = () => {
  const members = [
    { username: 'rushil_nanda_04', name: 'Rushil Nanda', role: 'Member', img: '/path-to-image1.jpg' },
    { username: 'kartikey_211', name: 'Kartikey Paliwal', role: 'Member', img: '/path-to-image2.jpg' },
    { username: 'rajgupta.2412', name: 'Raj Gupta', role: 'Admin', img: '/path-to-image3.jpg' },
    { username: 'harshkumarbarman97', name: 'Harsh Kumar', role: 'Member', img: '/path-to-image4.jpg' },
  ];

  return (
    <div className="w-80 bg-white border-l p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-lg font-semibold">Details</h2>
      </div>

      {/* Change group name */}
      <div className="py-4 border-b">
        <label className="text-sm">Change group name</label>
        <div className="flex items-center justify-between mt-2">
          <input
            type="text"
            placeholder="Group name"
            className="border rounded px-2 py-1 w-full text-sm"
          />
          <button className="ml-2 px-4 py-1 bg-blue-500 text-white text-sm rounded">Change</button>
        </div>
      </div>

      {/* Mute messages */}
      <div className="py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="mr-2" size={20} />
            <span className="text-sm">Mute messages</span>
          </div>
          <input type="checkbox" className="toggle-switch" />
        </div>
      </div>

      {/* Members Section */}
      <div className="py-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">Members</h3>
          <button className="text-sm text-blue-500">Add people</button>
        </div>
        <div className="mt-4 space-y-4">
          {members.map((member, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">{member.username}</p>
                  <p className="text-xs text-gray-500">
                    {member.role === 'Admin' ? `Admin · ${member.name}` : member.name}
                  </p>
                </div>
              </div>
              <MoreVertical size={20} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="py-4">
        <button className="text-sm text-red-500 w-full text-left">Leave Chat</button>
        <p className="text-xs text-gray-500 mt-2">
          You won't be able to send or receive messages unless someone adds you back to the chat. No one will be notified that you left.
        </p>
        <button className="text-sm text-red-500 w-full text-left mt-4">Delete Chat</button>
      </div>
    </div>
  );
};

export default ChatSidePanel;
