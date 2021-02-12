import React, { useState, useEffect } from 'react';
import { Avatar, IconButton, InputBase } from '@material-ui/core';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import { defaultTransiton } from '../../../constants/styles';
import Badge from '@material-ui/core/Badge';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useMediaQuery } from 'react-responsive';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { Fade } from '@material-ui/core';
import socket from '../../../socket/config';
import { useSelector } from 'react-redux';
import { useChatBusiness } from '../../../hooks/useChatBusiness';
import { Fragment } from 'react';
import moment from 'moment';

const LiveChat = () => {
    
    const { allMessages, setAllMessages } = useChatBusiness();

    console.log( allMessages );

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const useStylesClient = makeStyles((theme) => ({
        large: {
          width: theme.spacing(8),
          height: theme.spacing(8)
        },
    }));

    const classesClient = useStylesClient();

    const StyledBadge = withStyles((theme) => ({
        badge: {
          width:theme.spacing(2),
          height: theme.spacing(2),
          borderRadius:'100px',
          backgroundColor: '#44b700',
          color: '#44b700',
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


    const numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

    const [isShowOneChat, setIsShowOneChat] = useState( false );

    if ( mobileResolution ) {

        if ( isShowOneChat ) return (

            <Fade in={ true }>
                <div className='right__part rounded'>
                    <div className='flex flex-row space-y-1 items-center py-1 justify-between'>
                        <IconButton
                        onClick={ () => setIsShowOneChat( false ) }
                        style={{ outline:'none' }}
                        >
                            <ArrowBackIosRoundedIcon/>
                        </IconButton>
                        <div className='flex flex-col items-center justify-center'>
                            <h3 className='font-semibold text-gray-500 text-lg'> 
                                Roberto Juarez 
                            </h3>
                            <StyledBadge
                            overlap="circle"
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                            }}
                            variant="dot"
                            >
                                <Avatar
                                className={ `${ useStylesClient.large } shadow-lg ` }
                                src='https://image.shutterstock.com/image-photo/sad-pensive-man-spectacles-glasses-260nw-1807028797.jpg'
                                />
                            </StyledBadge>
                        </div>
                        <IconButton
                        disabled
                        className='opacity-0'
                        >
                            <ArrowBackIosRoundedIcon/>
                        </IconButton>
                    </div>
                    <div className='all__messages bg-gray-200 h-96 overflow-auto'>
                        <div className='p-5 one__message__other__user w-full'>
                            <div className='flex flex-row items-center space-x-2'>
                                <Avatar
                                src='https://image.shutterstock.com/image-photo/sad-pensive-man-spectacles-glasses-260nw-1807028797.jpg'
                                />
                                <div className='bg-white rounded-2xl'>
                                    <h3 className='text-black font-semibold pt-2 px-2 text-left'> 
                                        Hi, i need reclaim one product. Can you help me?
                                        
                                    </h3>
                                    <div className='flex w-full items-end justify-end p-2'>
                                        <h4 className='text-xs'> 
                                            10 min ago 
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { numbers.map( ( number, index ) => (

                            <div 
                            key={ index }
                            className='p-5 one__message__own flex items-end justify-end w-full '>
                                <div className='flex flex-row items-center space-x-2'>
                                    <div className='bg-white rounded-2xl'>
                                        <h3 className='text-black font-semibold pt-2 px-2'> 
                                            Hi, i need reclaim one product. Can you help me?
                                            
                                        </h3>
                                        <div className='flex w-full items-end justify-end p-2'>
                                            <h4 className='text-xs text-right'> 
                                                10 min ago 
                                            </h4>
                                        </div>
                                    </div>
                                    <Avatar
                                    src='https://image.shutterstock.com/image-photo/sad-pensive-man-spectacles-glasses-260nw-1807028797.jpg'
                                    />
                                </div>
                            </div>

                        ) ) }
                    </div>
                    <footer className='flex flex-row items-center p-2 justify-between w-full'>

                        <InputBase
                        fullWidth
                        placeholder='Type something to send...'
                        />
                        <IconButton
                        style={{ outline:'none' }}
                        >
                            <SendRoundedIcon
                            className='text-black'
                            />
                        </IconButton>

                    </footer>
                </div>
            </Fade>   

        );

        return(
            <Fade in={ true }>
                <div className='mobile__chat__container'>
                    <div className='top bg-gray-600'>
                        <div className='flex flex-row justify-between p-5 items-center'>
        
                            <StyledBadge
                            overlap="circle"
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                            }}
                            variant="dot"
                            >
                                <Avatar
                                className={ `${ useStylesClient.large } shadow-lg ` }
                                src='https://image.shutterstock.com/image-photo/kiev-ukraine-march-31-2015-260nw-275940803.jpg'
                                />
                            </StyledBadge>
        
                            <h1 className='text-3xl font-light text-white'> 
                                CHAT 
                            </h1>
        
                            <MessageRoundedIcon
                            className='text-white'
                            style={{ fontSize:'50px' }}
                            />
                        </div>
                    </div>
                    <div className='bg-gray-500'>
                        <div 
                        className='clients__chat rounded-b-2xl h-screen
                        overflow-auto'>
                            { Object.keys( allMessages ).map( ( client, index ) => (
        
                                <div 
                                onClick={ () => {

                                    setIsShowOneChat( true );

                                } }
                                key={ index }
                                style={ defaultTransiton }
                                className='one__user flex flex-row space-x-2 items-center hover:shadow-2xl cursor-pointer rounded-2xl p-5'>
                                    <Avatar
                                    className={ classesClient.large }
                                    src='https://image.shutterstock.com/image-photo/sad-pensive-man-spectacles-glasses-260nw-1807028797.jpg'
                                    />
                                    <div className='flex flex-col items-start w-full'>
                                        <div className='flex flex-row w-full justify-between'>
                                            <h3 className='font-semibold text-green-400'> 
                                                { allMessages[ client ][0].fromName }
                                            </h3>
                                            <h3 className='bg-green-300 rounded-full px-2'> 
                                            { allMessages[client].length }
                                            </h3>
                                        </div>
                                            <div className='table table-fixed w-full'>
                                                { allMessages[ client ].map( ( message, index ) => index + 1 === allMessages[ client ].length && (
                                                    <Fragment
                                                    key={ index }
                                                    >
                                                    <h4 className='font-semibold truncate text-white'> 
                                                        { message.message }
                                                    </h4>
                                                    <div className='flex flex-row justify-between w-full'>
                                                        <h3 className='text-xs opacity-0 ghost_filler'> 
                                                            10 min ago 
                                                        </h3>
                                                        <h3 className='text-xs text-gray-400'> 
                                                            { moment( message.sentAt ).fromNow() }  
                                                        </h3>
                                                    </div>
                                                    </Fragment>

                                                ) ) }
                                             </div>
                                        
                                    </div>
                                </div>
        
                            ) ) }
                        </div>
                    </div>
                </div>
            </Fade>
        );
    }; 

    return (
        <Fade in={ true }>
            <div className='w-full flex flex-row justify-evenly flex-wrap p-2'>
                <div className='left__part  text-white rounded-tl-2xl rounded-bl-2xl w-2/5 bg-gray-500'>
                    <div className='flex flex-row justify-between items-center bg-gray-600 w-full p-5 rounded-t-2xl'>
                        <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        variant="dot"
                        >
                            <Avatar
                            className={ `${ useStylesClient.large } shadow-lg ` }
                            src='https://image.shutterstock.com/image-photo/kiev-ukraine-march-31-2015-260nw-275940803.jpg'
                            />
                        </StyledBadge>

                        <h1 className='text-2xl font-light'> CHAT </h1>

                        <h1 className='opacity-0'> CHAT </h1>

                    </div>
                    <div className='clients__chat rounded-b-2xl h-96 overflow-auto'>
                        { numbers.map( ( number, index ) => (

                            <div 
                            key={ number }
                            style={ defaultTransiton }
                            className='one__user flex flex-row space-x-2 items-center hover:shadow-2xl cursor-pointer rounded-2xl p-5'>
                                <Avatar
                                className={ classesClient.large }
                                src='https://image.shutterstock.com/image-photo/sad-pensive-man-spectacles-glasses-260nw-1807028797.jpg'
                                />
                                <div className='flex flex-col items-start w-full'>
                                    <div className='flex flex-row w-full justify-between'>
                                        <h3 className='font-semibold text-green-400'> 
                                            Roberto Juarez 
                                        </h3>
                                        <h3 className='bg-green-300 rounded-full px-2'> 
                                            1 
                                        </h3>
                                    </div>
                                    <h4 className='font-semibold text-white'> 
                                        Hi, i need reclaim one product... 
                                    </h4>
                                    <div className='flex flex-row justify-between w-full'>
                                        <h3 className='text-xs opacity-0'> 
                                            10 min ago 
                                        </h3>
                                        <h3 className='text-xs text-gray-400'> 
                                            10 min ago 
                                        </h3>

                                    </div>
                                </div>
                            </div>

                        ) ) }
                    </div>
                </div>
                <div className='right__part rounded w-3/5'>

                <div className='flex flex-col space-y-1 items-center py-1'>  
                        <h3 className='font-semibold text-gray-500 text-lg'> 
                            Roberto Juarez 
                        </h3>
                        <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                        variant="dot"
                        >
                            <Avatar
                            className={ `${ useStylesClient.large } shadow-lg ` }
                            src='https://image.shutterstock.com/image-photo/sad-pensive-man-spectacles-glasses-260nw-1807028797.jpg'
                            />
                        </StyledBadge>
                </div>
                    <div className='all__messages bg-gray-200 h-96 overflow-auto'>
                        <div className='p-5 one__message__other__user w-full'>
                            <div className='flex flex-row items-center space-x-2'>
                                <Avatar
                                src='https://image.shutterstock.com/image-photo/sad-pensive-man-spectacles-glasses-260nw-1807028797.jpg'
                                />
                                <div className='bg-white rounded-2xl'>
                                    <h3 className='text-black font-semibold pt-2 px-2 text-left'> 
                                        Hi, i need reclaim one product. Can you help me?
                                        
                                    </h3>
                                    <div className='flex w-full items-end justify-end p-2'>
                                        <h4 className='text-xs'> 
                                            10 min ago 
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { numbers.map( ( number, index ) => (
                            <div 
                            key={ index }
                            className='p-5 one__message__own flex items-end justify-end w-full '>
                                <div className='flex flex-row items-center space-x-2'>
                                    <div className='bg-white rounded-2xl'>
                                        <h3 className='text-black font-semibold pt-2 px-2'> 
                                            Hi, i need reclaim one product. Can you help me?
                                            
                                        </h3>
                                        <div className='flex w-full items-end justify-end p-2'>
                                            <h4 className='text-xs text-right'> 
                                                10 min ago 
                                            </h4>
                                        </div>
                                    </div>
                                    <Avatar
                                    src='https://image.shutterstock.com/image-photo/sad-pensive-man-spectacles-glasses-260nw-1807028797.jpg'
                                    />
                                </div>
                            </div>
                        ) ) }
                    </div>
                    <footer className='flex flex-row items-center p-2 justify-between w-full'>
                        <InputBase
                        fullWidth
                        placeholder='Type something to send...'
                        />
                        <IconButton
                        style={{ outline:'none' }}
                        >
                            <SendRoundedIcon
                            className='text-black'
                            />
                        </IconButton>
                    </footer>
                </div>   
            </div>
        </Fade>
    );
};

export default LiveChat;
