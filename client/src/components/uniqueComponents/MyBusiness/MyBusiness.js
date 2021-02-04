import { Avatar } from '@material-ui/core';
import React, { useRef } from 'react';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import { defaultTransiton, fillButton, outlineButton } from '../../../constants/styles';
import './MyBusiness.css';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import Badge from '@material-ui/core/Badge';
import Location from '../../../images/location.jpg';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
import SearcherInput from '../../reusableComponents/SearcherInput/SearcherInput';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import HeaderForClient from '../HeaderForClient';
import Banner from './Banner';
import Questions from './Advantages/Questions';
import RealTimeSection from './RealTimeSection/RealTimeSection';
import SeparatorBanner from '../../reusableComponents/SeparatorBanner';
import Products from './Products/Products';
import Footer from './Footer';

const MyBusiness = () => {

    const questionsAndAnswers = [{ title:'What is Nike?', text:'Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area.' },{ title:'Why Nike?', text:'Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area.' }];


      
    return (
        <>
            <HeaderForClient/>
            <Banner
            schedule='07:00-18:00'
            nameBusiness='Nike'
            bannerPhoto='https://mundogremial.com/wp-content/uploads/2020/02/nike-local-scaled.jpg'
            profilePhoto='https://i.pinimg.com/originals/4d/96/2d/4d962dee72fa76f023d411e20d30690c.jpg'
            />
            <Questions
            questionsAndAnswers={ questionsAndAnswers }
            />
            <RealTimeSection/>
            <SeparatorBanner
            title='Products'
            bannerPhoto='https://i.pinimg.com/originals/a1/5c/bc/a15cbc46ef421272a227accd9dca6a20.jpg'
            />
            <div className='m-10'>
                <SearcherInput placeholder='Search any product'/>
                <Products/>
            </div>
            <Footer/>
        </>
    );
};

export default MyBusiness;
