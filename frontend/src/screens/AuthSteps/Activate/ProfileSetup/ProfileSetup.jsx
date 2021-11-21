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
        <div className="text-center">
            <div className="titel mt-5">
                <h1 className="text-primary">Profile</h1>
                <p className="text-black-50">Setup your Profile</p>
            </div>
            <div className={Styles.imgCenter}>

            <div className={Styles.imageWrrapper}>
                <img 
                    src={image} 
                    width="95%" 
                    height="95%"
                    alt="profile"
                    className={Styles.pImg} 
                    />
            </div>
                    </div>
            <div>
                    <input
                        onChange={captureImage}
                        id="avatarInput"
                        type="file"
                        className="d-none"
                    />
                    <label className={Styles.avatarLabel} htmlFor="avatarInput">
                        choose profile picture (optional)
                    </label>
                </div>
            <div className="mt-4">
                <input 
                className={Styles.inp}
                placeholder="Your name"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                />
                <input
                className={Styles.inp}
                value={phone}
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="phone number"  
                />
                <p>{fullname}</p>
                <p>{phone}</p>
            </div>
            <div className="btn-wrap mt-5">
                     { loading ? 
         <svg
                    className={Styles.spinner}
                    width="42"
                    height="42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="21"
                        cy="21"
                        r="18"
                        stroke="#C4C5C5"
                        strokeWidth="4"
                    />
                    <path
                        d="M20.778 1.001A20 20 0 111.542 25.627l3.876-.922a16.016 16.016 0 1015.404-19.72l-.044-3.984z"
                        fill="#009977"
                    />
                </svg> :
                <Button
                text="Next ->"
                onClick={submitData}
                />}
            </div>
        </div>
    )
}

export default ProfileSetup
