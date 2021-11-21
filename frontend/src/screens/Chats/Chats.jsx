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
            <div className="nav flex justify-between py-4 px-3 bg-primary items-center">
              <div className="items-center flex">
                <BiLeftArrowAlt onClick={(e) => history.push('/Home')} />
                <h4 className="m-0 ml-3 text-white">Select Contact</h4>
                </div>
                <div className="menu flex">
                <BiSearchAlt2 />
                <BiDotsVerticalRounded />
                </div>
                </div>
        </div>
        <div>
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
            <div className={style.list} onClick={(e) => createList(user.id)} >
          <div className={style.avatar}>
            <img className={style.avatarImg} src={user.avatar ? user.avatar : "/images/user-avatar.png"} alt="avatar" />
          </div>
          <div className={style.ListItemContent}>
            <div className={style.ContentTopRow}>
              <h4>{user.name ? user.name : user.phone}</h4>
            </div>
            <div className={style.ContentBottomRow}>
              <span className={style.preview}>{user.email}</span>
            </div>
          </div>
        </div>
           </>
          ))}
        </div>
           </>
    )
}

export default Chats;