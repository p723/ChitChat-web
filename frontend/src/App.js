import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import { IconContext } from "react-icons";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Wellcome from './screens/Wellcome/Wellcome';
import Home from './screens/Home/Home';
import Chats from './screens/Chats/Chats';
import Chat from './screens/Chat/Chat';
import Authenticate from './screens/AuthSteps/Authenticate/Authenticate';
import ProfileSetup from './screens/AuthSteps/Activate/ProfileSetup/ProfileSetup';
import SettingsMenu from './screens/SettingScreens/SettingsMenu/SettingsMenu';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/Loader/Loader';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocketId } from "./store/authSlice";

function App() {
  //initialisation variables
  const socket = useRef();
  const dispatch = useDispatch();
  //use State variables
  const [onlineUsers, setOnlineUsers] = useState([]);
  //switched by react-redux
  const { user } = useSelector((state) => state.auth)
  
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL);
    }, []);
    
  useEffect(() => {
    if(user !== null && user.id){
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
      console.log(users)
    });
    socket.current.on("getSocketId", (data) =>{
      const socketId = data;
      dispatch(setSocketId({socketId}));
      console.log(process.env.REACT_APP_SOCKET_URL)
    } );
    }
  }, [user]);
  
  const { loading } = useLoadingWithRefresh();

  return loading ? (
        <Loader message="Loading, please wait.." />
    ) : (<BrowserRouter>
          <IconContext.Provider value={{ color: "#fff", className: "icon" }}>

            <Switch>
              <GuestRoute path="/" exact><Wellcome /></GuestRoute>
              <GuestRoute path="/authenticate"><Authenticate /></GuestRoute>
              {/* <Route path="/register"><Register /></Route> */}

              <SemiProtectedRoute path="/activate"><ProfileSetup /></SemiProtectedRoute>
              <ProtectedRoute path="/Home"><Home socket={socket} onlineUsers={onlineUsers} /></ProtectedRoute>
              <ProtectedRoute path="/Chats/Users"><Chats /></ProtectedRoute>
              <ProtectedRoute path="/Chat/:chatId"><Chat /></ProtectedRoute>
              <ProtectedRoute path="/Settings"><SettingsMenu /></ProtectedRoute>


            </Switch>
            </IconContext.Provider>
         </BrowserRouter>)
}

const GuestRoute = ({ children, ...rest }) =>{
    const { isAuth } = useSelector((state) => state.auth);
  return(
      <Route {...rest}
      render={({ location }) => {
      return isAuth ? (          
          <Redirect 
          to={{
            pathname: '/Home',
            state: { from: location },
             }}
             />
        ) : (
          children
        )
      }}
      ></Route>
    );
  }


  const SemiProtectedRoute = ({ children, ...rest }) =>{
         const { isAuth, user } = useSelector((state) => state.auth);
      return(
      <Route {...rest}
      render={({ location }) => {
      return !isAuth ? (          
          <Redirect 
          to={{
            pathname: '/',
            state: { from: location },
             }}
             />
        ) : isAuth && !user.activated ? (children) : (          
          <Redirect 
          to={{
            pathname: '/Home',
            state: { from: location },
             }}
             />
        )
      }}
      ></Route>
    );}
  const ProtectedRoute = ({ children, ...rest }) =>{
           const { isAuth, user } = useSelector((state) => state.auth);

        return(
      <Route {...rest}
      render={({ location }) => {
      return !isAuth ? (          
          <Redirect 
          to={{
            pathname: '/',
            state: { from: location },
             }}
             />
        ) : isAuth && !user.activated ?
        (          
          <Redirect 
          to={{
            pathname: '/activate',
            state: { from: location },
             }}
             />
        )
       : (children)
      }}
      ></Route>
    );}


export default App;

