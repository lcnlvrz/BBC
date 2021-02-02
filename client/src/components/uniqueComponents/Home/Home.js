import React, { Fragment } from 'react';
import Header from './Header';
import Body from './Body';
import Questions from './Questions';
import Advantages from './Advantages';
import Footer from './Footer';
import Prefooter from './Prefooter';

const Home = () => {

    return (
        <Fragment>
            <Header/>
            <Body/>
            <Questions/>
            <Advantages/>
            <Prefooter/>
            <Footer/>
        </Fragment>
    );
};

export default Home;
