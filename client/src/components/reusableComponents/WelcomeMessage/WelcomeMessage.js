import React, { useState } from 'react';
import WavingHand from '../../../images/wavingEmoji.png';
import BCClogo from '../../../images/bccLogo.png';
import { defaultTransiton, fillButton } from '../../../constants/styles';
import { Avatar } from '@material-ui/core';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom';


const WelcomeMessage = ( props ) => {

    const { padding, emojiWidth, welcomeWidth } = props;

    return (
        <div className={ `w-full right__part ${ padding }` }>
            <div 
            style={{ height:'70vh' }}
            className='flex items-center flex-col justify-center space-y-4 text-center welcome__message__container'>
                <div className='flex flex-row items-center justify-center space-x-2 text-center'>
                    <img
                    className={ emojiWidth }
                    alt='' 
                    src={ WavingHand }
                    />
                    <h1 className={ `font-light ${ welcomeWidth }` }> 
                        WELCOME! 
                    </h1>
                </div>
                <h2 className='font-semibold'> 
                    The clients are waiting for your business. 
                </h2>
                <Link to='/business/?section=panel'>
                    <button
                    style={ defaultTransiton }
                    className={ fillButton }>
                        Open Business
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default WelcomeMessage;
