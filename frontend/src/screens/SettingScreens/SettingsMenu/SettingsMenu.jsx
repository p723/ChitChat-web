import React from 'react'
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
const SettingsMenu = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
    console.log(user)
return (
  <>
      <div className="w-full h-screen bg-white dark:bg-gray-700">
    <div className="header flex bg-greenw-500 dark:bg-gray-800 text-white justify-between items-center py-2 px-5">
      <div className="left flex items-center px-1 py-2">
        <i className="fas fa-arrow-left fs-6 fw-bold mx-1 text-xl rounded-full py-1 px-1 dark:hover:bg-gray-500 transition-all" onClick={(e) => history.push('/Home')}></i>
        <h4 className="ml-2 text-xl font-bold">Settings</h4>
      </div>
    </div>
    <div className="py-4 px-4 flex justify-between items-center border-b border-gray-500">
      <div className="flex items-center">
        <img className="w-16 h-16 overflow-hidden object-cover rounded-full" src={user.avatar} alt={user.name+"'s profile photo"} />
        <div className="text-black dark:text-white ml-4">
          <h2 className="font-bold text-md">{user.name}</h2>
          <p className="text-sm text-gray-400">Available</p>
        </div>
      </div>
      <div>
        <i className="fas fa-qrcode text-xl text-white"></i>
      </div>
    </div>
    <div className="w-100">
      <div className="w-100 px-8 py-4 flex items-center hover:bg-gray-500 transition-all">
        <i className="fas fa-user-circle text-2xl text-white"></i>
        <div className="text-black dark:text-white ml-4">
          <h2 className="text-sm">Account</h2>
          <p className="text-xs text-gray-400">Privacy, Security, Change details</p>
        </div>
      </div>
    </div>
    <div className="w-100">
      <div className="w-100 px-8 py-4 flex items-center hover:bg-gray-500 transition-all">
        <i className="fas fa-comments text-2xl text-white"></i>
        <div className="text-black dark:text-white ml-4">
          <h2 className="text-sm">Chat</h2>
          <p className="text-xs text-gray-400">Privacy, Security, Change details</p>
        </div>
      </div>
    </div>
    <div className="w-100">
      <div className="w-100 px-8 py-4 flex items-center hover:bg-gray-500 transition-all">
        <i className="fas fa-question-circle text-2xl text-white"></i>
        <div className="text-black dark:text-white ml-4">
          <h2 className="text-sm">Help</h2>
          <p className="text-xs text-gray-400">Privacy, Security, Change details</p>
        </div>
      </div>
    </div>
    <div className="w-100">
      <div className="w-100 px-8 py-4 flex items-center hover:bg-gray-500 transition-all">
        <i className="fas fa-users text-2xl text-white"></i>
        <div className="text-black dark:text-white ml-4">
          <h2 className="text-sm">Invite a friend?</h2>
        </div>
      </div>
    </div>
    <div className="w-100">
      <div className="w-100 px-8 py-4 flex items-center hover:bg-gray-500 transition-all">
        <i className="fas fa-database text-2xl text-white"></i>
        <div className="text-black dark:text-white ml-4">
          <h2 className="text-sm">your data on ChitChat</h2>
        </div>
      </div>
    </div>
    <div className="fixed bottom-1 left-0 right-0 flex justify-center items-center">
      <div className="text-center">
        <p className="text-gray-400 text-xs">from</p>
        <h2 className="text-green-500 text-sm font-bold">Pranav Bhatkar</h2>
      </div>
    </div>
    </div>
    </>
        )
}

export default SettingsMenu;