import React from 'react'
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import '../MyBusiness.css';
import Badge from '@material-ui/core/Badge';
import { Avatar } from '@material-ui/core';

const Banner = ( props ) => {

    const { profilePhoto, nameBusiness, bannerPhoto, topPositionAvatar, businessCategory, isOpenBusiness } = props;

    const StyledBadge = withStyles((theme) => ({
        badge: {
          width:theme.spacing(5),
          height: theme.spacing(5),
          borderRadius:'100px',
          backgroundColor: isOpenBusiness ? '#44b700' : '#ccc',
          color: isOpenBusiness ? '#44b700' : '#ccc',
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


      const useStyles = makeStyles((theme) => ({
        large: {
          width: theme.spacing(15),
          height: theme.spacing(15)
        },
      }));

      const classes = useStyles();


    return (
        <div className={ `my__business__container border-solid border-b-8 ${ isOpenBusiness ? 'border-green-400' : 'border-gray-300' }` }>
            <div className='h-44 w-full'>
                <div className={ `h-44 w-full absolute z-50 top-48 flex items-center justify-end flex-col space-y-5` }>
                    <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    variant="dot"
                    >
                        <Avatar
                        className={ `${ classes.large } shadow-lg bg-white` }
                        src={ profilePhoto }
                        />
                    </StyledBadge>
                    <div className='text-center flex flex-col items-center justify-center'>
                      <div className='element'>
                        <h1 className='font-semibold text-3xl truncate'> 
                          { nameBusiness } 
                        </h1>
                      </div>
                      <h3 className='text-light text-2xl whitespace-nowrap truncate w-72'> 
                        { businessCategory } 
                      </h3>
                    </div>
                </div>
                <img
                style={{ filter:'brightness(0.5)' }}
                className='h-44 w-full object-cover object-center '
                src={ bannerPhoto }
                alt=''/>
            </div>
        </div>
    );
};

export default Banner;
