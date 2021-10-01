import React from "react";
import styles from "./OtpScreen.module.css";
// import Card from "../../components/shared/Card/Card";
import { useHistory } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import { HiMenu, HiSearch } from 'react-icons/hi';
const OtpScreen = ({onNext}) => {
  
const history = useHistory();

  return (
    <>
     <div className="container w-100">
         <div className="mt-5 text-center">
         <h1 className="pt-3 text-primary text-bold fs-1 mb-5">
         Wellcome to ChitChat
         </h1>
         <img className={styles.bg_img} src="images/wellcome-bg.png" alt="bg-img" />
         </div>
         <div className="pt-4 text-center text-black-50 fw-normal">
         <p className={styles.text_disk}>Read our <span className="">Privacy Policy.</span> Tap "Agree and continue"
to accept the<span> Terms of Service.</span></p>
         </div>
         <div className="text-center">
         <Button onClick={onNext} text="Agree and Continue" />
         </div>
         <div className="text-center text-black-50">
         <p className={styles.from_txt}>from</p>
         <p className={styles.name_txt}>PRANAV</p>
         </div>
         
     </div>
    </>
  );
};

export default OtpScreen;