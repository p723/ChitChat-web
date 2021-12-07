import React, { useState } from 'react'
import Button from '../../../../components/Button/Button';
import Styles from './ProfileScreen.module.css';
import { useSelector, useDispatch } from "react-redux";
import { setName, setStorePhone, setAvatar } from "../../../../store/activateSlice";
import { activate } from '../../../../http';
import { setAuth } from '../../../../store/authSlice';

const ProfileSetup = () => {
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('/images/user-avatar.png');
  const { avatar } = useSelector((state) => state.activate);
    
    function captureImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
             setImage(reader.result);
             dispatch(setAvatar(reader.result));
        };
    }


   async function submitData(){
      setLoading(true);
      if (!fullname && !phone) {
        setLoading(false);
        alert("all fields are required");
      return;
    }
    try {
      dispatch(setStorePhone(phone));
      dispatch(setName(fullname));
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert(err);
    }
    try {
            const { data } = await activate({ fullname, avatar, phone });
            
            if (data.auth) {
                setLoading(false);
                dispatch(setAuth(data));
            }
            console.log(data);
        } catch (err) {
            console.log(err);setLoading(false);
        }
      //  alert("Plaese configur that..!");
    }

    return (
      <>
         <div className="w-full container h-screen bg-gray-700">
    <div className="pt-5 text-center">
      <div className="text-blue-600 font-bold text-4xl mt-5">
        Profile
      </div>
      <div className="text-blue-100 text-2xl my-3">Enter your name & phone</div>
      <div className="text-gray-500 text-sm mt-3">
        your information is fully safe here 😉
      </div>
    </div>
    <div className="flex justify-center items-center w-full">
      <div className="text-center text-white pt-10">
        <label htmlFor="profile">
          <img className="w-24 h-24 rounded-full border-2 p-1 border-blue-600" src={image} alt="profile"/>
        </label>
        <input type="file" onChange={captureImage} id="profile" hidden />
      </div>
    </div>
    <div className="flex justify-center items-center w-full">
      <div className="text-center w-60 rounded-md mt-5 text-gray-400 focus-within:text-black inline-flex justify-center border border-transparent focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent">
        <div className="py-2 pl-2 px-1 rounded-l-md bg-white w-1/5"><i className="fa-solid fa-user"></i></div>
        <input className="py-2 pl-2 px-1 w-4/5 rounded-r-md focus:outline-none" placeholder="Elon Musk" type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
      </div>
    </div>
    <div className="flex justify-center items-center w-full">
      <div className="text-center w-60 rounded-md mt-5 text-gray-400 focus-within:text-black inline-flex justify-center border border-transparent focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent">
        <div className="py-2 pl-2 px-1 rounded-l-md bg-white w-1/5"><i className="fa-solid fa-phone"></i></div>
        <input className="py-2 pl-2 px-1 w-4/5 rounded-r-md focus:outline-none" placeholder="+91-9876543210" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
    </div>
   { loading ?(
   <div className="flex mt-5 justify-center items-center w-full">
      <img src="images/tail-spin.svg" />
    </div>
   ) : (
    <div className="text-center w-full mt-5">
      <button className="py-2 px-6 rounded-md text-center font-bold text-white bg-blue-600 hover:bg-blue-800 hover:text-gray-100" onClick={submitData}>Next</button>
    </div>)
     
   }
    </div>
    </>
    )
}

export default ProfileSetup;
