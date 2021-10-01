import React, { useState }  from "react";
import styles from "./PhoneScreen.module.css";
// import Card from "../../components/shared/Card/Card";
import { useHistory } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import { HiMenu, HiSearch } from 'react-icons/hi';
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PhoneScreen = ({onNext}) => 
state = { phone: "" };
  function handleOnChange(value) {
  this.setState({ phone: value })
}
const history = useHistory();

  return (
    <>
     <div className="container w-100">
         <div className="mt-5 text-center aline-item-center">
         <h1 className="pt-3 text-primary text-bold fs-1 mb-5">
         Enter your phone number
         </h1>
         <ReactPhoneInput 
         defaultCountry={'us'} 
         value={this.state.phone}
         onChange={phone => this.setState({ phone })}
         inputExtraProps={{
    name: 'phone',
    required: true,
    autoFocus: true
  }}
         />
          </div>
         <div className="text-center">
         <Button onClick={onNext} text="Agree and Continue" />
         </div>
         
     </div>
    </>
  );
};

export default PhoneScreen;