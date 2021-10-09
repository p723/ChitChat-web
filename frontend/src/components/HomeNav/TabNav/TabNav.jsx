import React from "react";
import style from './TabNav.module.css';
import { MdCameraAlt } from 'react-icons/md';

const TabNav = () => {
  return (
    <div>
      <div className={style.tabMenu}>
        <div className={style.tabItem}>
          <a href="#">
            <MdCameraAlt />
          </a>
        </div>
        <div className={style.tabItem}>
          Chats
        </div>
        <div className={style.tabItem}>
          Status
        </div>
        <div className={style.tabItem}>
          Calls
        </div>
      </div>
    </div>
  );
};

export default TabNav;
