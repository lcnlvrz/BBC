import React, { useState } from 'react';
import WavingHand from '../../../images/wavingEmoji.png';
import BCClogo from '../../../images/bccLogo.png';
import { defaultTransiton, fillButton } from '../../../constants/styles';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Fade } from '@material-ui/core';


const WelcomeMessage = ( props ) => {

    const { padding, emojiWidth } = props;

    
    const [ref, inView] = useInView({
        triggerOnce: true,
        delay:200
    });

    return (
        <Fade
        in={ inView }
        >
            <div 
            ref={ ref }
            className={ `w-full right__part ${ padding } pt-20` }>
                <div 
                style={{ height:'70vh' }}
                className='flex items-center flex-col justify-center space-y-4 text-center welcome__message__container'>
                    <div className='flex flex-row items-center justify-center space-x-2 text-center'>
                        <img
                        className={ emojiWidth }
                        alt='' 
                        src={ WavingHand }
                        />
                    </div>
                    <h2 className='font-semibold text-2xl'> 
                        The people are excited to know if your business could help them
                    </h2>
                    <Link to='/sign-up'>
                        <button
                        style={ defaultTransiton }
                        className={ fillButton }>
                            Open Business for $0
                        </button>
                    </Link>
                </div>
            </div>
        </Fade>
    );
};

export default WelcomeMessage;
