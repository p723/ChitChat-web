import React, { useState, useEffect } from "react";
import { getChatlist } from '../../../http';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


const ChatTab = (onlineUsers) => {
  const history = useHistory();
  const [chatlists, setChatlist] = useState([]);
  const { user } = useSelector((state) => state.auth);
 
  useEffect(() => {
  console.log(onlineUsers);
   }, [onlineUsers]);
  useEffect(() => {
        const fetchChatlist = async () => {
            const uid = user.id;
            const { data } = await getChatlist({uid});
            setChatlist(data);
        };
        fetchChatlist();
        console.log(process.env.REACT_APP_SOCKET_URL)
    }, []);
    return (
      <>
        <div className="bg-white dark:bg-gray-600 m-0 p-0">
          {chatlists.map((chatlist) => (
               <div className="list px-4 py-3 flex justify-between" onClick={(e) => history.push(`/chat/${chatlist.chatId}`)}>
      <div className="flex">
        <div className="relative">
          <img className="w-12 h-12 overflow-hidden object-cover rounded-full" src={user.id === chatlist.user1._id ? 'http://localhost:5500'+chatlist.user2.avatar : 'http://localhost:5500'+chatlist.user1.avatar } alt="avtar"/>
          <div className="absolute bottom-1 -mr-1 -mb-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          <div className="absolute bottom-1 -mr-1 -mb-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="ml-4">
          <h4 className="text-black dark:text-white">{user.id === chatlist.user1._id ? chatlist.user2.name : chatlist.user1.name}</h4>
          <p className="text-green-500">online</p>
        </div>
      </div>
      <div className="">
        <p className="text-xs mb-2 text-black dark:text-white">07:49 AM</p>
        <div className="ml-5 w-5 h-5 rounded-full bg-green-500 flex justify-center items-center">
          <p className="text-xs text-white">1</p>
        </div>
      </div>
    </div>
          ))}
       </div>
      </>
    );
  }

export default ChatTab;
