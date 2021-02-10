import { Avatar } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
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
import HeaderForClient from '../HeaderForClient';
import Banner from './Banner';
import Questions from './Advantages/Questions';
import RealTimeSection from './RealTimeSection/RealTimeSection';
import SeparatorBanner from '../../reusableComponents/SeparatorBanner';
import Products from './Products/Products';
import Footer from './Footer';
import { useSelector } from 'react-redux';

const MyBusiness = () => {

    const questionsAndAnswers = [{ title:'What is Nike?', text:'Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area.' },{ title:'Why Nike?', text:'Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area.' }];

    const currentSearch = useSelector(state => state.currentSearch);

    const [business, setBusiness] = useState( { banner:'', profilePhoto:'', businessName:'' } );

    useEffect(() => {

        if ( !currentSearch.business ) //axios

        setBusiness( currentSearch );
        
    }, []);

      
    return (
        <>
            <HeaderForClient/>
            <Banner
            schedule='07:00-18:00'
            nameBusiness={ currentSearch.businessName }
            bannerPhoto={ currentSearch.banner }
            profilePhoto={ currentSearch.profilePhoto }
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
                <Products products={ currentSearch.products }/>
            </div>
            <Footer
            facebookLink={ currentSearch.facebookLink }
            instagramLink={ currentSearch.instagramLink }
            twitterLink={ currentSearch.twitterLink }
            footerSectionOne={ currentSearch.footerSectionOne }
            footerSectionTwo={ currentSearch.footerSectionTwo }
            footerTitle={ currentSearch.footerTitle }
            footerLastLine={ currentSearch.footerLastLine }
            />
        </>
    );
};

export default MyBusiness;
