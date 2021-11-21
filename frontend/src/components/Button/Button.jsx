import React from "react";
import styles from "./Button.module.css";
// import Button from "../../components/shared/Button/Button";
const Button = ({ text, onClick }) => {
  
  return (
    <>
     <div className="container w-100">
         <button onClick={onClick} className={styles.btn}>{text}</button>
     </div>
    </>
  );
};

export default Button;