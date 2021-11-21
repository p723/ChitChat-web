import React, { useState } from "react";
import { verifyOtp } from "../../../../http";
import { useSelector } from "react-redux";
import { setAuth } from "../../../../store/authSlice";
import { useDispatch } from "react-redux";

// Number of input fields that make up SSN
const handleChange = e => {
  const { maxLength, value, name } = e.target;
  const [fieldName, fieldIndex] = name.split("-");
  // Check if they hit the max character length
  if (value.length >= maxLength) {
    // Check if it's not the last input field
    if (parseInt(fieldIndex, 10) < 6) {
      // Get the next input field
      const nextSibling = document.querySelector(
        `input[name=input-${parseInt(fieldIndex, 10) + 1}]`
      );
      // If found, focus the next field
      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
  }
  if (value.length === 0) {
    // Check if it's not the last input field
   // if (parseInt(fieldIndex, 10) === 1) {
      // Get the next input field
      const previousSibling = document.querySelector(
        `input[name=input-${parseInt(fieldIndex, 10) - 1}]`
      );
      // If found, focus the next field
      if (previousSibling !== null) {
        previousSibling.focus();
      }
   // }
  }
}

const OtpScreen = ({ onNext }) => {
  const [otp, setotp] = useState("");
  const [o1, seto1] = useState("");
  const [o2, seto2] = useState("");
  const [o3, seto3] = useState("");
  const [o4, seto4] = useState("");
  const [o5, seto5] = useState("");
  const [o6, seto6] = useState("");

  function Funotp() {
    setotp(o1 + o2 + o3 + o4 + o5 + o6);
  }
  
  const dispatch = useDispatch();
const { email, hash } = useSelector((state) => state.auth.otp);

async function submit() {
  Funotp();
  if (!otp) return;
  try {
    const { data } = await verifyOtp({ otp, email, hash });
    dispatch(setAuth(data));
  } catch (err) {
    console.log(err);
  }
}

  return (
    <>
      <div className="container bg-white dark:bg-gray-800 h-screen w-100">
            <div class="pt-5 text-center">
      <div class="text-green-600 font-bold text-4xl mt-5">
        Verify
      </div>
      <div class="dark:text-green-100 text-gray-700 text-2xl my-3">🔒 Enter your OTP</div>
      <div class="text-gray-500 text-sm mt-3">
        Enter OTP that we sent on your Email
      </div>
    </div>
          <div className="flex justify-center items-center">
          <form>
          <div className="text-center w-60 rounded-md mt-5 inline-flex justify-center border border-transparent">
            <input
              type="number"
              className="py-2 px-1 bg-gray-200 dark:bg-white mx-1 w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              value={o1}
              onChange={(e) => seto1(e.target.value) + setotp(e.target.value) + handleChange(e) }
              placeholder="-"
              name="input-1"
              maxLength={1}
            />
            <input
              type="number"
              className="py-2 px-1 bg-gray-200 dark:bg-white mx-1 w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              value={o2}
              onChange={(e) =>
                seto2(e.target.value) + setotp(o1 + e.target.value) + handleChange(e)
              }
              placeholder="-"
              name="input-2"
              maxLength={1}
            />
            <input
              type="number"
              className="py-2 px-1 mx-1 bg-gray-200 dark:bg-white w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              value={o3}
              onChange={(e) =>
                seto3(e.target.value) + setotp(o1 + o2 + e.target.value) + handleChange(e)
              }
              placeholder="-"
              name="input-3"
              maxLength={1}
            />
            <input
              type="number"
              className="py-2 px-1 mx-1 bg-gray-200 dark:bg-white w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              value={o4}
              onChange={(e) =>
                seto4(e.target.value) +
                setotp(o1 + o2 + o3 + e.target.value) + handleChange(e)
              }
              placeholder="-"
              name="input-4"
              maxLength={1}
            />
            <input
              type="number"
              className="py-2 px-1 mx-1 bg-gray-200 dark:bg-white w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              value={o5}
              onChange={(e) =>
                seto5(e.target.value) +
                setotp(o1 + o2 + o3 + o4 + e.target.value) + handleChange(e)
              }
              placeholder="-"
              name="input-5"
              maxLength={1}
            />
            <input
              type="number"
              className="py-2 px-1 mx-1 bg-gray-200 dark:bg-white w-8 text-center rounded-md focus:outline-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              value={o6}
              onChange={(e) =>
                seto6(e.target.value) +
                setotp(o1 + o2 + o3 + o4 + o5 + e.target.value) + handleChange(e)
              }
              placeholder="-"
              name="input-6"
              maxLength={1}
            />
          </div>
            </form>
          </div>
          <p>{otp}</p>
          
          <div className="text-center fixed buttom-8 w-full mt-5">
          <button className="py-2 px-6 rounded-md text-center font-bold text-white bg-green-600 hover:bg-green-800 hover:text-gray-100" onClick={submit}  >Verify</button>
          </div>
      </div>
    </>
  );
};

export default OtpScreen;
