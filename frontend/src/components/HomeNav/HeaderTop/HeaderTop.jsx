import React from 'react'
import { useHistory } from "react-router-dom";

const HeaderTop = () => {
  const history = useHistory();
    return (
        <div>
            <div className="flex justify-between py-3 px-3 bg-greenw-500 dark:bg-gray-800 items-center">
                <div className="items-center">
                <h2 className="m-0 text-white dark:text-greenw text-2xl text-bold">ChitChat</h2>
                </div>
                <div className="flex">
                <i className="fas fa-search text-white text-xl mx-3 my-2"></i>
                    <div className="relative z-0 inline-block text-left dropdown">
      <span className="rounded-md shadow-sm">
        <a href="javascript:void(0)">
          <i className="fas fa-ellipsis-v text-white text-xl mx-3 my-2"></i>
        </a>
      </span>
       <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
        <div className="absolute z-50 right-1 -top-10 w-40 mt-2 origin-top-right bg-white dark:bg-gray-900 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
          <div className="transition-all">
            <p tabindex="0" onClick={(e) => history.push('/New-group')} className="text-gray-600 dark:text-white flex justify-between w-full px-4 py-3 text-sm leading-5 text-left hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-all">New Group</p>
            <p tabindex="1" onClick={(e) => history.push('/New-Broadcast')} className="text-gray-600 dark:text-white flex justify-between w-full px-4 py-3 text-sm leading-5 text-left hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-all">New Broadcast</p>
            <p tabindex="2" onClick={(e) => history.push('/Settings')} className="text-gray-600 dark:text-white flex justify-between w-full px-4 py-3 text-sm leading-5 text-left hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-all">Settings</p>
          </div>
        </div>
      </div>  
    </div>

                </div>
                </div>
        </div>
    )
}

export default HeaderTop;