import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { defaultTransiton, fillButton } from '../../../../../constants/styles.js';
import AvatarStatus from '../../../../reusableComponents/AvatarStatus.js'
import { useInView } from 'react-intersection-observer';
import { Fade } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentSearch } from '../../../../../actions/currentSearch.js';
import { demoBusinessProfile } from '../../../../../constants/content.js';

const BusinessProfile = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 750px )' });

    const [ref, inView] = useInView({
        triggerOnce: true,
        delay:200
    });

    const dispatch = useDispatch();

    return (
        <Fade in={ inView }>
            <div 
            ref={ ref }
            className={ `flex w-full ${ mobileResolution ? 'flex-col space-y-40' : 'flex-row' } flex-wrap pt-10 items-center justify-evenly px-5` }>
                <div className={ `right__part ${ mobileResolution ? 'w-full' : 'w-2/4' } relative` }>
                    <div className={ `my__business__container border-solid border-b-8 border-green-400` }>
                        <div className='relative'>
                            <div className={ `h-44 top-32 absolute z-30 flex items-center justify-end flex-col space-y-5` }>
                                <AvatarStatus 
                                status={ true }
                                spacingBadge={ 5 }
                                isOnlyAvatar={ true }
                                spacingAvatar={ 15 }
                                vertical='bottom'
                                horizontal='right'
                                souceProfilePhoto='https://i.pinimg.com/originals/4d/96/2d/4d962dee72fa76f023d411e20d30690c.jpg'
                                />
                                <div className='text-center flex flex-col items-center justify-center'>
                                    <div className='element'>
                                        <h1 className='font-semibold text-3xl truncate'> 
                                            Nike | Oficial Business
                                        </h1>
                                    </div>
                                    <h3 className='text-light text-2xl whitespace-nowrap truncate w-72'> 
                                    Sports and StreetWear
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <img
                        style={{ filter:'brightness(0.5)' }}
                        className='h-44 w-full object-cover'
                        src='https://cms.qz.com/wp-content/uploads/2018/04/ap_17166735944972-1-e1523466887158.jpg?quality=75&strip=all&w=1600&h=900&crop=1'
                        alt=''/>
                    </div>
                </div>
                <div className={ `left__part text-center ${ mobileResolution ? 'w-full' : 'w-2/4' } flex flex-col items-center justify-center space-y-5` }>

                    <h1 className='font-semibold text-4xl text-green-400'> 
                    BUSINESS PROFILE
                    </h1>
                    <p className={ `${ !mobileResolution ? 'mx-10' : ''  } font-light text-2xl ` }>
                        Customize your business profile to tell to the people what does your business do, description, advantages, location, real time information and more stuff
                    </p>
                    <Link to='/search/business/?username=nikeoficial&scroll=top'>
                        <button
                        onClick={ () => dispatch( setCurrentSearch( demoBusinessProfile ) ) }
                        style={ defaultTransiton }
                        className={ fillButton }
                        >
                            SEE ONE BUSINESS PROFILE
                        </button>
                    </Link>
                </div>
            </div>
        </Fade>
    );
};

export default BusinessProfile;
