import React, { useState } from 'react';
import HeaderForBusiness from '../HeaderForBusiness';
import WavingHand from '../../../images/wavingEmoji.png';
import BCClogo from '../../../images/bccLogo.png';
import { defaultTransiton, fillButton } from '../../../constants/styles';
import { Avatar } from '@material-ui/core';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { useMediaQuery } from 'react-responsive';
import WelcomeDesktop from './WelcomeDesktop';
import WelcomeMobile from './WelcomeMobile';



const WelcomeBusiness = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });    

    if ( !mobileResolution ) return <WelcomeDesktop/>

    return <WelcomeMobile/>
};

export default WelcomeBusiness;
