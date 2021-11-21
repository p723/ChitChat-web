import React, { useState, useEffect }  from 'react'
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
const SettingsMenu = () => {
  const { chatId } = useParams();
  const { user } = useSelector((state) => state.auth);
    console.log(user)
return (
  <>
     <div className="w-full h-screen bg-gray-700">
    <div className="flex justify-center items-center">
      <div className="mt-5 text-center">
        <i className="fas fa-lock text-4xl text-green-500 pt-5"></i>
        <h2 className="text-2xl mt-2 text-white">ChitChat is Locked</h2>
      </div>
    </div>
    <div className="flex justify-center items-center my-24">
      <form>
        <div className="text-center w-60 rounded-md mt-5 inline-flex justify-center border border-transparent">
          <input maxlength="1" type="tel" className="py-2 px-1 mx-1 w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="-" type="email" />
          <input maxlength="1" type="tel" className="py-2 px-1 mx-1 w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="-" type="email" />
          <input maxlength="1" type="tel" className="py-2 px-1 mx-1 w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="-" type="email" />
          <input maxlength="1" type="tel" className="py-2 px-1 mx-1 w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="-" type="email" />
        </div>
      </form>
    </div>
  </div>
    </>
        )
}

export default SettingsMenu;