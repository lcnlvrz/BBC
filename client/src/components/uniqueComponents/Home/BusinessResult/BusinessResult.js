import React from 'react';
import { defaultTransiton } from '../../../../constants/styles';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { useMediaQuery } from 'react-responsive';
import { Avatar } from '@material-ui/core';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
import { Link } from 'react-router-dom';
import { setCurrentSearch } from '../../../../actions/currentSearch';
import { useDispatch } from 'react-redux';

const BusinessResult = ( props ) => {

    const { company } = props;

    const dispatch = useDispatch( );

    const mobileResolutionSearch = useMediaQuery({ query:'( max-width: 600px )' });
    
    const StyledBadge = withStyles((theme) => ({
        badge: {
          width:theme.spacing(2),
          height: theme.spacing(2),
          borderRadius:'100px',
          backgroundColor: company.isOpenBusiness ? '#44b700' : '#787878',
          color: company.isOpenBusiness ? '#44b700' : '#787878',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '100%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
    }))(Badge);

    const useStylesBusinessProfile = makeStyles((theme) => ({
        large: {
          width: theme.spacing(5),
          height: theme.spacing(5)
        },
    }));

    const classes = useStylesBusinessProfile();

    return (
        <Link 
        onClick={ () => dispatch( setCurrentSearch( { ...company, isLoading:false, business:true } ) ) }
        to={ `/search/business/?username=${ company.username }` }>
            <div 
            style={ defaultTransiton }
            className={ `flex flex-row items-center flex-wrap space-x-2 justify-evenly space-y-5 hover:bg-black hover:text-white cursor-pointer p-5 rounded banner__searching__business relative overflow-hidden` }>
                <div className='flex flex-row space-x-2'>
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
                        src={ company.profilePhoto }
                        className={ `${ classes.large } shadow-lg cursor-pointer bg-white` }
                        />
                    </StyledBadge>
                    <div className='flex-col flex'>
                        <h3 className='font-semibold max-w-md'> 
                            { company.businessName }
                        </h3>
                        <h4 className='font-light text-sm max-w-md'> 
                            { company.businessCategory }
                        </h4>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='flex flex-row items-center space-x-2 element'>
                        <h3 className='font-semibold truncate text-center'> 
                            <LocationOnRoundedIcon className='text-red-500 mr-2'/>
                           { company.location }
                        </h3>
                    </div>
                    <div className='flex flex-row items-center space-x-2'>
                        <WatchLaterRoundedIcon/>
                        <h3 className='font-semibold truncate'> 
                            { company.since } - { company.until }
                        </h3>
                    </div>
                </div>
                <div 
                style={{ backgroundImage:`url(${ company.banner })`, margin:0 }}
                className='background__banner__searching'></div>
            </div>
        </Link>
    );
};

export default BusinessResult;
