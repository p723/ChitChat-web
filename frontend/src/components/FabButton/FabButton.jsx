import React from "react";
import style from "./FabButton.module.css";
const FabButton = ({ onClick, image }) => {
  return (
    <>
      <div className={style.posi}>
        <div onClick={onClick} className={style.fab}>
          <div className={style.fabIcon}>
          <i className="fas fa-user-circle text-2xl text-white"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default FabButton;
