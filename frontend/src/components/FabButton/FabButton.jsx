import React from "react";
import style from "./FabButton.module.css";
const FabButton = ({ onClick, image }) => {
  return (
    <>
      <div>
        <div onClick={onClick} className={style.fab}>
          <div className={style.fabIcon}>
            <img className={style.img} src={image ? image : "/images/user-avatar.png"} alt="image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FabButton;
