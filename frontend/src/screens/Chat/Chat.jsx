import React, { useState, useRef, useEffect } from 'react'
import crypto from 'crypto'
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getChat, sendMsg, getAllMsgs } from '../../http';
import { useSocket } from '../../Contexts/SocketProvider';

const Chat = () => {
  const { chatId } = useParams();
  const history = useHistory();
  const socket = useSocket()
  const [datas, setData] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const [loading, setloading] = useState(true);
  const [msg, setMsg] = useState("");
  const [newMsg, setNewMsg] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const scrollRef = useRef();
  
  useEffect(() => {
    const fetchChat = async () => {
      const { data } = await getChat({ chatId });
      setData(data);
    };
    fetchChat();
    setloading(false)
    socket.on('getMessage', ({ chatIdSocket, text, sender, time }) =>{
        console.log("message received")
        console.log(newMsg)
       if(chatIdSocket === chatId){
         console.log("chat id match")
        setNewMsg({ sender, text, time });
       }
    })

  }, []);
  useEffect(() => {
      setMsgs((prev) => [...prev, newMsg]);
  }, [newMsg]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await getAllMsgs({ chatId });
      setMsgs(data);
    }
    fetchMessages();
  }, [datas]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  async function sendText() {
    const receiver = user.id === datas.user1._id ? datas.user2._id : datas.user1._id;
    var datet = new Date();
    const time = datet.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    console.log(time);
    const text = msg;
    setMsg("");
    const sender = user.id;
    const type = "text";
    socket.emit('sendMessage', { chatId, text, sender, receiver, time });
    try{
    const { data } = await sendMsg({ chatId, text, sender, receiver, type, time });
    setMsgs([...msgs, data]);
    }catch(err){
      console.log(err)
    }
  }
  if (loading) {
    return (
      <>
        <svg
                    className="animate-spin"
                    width="42"
                    height="42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="21"
                        cy="21"
                        r="58"
                        strokeWidth="4"
                    />
                    <path
                        d="M20.778 1.001A20 20 0 111.542 25.627l3.876-.922a16.016 16.016 0 1015.404-19.72l-.044-3.984z"
                        fill="#009977"
                    />
                </svg> <
      />
    )
  } else {
    if (!datas.user1) {
      return (
        <>
        <svg
                    className="animate-spin"
                    width="42"
                    height="42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="21"
                        cy="21"
                        r="58"
                        strokeWidth="4"
                    />
                    <path
                        d="M20.778 1.001A20 20 0 111.542 25.627l3.876-.922a16.016 16.016 0 1015.404-19.72l-.044-3.984z"
                        fill="#009977"
                    />
                </svg> <
        />
      )
    } else {
      return (
        <>
      <div className="relative h-screen">
  <div className="sticky top-0 left-0 right-0 flex bg-gray-800 text-white justify-between items-center py-2 px-4">
      <div className="left flex items-center">
          <i className="fas fa-arrow-left fs-6 fw-bold mx-1 text-xl" onClick={(e) => history.push('/Home')}></i>
            <div className="relative mx-1">
                <img className="w-10 h-10 overflow-hidden object-cover rounded-full" src={ user.id === datas.user1._id ? process.env.REACT_APP_API_URL+datas.user2.avatar : process.env.REACT_APP_API_URL+datas.user1.avatar} width="50px" alt=""/>
                <div className="absolute bottom-1 -mr-1 -mb-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                <div className="absolute bottom-1 -mr-1 -mb-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
           <div>
                <h4 className="mx-1 text-lg font-bold">{datas.user1 ? user.id === datas.user1._id ? datas.user2.name : datas.user1.name : ""}</h4>
                <p className="ml-1 text-xs text-green-500">Online</p>
           </div>
      </div>
        <div className="right items-center">
            <i className="fas fa-ellipsis-v"></i>
        </div>
  </div>
    <div className="h-full pb-16 w-full block bg-gray-700 pt-5 px-1 overflow-y-scroll">
    <div className="info flex justify-center p-2">
      <p className="bg-gray-600 max-w-max px-1 py-1 text-sm rounded text-gray-100">You started the chat</p>
    </div>
    <div className="info flex justify-center p-2">
      <p className="bg-gray-600 max-w-max px-1 py-1 text-sm rounded text-gray-100">Today</p>
    </div>
    {msgs.map((map) =>(
     <div ref={scrollRef} >
        <div className={user.id === map.sender ? "send flex justify-end p-2" : "send flex justify-start p-2"}>
          <div className={user.id === map.sender ? "bg-gray-900 w-max px-3 py-2 text-white text-sm rounded text-gray-200" : "bg-gray-800 w-max px-3 py-2 text-white text-sm rounded text-gray-200"}>
            <p className="text-sm">{map.text}</p>
          <div className={user.id === map.sender ? "w-full flex justify-end h-2 mb-1" : "w-full flex justify-start h-2 mb-1"}>
            <p className="text-xs text-gray-400">{map.time}</p>
            {user.id === map.sender ? <i className="fas fa-check text-sm text-gray-400 ml-1"></i> : null }
         </div>
      </div>
    </div>
  </div>
    ))}
  </div>
  <div className="fixed left-0 right-0 bottom-0 w-full flex justify-between items-center bg-gray-700 py-2 px-3">
    <div className="flex items-center h-12 w-10/12 rounded-full bg-gray-800 text-white px-2 overflow-hidden">
      <div className="flex justify-between items-center h-full px-2">
        <i className="far fa-smile-beam text-lg"></i>
      </div>
      <input className="h-full w-full outline-none border-none bg-gray-800 text-white" type="text" placeholder="Message..." onChange={(e) => setMsg(e.target.value)} value={msg}/>
    </div>
    <div className="flex justify-center h-12 items-center w-12 bg-gray-800 rounded-full text-lg text-white">
    <button onClick={sendText}>
      { msg ? <i className="fas fa-paper-plane" ></i> : <i className="fas fa-microphone"></i> }
    </button>
    </div>
  </div>
  </div> <
        />
      )
    }
  }
}

export default Chat;