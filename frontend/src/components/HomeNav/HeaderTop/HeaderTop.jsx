import React from 'react'
import { HiMenu, HiSearch } from 'react-icons/hi';
import {BiSearchAlt2, BiDotsVerticalRounded } from 'react-icons/bi';
const HeaderTop = () => {
    return (
        <div>
            <div className="nav d-flex justify-content-between py-3 px-3 bg-primary align-items-center">
                <div className="align-items-center">
                <h2 className="m-0 text-white">ChitChat</h2>
                </div>
                <div className="menu">
                <BiSearchAlt2 />
                <BiDotsVerticalRounded />
                </div>
                </div>
        </div>
    )
}

export default HeaderTop;