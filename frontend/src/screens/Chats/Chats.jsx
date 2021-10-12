import React, { useState, useEffect }  from 'react'
import style from './Chats.module.css';
import { getAllUsers } from '../../http';
import {BiSearchAlt2, BiDotsVerticalRounded, BiLeftArrowAlt} from 'react-icons/bi';
import { useHistory } from "react-router-dom";

const Chats = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await getAllUsers();
            setUsers(data);
        };
        fetchUsers();
        console.log(users);
    }, []);
    return (
           <>
           <div>
            <div className="nav d-flex justify-content-between py-3 px-3 bg-primary align-items-center">
                <div className="align-items-center d-flex">
                <BiLeftArrowAlt onClick={(e) => history.push('/Home')} />
                <h4 className="m-0 ml-3 text-white">Select Contact</h4>
                </div>
                <div className="menu">
                <BiSearchAlt2 />
                <BiDotsVerticalRounded />
                </div>
                </div>
        </div>
        <div>
        <div className={style.list}>
          <div className={style.avatar}>
            <img className={style.avatarImg} src="http://localhost:5500/storage/1633883656846-182876416.png" alt="avatar" />
          </div>
          <div className={style.ListItemContent1}>
            <div className={style.ContentTopRow}>
              <h4>Create New Group</h4>
            </div>
          </div>
        </div>
        <div className={style.list}>
          <div className={style.avatar}>
            <img className={style.avatarImg} src="http://localhost:5500/storage/1633883656846-182876416.png" alt="avatar" />
          </div>
          <div className={style.ListItemContent1}>
            <div className={style.ContentTopRow}>
              <h4>New Contact</h4>
            </div>
          </div>
        </div>
           {users.map((user) => (
           <>
            <div className={style.list}>
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