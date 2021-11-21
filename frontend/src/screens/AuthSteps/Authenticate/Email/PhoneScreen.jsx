import React, { useState }  from "react";
import styles from "./PhoneScreen.module.css";
import 'react-phone-input-2/lib/material.css'
import { sendOtp } from "../../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

const PhoneScreen = ({onNext}) => {
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
// const [cCode, setcCode] = useState("+91");
const dispatch = useDispatch();

async function submit() {
  setLoading(true);
  if (!email) {
    setLoading(false);
    return
  };
  const { data } = await sendOtp({ email: email });
  dispatch(setOtp({ email: data.email, hash: data.hash }));
  console.log(data);
  setLoading(false);
  onNext();
}

  return (
    <>
      <div className="container dark:bg-gray-800 h-screen p-2 block items-center mx-auto">
    <div className="pt-5 text-center">
      <div className="text-green-600 font-bold text-4xl mt-5">
        Login
      </div>
      <div className="text-gray-500 dark:text-green-100 text-2xl my-3">Enter your email address</div>
      <div className="text-gray-400 dark:text-gray-500 text-sm mt-3">
        By entering your Email address w'll text you <br /> a one time password
      </div>
    </div>
    <div className="flex justify-center items-center transition-all">
      <div className="text-center w-60 rounded-md mt-5 text-gray-400 focus-within:text-black inline-flex justify-center border border-transparent focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 transition-all focus-within:border-transparent">
        <div className="py-2 pl-2 px-1 rounded-l-md bg-gray-200 dark:bg-white w-1/5 transition-all"><i className="fa-solid fa-envelope transition-all"></i></div>
        <input className="py-2 pl-2 px-1 w-4/5 rounded-r-md bg-gray-200 dark:bg-white focus:outline-none transition-all" placeholder="jone@example.com" onChange={(e) => setEmail(e.target.value)} type="email" />
      </div>
    </div>
    <div className="text-center flex justify-center w-full mt-5">
    { loading ? 
         <svg
                    className={styles.spinner}
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
                </svg> :
      <button className="py-2 px-6 rounded-md text-center font-bold text-white bg-green-600 hover:bg-green-800 hover:text-gray-100" onClick={submit} >Next</button>
    }
    </div>
  </div>
    </>
  );
};

export default PhoneScreen;