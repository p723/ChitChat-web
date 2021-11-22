import React, { useState, useEffect }  from 'react'
import style from './Chats.module.css';
import { getAllUsers, createChatlist } from '../../http';
import {BiSearchAlt2, BiDotsVerticalRounded, BiLeftArrowAlt} from 'react-icons/bi';
import {AiOutlineUserAdd, AiOutlineUsergroupAdd} from 'react-icons/ai';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

const Chats = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const iconStyle = { 
    color: "#fff",
    fontSize: "35px",
    padding: "0",
    margin: "0",
    overflow: "hidden"
    };
    const { user } = useSelector((state) => state.auth);
   
  async function createList(uid1){
    const user1 = user.id;
    const user2 = uid1;
    const chatType = "chat";
    const { data } = await createChatlist({ user1, user2, chatType });
    if(data){
      history.push(`/chat/${data.chatId}`)
    }
  }
    
    useEffect(() => {
        const fetchUsers = async () => {
            const email = user.email;
            const { data } = await getAllUsers({email});
            setUsers(data);
        };
        fetchUsers();
        console.log(users);
    }, []);
    return (
           <>
           <div>
            <div className="nav flex justify-between py-1 px-3 bg-primary dark:bg-gray-800 items-center">
              <div className="items-center flex">
                <i className="fas fa-arrow-left fs-6 fw-bold mx-1 text-xl" onClick={(e) => history.push('/Home')}></i>
                <h4 className="m-0 ml-3 text-white">Select Contact</h4>
                </div>
                <div className="menu flex">
                <i className="fas fa-search text-white text-xl mx-3 my-2"></i>
                <i className="fas fa-ellipsis-v text-white text-xl mx-3 my-2"></i>
                </div>
                </div>
        </div>
        <div className="bg-white dark:bg-gray-600">
        <div className={style.list}>
          <div className={style.avatar}>
            <div className={style.iconCover}>
              <AiOutlineUsergroupAdd style={iconStyle} />
            </div>
          </div>
          <div className={style.ListItemContent1}>
            <div className={style.ContentTopRow}>
              <h4>Create New Group</h4>
            </div>
          </div>
        </div>
        <div className={style.list}>
          <div className={style.avatar}>
            <div className={style.iconCover}>
              <AiOutlineUserAdd style={iconStyle} />
            </div>
          </div>
          <div className={style.ListItemContent1}>
            <div className={style.ContentTopRow}>
              <h4>New Contact</h4>
            </div>
          </div>
        </div>
           {users.map((user) => (
           <>
        <div className="list px-4 py-3 flex justify-between" onClick={(e) => createList(user.id)}>
      <div className="flex">
        <div className="relative">
          <img className="w-12 h-12 overflow-hidden object-cover rounded-full" src={user.avatar ? user.avatar : "/images/user-avatar.png"} alt="avtar"/>
        </div>
        <div className="ml-4">
          <h4 className="text-black dark:text-white">{user.name ? user.name : user.phone}</h4>
          <p className="text-green-500">{user.email}</p>
        </div>
      </div>
      <div className="">
        <p className="text-xs mb-2 text-black dark:text-white">😋</p>
      </div>
    </div>
           </>
          ))}
        </div>
        
           </>
    )
}

export default Chats;