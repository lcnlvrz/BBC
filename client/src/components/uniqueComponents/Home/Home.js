import React, { Fragment, useEffect } from 'react';
import Header from './Header';
import Body from './Body';
import Questions from './Questions';
import Advantages from './Advantages';
import Footer from './Footer';
import Prefooter from './Prefooter';
import ExplainBCC from './ExplainBCC';
import { Helmet } from 'react-helmet-async';

const Home = () => {

    useEffect(() => {

        window.scrollTo( 0, 0 );
       
    }, [])

    return (
        <Fragment>
            <Helmet>
                <title> Business Client Connection - Home  </title>
            </Helmet>
            <Header/>
            <div className='pt-20'>
                <Body/>
                <ExplainBCC/>
                <Questions/>
                <Advantages/>
                <Prefooter/>
                <Footer/>
            </div>
        </Fragment>
    );
};

export default Home;
