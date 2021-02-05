import React, { useState } from 'react';
import HeaderForBusiness from '../../HeaderForBusiness';
import WavingHand from '../../../../images/wavingEmoji.png';
import BCClogo from '../../../../images/bccLogo.png';
import { defaultTransiton, fillButton } from '../../../../constants/styles';
import { Avatar } from '@material-ui/core';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import WelcomeMessage from '../../../reusableComponents/WelcomeMessage';
import LeftMenu from '../../../reusableComponents/LeftMenu';

const WelcomeDesktop = () => {

    const HtmlData = () => {

        return ( <WelcomeMessage emojiWidth='w-16' welcomeWidth='text-6xl'/> )

    };

    return (
        <>
            <HeaderForBusiness HtmlData={ HtmlData }/>
        </>
    );
};

export default WelcomeDesktop;
