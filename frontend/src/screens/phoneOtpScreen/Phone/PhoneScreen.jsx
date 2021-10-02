import React, { useState }  from "react";
import styles from "./PhoneScreen.module.css";
// import Card from "../../components/shared/Card/Card";
import { useHistory } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { HiMenu, HiSearch } from 'react-icons/hi';
import 'react-phone-input-2/lib/material.css'


const inputStyle = {
   width: "50px",
   color: "#000",
}
const PhoneScreen = ({onNext}) => {
const [phoneNumber, setPhoneNumber] = useState("");
const [cCode, setcCode] = useState("+91");

const history = useHistory();

  return (
    <>
     <div className="container w-100">
         <div className="mt-5 text-center aline-item-center">
         <h1 className="pt-3 text-primary text-bold fs-1 mb-5">
         Enter your phone number
         </h1>
          </div>
         <div className="text-center">
         <div className="text-center d-inline-flex">
         <Input
          placeholder="Code"
          type="tel"
          value={cCode}
          onChange={(e) => setcCode(e.target.value)}
          style={inputStyle}
         />
         <Input
          placeholder="phone number"
         />
         </div>
         <p>{phoneNumber}</p>
         <Button onClick={onNext} text="Agree and Continue" />
         </div>
         
     </div>
    </>
  );
};

export default PhoneScreen;