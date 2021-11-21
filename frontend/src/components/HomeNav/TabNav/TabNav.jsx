import React from "react";
import style from './TabNav.module.css';
import { useSelector, useDispatch } from "react-redux";
import { MdCameraAlt } from 'react-icons/md';
import { setActiveTab } from '../../../store/tabSlice';

    
const TabNav = () => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.tab);
  return (
      <div className="flex items-center bg-greenw-500 dark:bg-gray-800 w-full">
        <div className={style.tabItem}>
          <a onClick={ (e) => dispatch(setActiveTab(0))}>
            <MdCameraAlt />
          </a>
        </div>
        <a onClick={ (e) => dispatch(setActiveTab(1))} className={activeTab == 1 ? style.active : style.tabItem}>
          Chats
        </a>
        <a onClick={ (e) => dispatch(setActiveTab(2))} className={activeTab == 2 ? style.active : style.tabItem}>
          Status
        </a>
        <a onClick={ (e) => dispatch(setActiveTab(3))} className={activeTab == 3 ? style.active : style.tabItem}>
          Calls
        </a>
      </div>
  
  );
};

export default TabNav;
