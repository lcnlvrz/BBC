import React, { useState } from 'react'
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import '../MyBusiness/MyBusiness.css';
import Badge from '@material-ui/core/Badge';
import { Avatar, TextareaAutosize } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { defaultTransiton, fillButton } from '../../../constants/styles';
import { useMediaQuery } from 'react-responsive';
import ChangeProfilePhoto from './ChangeProfilePhoto/ChangeProfilePhoto';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import ChangeSocialMediaLinks from './ChangeSocialMediaLinks';

const BusinessProfile = () => {

    
    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });


    const [state, setState] = React.useState({ stateBusiness:false });

    const handleChange = (event) => {
        setState({ stateBusiness:event.target.checked });
    };

    const StyledBadge = withStyles((theme) => ({
        badge: {
          width:theme.spacing(5),
          height: theme.spacing(5),
          borderRadius:'100px',
          backgroundColor: state.stateBusiness ? '#44b700' : '#787878',
          color: state.stateBusiness ? '#44b700' : '#787878',
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

      const IOSSwitch = withStyles((theme) => ({
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: theme.spacing(1),
        },
        switchBase: {
          padding: 1,
          '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
              backgroundColor: '#52d869',
              opacity: 1,
              border: 'none',
            },
          },
          '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 26 / 2,
          border: `1px solid ${theme.palette.grey[400]}`,
          backgroundColor: theme.palette.grey[50],
          opacity: 1,
          transition: theme.transitions.create(['background-color', 'border']),
        },
        checked: {},
        focusVisible: {},
      }))(({ classes, ...props }) => {
        return (
          <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
              root: classes.root,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
            {...props}
          />
        );
      });

    const classes = useStyles();

    const [isChangeProfilePhoto, setIsChangeProfilePhoto] = useState( false );

    const [isChangeSocialMediaLinks, setIsChangeSocialMediaLinks] = useState( false );

    const questionsAndAnswers = [{ title:'What is Nike?', text:'Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area.' },{ title:'Why Nike?', text:'Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area.' }];

    return (
        <div>
            <div className={ `my__business__container border-solid border-b-8 ${ state.stateBusiness ? 'text-green-400 border-green-400' : 'text-gray-500 border-gray-500' }` }>
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

                                setIsChangeProfilePhoto( true );

                            } }
                            className={ `${ classes.large } shadow-lg cursor-pointer` }
                            src='https://i.pinimg.com/originals/57/58/22/575822c5381ea91c21bfd2c69b359e24.png'
                            />
                        </StyledBadge>
                        <input
                        className='text-3xl w-full outline-none text-center'
                        defaultValue={ 'ADIDAS - Oficial Business' }
                        />
                    </div>
                    <img
                    onClick={ () => {

                      setIsChangeProfilePhoto( true );

                    } }
                    style={{ filter:'brightness(0.5)' }}
                    className='h-44 w-full object-cover object-center cursor-pointer'
                    src='https://record-play.net/wp-content/uploads/2016/06/claimfreedom-adidas-Outdoor.jpg'
                    alt=''/>
                </div>
            </div>
            <div className='mt-28 flex items-center justify-center flex-col space-y-5'>
                <FormControlLabel
                control={
                <IOSSwitch 
                checked={state.stateBusiness} 
                onChange={handleChange} name="stateBusiness" 
                />}
                label={ !state.stateBusiness ? 'Open Business' : 'Close Business' }
                />
                <h1 className='font-light text-center px-5 text-gray-500'> 
                    *To change information, just touch or click over the text, change it and finally save changes clicking the button on bottom*
                </h1> 
                <div className='mt-28 flex flex-row flex-wrap justify-evenly m-10 w-full px-5 space-y-5'>
                    <TextareaAutosize
                    rowsMax={ 10 }
                    rowsMin={ 10 }
                    defaultValue='What is nike? &#13;&#10; Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area.'
                    className='outline-none w-full text-center border rounded-2xl p-5 text-semibold text-2xl resize-none'
                    />
                    <TextareaAutosize
                    rowsMax={ 10 }
                    rowsMin={ 10 }
                    defaultValue='Why Nike? &#13;&#10; Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area.'
                    className='outline-none w-full text-center border rounded-2xl p-5 text-semibold text-2xl resize-none'
                    />
                </div>
                <footer className='bg-black p-5 space-y-5 w-full'>
                  <div className='flex flex-row justify-between w-full'>
                      <div className='flex items-center space-x-2 w-2/4'>
                          <input
                          defaultValue='Nike | Oficial Business'
                          className='bg-transparent outline-none text-white font-semibold text-lg'
                          />
                      </div>
                      <div 
                      onClick={ () => setIsChangeSocialMediaLinks( true ) }
                      className='space-x-2 cursor-pointer w-2/4 text-right'>
                          <FacebookIcon
                          className='text-white'
                          />
                          <InstagramIcon
                          className='text-white'
                          />
                          <TwitterIcon
                          className='text-white'
                          />
                      </div>
                  </div>
                  <div className='footer__questions text-white flex flex-row justify-between space-x-5'>
                        <TextareaAutosize
                        rowsMax={ 10 }
                        rowsMin={ 10 }
                        defaultValue='Why Nike? &#13;&#10; &#13;&#10; Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing.'
                        className='bg-transparent text-white resize-none w-full outline-none'
                        />
                        <TextareaAutosize
                        rowsMax={ 10 }
                        rowsMin={ 10 }
                        defaultValue='Why Nike? &#13;&#10; &#13;&#10; Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing.'
                        className='bg-transparent text-white resize-none w-full outline-none'
                        />
                  </div>
                  <div className='text-white z-30'>
                    <input
                    defaultValue='Nike All Rights Reserved.'
                    className='bg-transparent outline-none w-full z-30 relative'
                    />
                  </div>
                </footer>
                <div className='fixed left-0 bottom-2 flex items-center justify-end w-max-full right-0'>
                  <button
                  className={ fillButton }
                  style={ defaultTransiton }
                  >
                    Save Changes
                  </button>
                </div>
            </div>
            { isChangeProfilePhoto && <ChangeProfilePhoto setCloseModal={ setIsChangeProfilePhoto  }/>  }
            { isChangeSocialMediaLinks && <ChangeSocialMediaLinks setCloseModal={ setIsChangeSocialMediaLinks }/> }
        </div>
    );
};

export default BusinessProfile;
