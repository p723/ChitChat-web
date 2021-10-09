import React from 'react'
// import style from './Home.module.css';
import HeaderTop from '../../components/HomeNav/HeaderTop/HeaderTop';
import TabNav from '../../components/HomeNav/TabNav/TabNav';
import HomeTabs from '../../components/HomeTabs/HomeTabs';

const Home = () => {
    return (
        <div>
            <HeaderTop />    
            <TabNav />
            <HomeTabs />
        </div>
    )
}

export default Home;