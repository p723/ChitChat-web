import React, { useState, useEffect, useRef } from "react";
import styles from "./OtpScreen.module.css";
// import Card from "../../components/shared/Card/Card";
import { useHistory } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { verifyOtp } from "../../../http";
import { useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { useDispatch } from "react-redux";

// Number of input fields that make up SSN
const numOfFields = 6;

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
  if (value.length == 0) {
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

const inputStyle = {
  width: "30px",
  padding: "0",
  borderBottom: "2px solid #009977",
  color: "#000",
  fontSize: "17px",
  textAline: "center",
};
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


  const history = useHistory();

  return (
    <>
      <div className="container w-100">
        <div className="mt-5 text-center aline-item-center">
          <h1 className="pt-3 text-primary text-bold fs-1">Enter OTP</h1>
          <p className="text-center text-black-50 mb-5">
            Enter OTP that we text on your phone
          </p>
        </div>
        <div className="text-center">
          <div className="text-center d-inline-flex">
          <form>
            <input
              type="number"
              className={styles.inputStyle}
              value={o1}
              onChange={(e) => seto1(e.target.value) + setotp(e.target.value) + handleChange(e) }
              placeholder="-"
              name="input-1"
              maxLength={1}
            />
            <input
              type="number"
              className={styles.inputStyle}
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
              className={styles.inputStyle}
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
              className={styles.inputStyle}
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
              className={styles.inputStyle}
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
              className={styles.inputStyle}
              value={o6}
              onChange={(e) =>
                seto6(e.target.value) +
                setotp(o1 + o2 + o3 + o4 + o5 + e.target.value) + handleChange(e)
              }
              placeholder="-"
              name="input-6"
              maxLength={1}
            />
            </form>
          </div>
          <p>{otp}</p>
          <Button onClick={submit} text="next" />
        </div>
      </div>
    </>
  );
};

export default OtpScreen;
