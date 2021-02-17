import React from 'react';
import { useMediaQuery } from 'react-responsive';
import WelcomeDesktop from './WelcomeDesktop';
import WelcomeMobile from './WelcomeMobile';

const WelcomeBusiness = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });    

    if ( !mobileResolution ) return <WelcomeDesktop/>

    return <WelcomeMobile/>
};

export default WelcomeBusiness;
