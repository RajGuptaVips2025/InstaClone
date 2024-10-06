import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import useGetAllMessage from '@/hooks/useGetAllMessage';
import useGetRTM from '@/hooks/useGetRTM';

const Messages = ({ selectedUser }) => {
  useGetRTM();
  useGetAllMessage();
  const messages = useSelector((state) => state?.chat?.messages);
  const userDetails = useSelector((state) => state?.user?.userDetail);
  console.log(messages)

  return (
    <div className="overflow-y-auto flex-1 p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={`http://localhost:3000/${selectedUser?.profileImage}`}
              alt="profile"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}</span>
          <Link to={`/profile/${selectedUser?._id}`}>
            <Button className="h-8 my-2" variant="secondary">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-4">
        {messages &&
          messages.map((message) => {
            const isSender = message.senderId === userDetails?._id;
            return (
              <div
                key={message._id}
                className={`flex ${isSender ? 'justify-end' : 'justify-start'
                  }`}
              >
                <div
                  className={`${isSender ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    } p-2 rounded-lg max-w-xs`}
                >
                  {/* Assuming `message.message` contains the actual text */}
                  <p>{message.message}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Messages;
