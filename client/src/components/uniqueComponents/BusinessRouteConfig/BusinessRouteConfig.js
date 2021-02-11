import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from '../HeaderForBusiness/HeaderMobile/HeaderMobile';
import HeaderForBusiness from '../HeaderForBusiness';
import Panel from '../Panel/Panel';
import RealTimeSection from '../MyBusiness/RealTimeSection/RealTimeSection';
import WelcomeMessage from '../../reusableComponents/WelcomeMessage';
import RealTimeData from '../RealTimeData/RealTimeData';
import BusinessProfile from '../BusinessProfile';
import Products from '../Products';
import AddProduct from '../AddProduct';
import LiveChat from '../LiveChat';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const BusinessRouteConfig = () => {

    const url = new URL( window.location.href );

    const currentSection = url.searchParams.get( 'section' );

    const [changeSection, setChangeSection] = useState( [] );

    const mobileResolution = useMediaQuery({ query:'( max-width: 800px )' });

    const HtmlData = () => {

        if ( currentSection === 'panel' ) return <Panel/> 

        if ( currentSection === 'real-time-data' ) return <RealTimeData/>

        if ( currentSection === 'welcome-message' ) return <WelcomeMessage/>

        if ( currentSection === 'business-profile' ) return <BusinessProfile/>

        if ( currentSection === 'products' ) return <Products/>

        if ( currentSection === 'add-product' ) return <AddProduct/>

        if ( currentSection === 'live-chat' ) return <LiveChat/>

        return <h1> Invalid page </h1>

    };



    if ( mobileResolution ) return ( 

        <>
            <HeaderMobile
            setChangeSection={ setChangeSection }
            /> 
            <HtmlData/>
        </>

    );

    return <HeaderForBusiness 
    setChangeSection={ setChangeSection } 
    HtmlData={ HtmlData }/>


};

export default BusinessRouteConfig
