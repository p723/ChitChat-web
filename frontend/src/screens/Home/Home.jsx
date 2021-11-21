import React from 'react'
// import style from './Home.module.css';
import HeaderTop from '../../components/HomeNav/HeaderTop/HeaderTop';
import TabNav from '../../components/HomeNav/TabNav/TabNav';
import HomeTabs from '../../components/HomeTabs/HomeTabs';
import FabButton from "../../components/FabButton/FabButton";
import { useHistory } from "react-router-dom";


const Home = (socket, onlineUsers) => {
  const history = useHistory();
  function ShowAllUsers() {
    history.push("/Chats/Users");
  }
    return (
        <div className="relative m-0 p-p">
            <HeaderTop />    
            <TabNav />
            <HomeTabs onlineUsers={onlineUsers} />
            <FabButton onClick={ShowAllUsers} />
            
        </div>
    )
}

export default Home;