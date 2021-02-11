import React from 'react'
import { useSelector } from 'react-redux';
import { defaultTransiton } from '../../../../constants/styles';
import { useMediaQuery } from 'react-responsive';
import { StyledBadgeBusinessProfile, useStylesBusinessProfile } from '../styles';
import { Avatar } from '@material-ui/core';
import BannerDefault from '../../../../images/bannerDefault.png';

const Banner = ( props ) => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const { input, setIsChangePhoto, setIsNewChange } = props;

    const user = useSelector(state => state.user);

    const StyledBadge = StyledBadgeBusinessProfile( input.isOpenBusiness );

    const classes = useStylesBusinessProfile();

    return (
        <div className={ `my__business__container border-solid border-b-8 ${ input.isOpenBusiness ? 'text-green-400 border-green-400' : 'text-gray-500 border-gray-500' }` }>
            <div className='h-44 w-full flex items-center justify-center'>
                <div className={ `h-44 w-max-full absolute z-20 ${ mobileResolution ? 'top-48' : 'top-44' } flex items-center justify-end flex-col space-y-5` }>
                    <StyledBadge
                    style={ defaultTransiton }
                    overlap="circle"
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    variant="dot"
                    >
                        <Avatar
                        onClick={ () => {

                        setIsChangePhoto( { endPoint:'/profile-photo', endPointDelete:'/delete-profilePhoto' } );

                        } }
                        className={ `${ classes.large } shadow-lg cursor-pointer bg-white` }
                        src={ user.profilePhoto ? user.profilePhoto : BannerDefault }
                        />
                    </StyledBadge>
                    <input
                    required
                    maxLength={ 100 }
                    name='businessName'
                    placeholder="Business's name"
                    onChange={ () => setIsNewChange( true ) }
                    className='text-3xl w-full outline-none text-center'
                    defaultValue={ input.businessName }
                    />
                </div>
                <img
                onClick={ () => setIsChangePhoto( { endPoint:'/banner', endPointDelete:'/delete-banner' } ) }
                style={ user.banner ? { filter:'brightness(0.5)' } : { margin:0 } }
                className='h-44 w-full object-cover object-center cursor-pointer'
                src={ user.banner ? user.banner : BannerDefault }
                alt=''/>
            </div>
        </div>
    );
};

export default Banner;
