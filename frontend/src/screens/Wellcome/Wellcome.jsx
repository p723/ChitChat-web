import React from "react";
import styles from "./Welcome.module.css";
// import Card from "../../components/shared/Card/Card";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
const Wellcome = () => {
  
const history = useHistory();

  function startLogin(){
    history.push('/authenticate');
  }

  return (
    <>
    <div className="dark p-0 m-0">
     <div className="container m-0 h-screen w-100 dark:bg-gray-700">
         <div className="text-center">
         <h1 className="pt-10 text-primary dark:text-green-500 text-2xl mb-5 font-bold">
         Wellcome to ChitChat
         </h1>
         <div className="flex justify-center pt-5">
         <img className="w-3/4 mt-5" src="images/wellcome-bg.png" alt="bg-img" />
         </div>
         </div>
         <div className="pt-4 text-center mt-20 mb-10">
         <p className="text-sm text-gray-500">Read our <span className="text-green-500">Privacy Policy.</span> Tap "Agree and continue"
to accept the<span className="text-green-500"> Terms of Service.</span></p>
         </div>
         <div className="text-center mt-4">
         <Button onClick={startLogin} text="Agree and Continue" />
         </div>
         <div className="text-center text-gray-500">
         <p className={styles.from_txt}>from</p>
         <p className={styles.name_txt}>PRANAV</p>
         </div>
         
     </div>
    </div>
    </>
  );
};

export default Wellcome;