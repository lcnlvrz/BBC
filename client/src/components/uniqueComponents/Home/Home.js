import React, { Fragment, useEffect } from 'react';
import Header from './Header';
import SearcherAndVector from './SearcherAndVector';
import Questions from './Questions';
import Advantages from './Advantages';
import Footer from './Footer';
import Prefooter from './Prefooter';
import ExplainBCC from './ExplainBCC';
import WelcomeMessage from '../../reusableComponents/WelcomeMessage';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../actions/helmetTitle';

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        window.scrollTo( 0, 0 );

        dispatch( setTitle( 'Business Client Connection - Home' ) );
       
    }, [ dispatch ]);

    return (
        <Fragment>
            <Header/>
            <div className='pt-20'>
                <SearcherAndVector/>
                <ExplainBCC/>
                <WelcomeMessage emojiWidth='w-1/4'/>
                <Questions/>
                <Advantages/>
                <Prefooter/>
                <Footer/>
            </div>
        </Fragment>
    );
};

export default Home;
