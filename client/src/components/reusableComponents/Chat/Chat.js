import React, { useRef, useState, useEffect } from 'react';
import { Fade } from '@material-ui/core';
import { Avatar, IconButton, InputBase } from '@material-ui/core';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import { defaultTransiton } from '../../../constants/styles';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useMediaQuery } from 'react-responsive';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import socket from '../../../socket/config';
import { badgeOnlineOrOffline, avatarSizeChat } from './styles';
import { useSelector } from 'react-redux';
import AvatarStatus from '../AvatarStatus.js';
import { Fragment } from 'react';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const Chat = ( props ) => {

    const history = useHistory();

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const { from, to, allMessages, setAllMessages, setIsShowOneChat, socket, image, isClientVision } = props;

    const numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

    console.log( isClientVision );

    const [message, setMessage] = useState( '' );
    
    const user = useSelector(state => state.user);

    const currentSearch = useSelector(state => state.currentSearch);

    const lastMessageRef = useRef( null );

    useEffect(() => {

        if ( lastMessageRef ) lastMessageRef.current.scrollIntoView( { behavior:'smooth' } );
        
    }, [ allMessages ])

    return (
        <Fade in={ true }>
            <div className='h-screen overflow-hidden'>
                <div className='flex flex-row justify-between items-center'>
                    
                    <IconButton
                    onClick={ () => {

                        if ( setIsShowOneChat ) return setIsShowOneChat( false );

                        history.push( `/search/business/?username=${ currentSearch.username }` );

                    } }
                    style={{ outline:'none', color:'black' }}
                    >
                        <ArrowBackRoundedIcon/>    
                    </IconButton> 
                    <div className='flex flex-col space-y-1 items-center py-1'>  
                        <h3 className='font-semibold text-gray-500 text-lg truncate w-full'> 
                            { currentSearch.businessName }
                        </h3>
                        <AvatarStatus
                        status={ true }
                        spacingBadge={ 3 }
                        spacingAvatar={ 7 }
                        souceProfilePhoto={ isClientVision && currentSearch.profilePhoto }
                        vertical='bottom'
                        horizontal='right'
                        />
                    </div>
                    <IconButton
                    disabled
                    style={{ opacity:0 }}
                    className='ghost__fillter'
                    >
                        <ArrowBackRoundedIcon/>    
                    </IconButton> 
                </div>
                <div 
                style={{ height: 'calc(100% - 155px)' }}
                className='all__messages bg-gray-200 flex-1 overflow-auto '>
                    { allMessages[ to.socketID ] && allMessages[ to.socketID ].length > 0 && 
                    allMessages[ to.socketID ].map( ( message, index ) => message.fromSocketID === to.socketID ? (

                        <div 
                        key={ index }
                        className='p-5 one__message__other__user w-full'>
                            <div className='flex flex-row items-center space-x-2'>
                                <Avatar
                                className='bg-white'
                                src={ message.image }
                                />
                                <div className='bg-white rounded-2xl'>
                                    <h3 className='text-black font-semibold pt-2 px-2 text-left'> 
                                        { message.message }

                                    </h3>
                                    <div className='flex w-full items-end justify-end p-2'>
                                        <h4 className='text-xs'> 
                                            { moment( message.sentAt ).fromNow() }
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ) : (

                        <div 
                        key={ index }
                        className='p-5 one__message__own flex items-end justify-end w-full '>
                            <div className='flex flex-row items-center space-x-2'>
                                <div className='bg-white rounded-2xl'>
                                    <h3 className='text-black font-semibold pt-2 px-2'> 
                                        { message.message }
                                        
                                    </h3>
                                    <div className='flex w-full items-end justify-end p-2'>
                                        <h4 className='text-xs text-right'> 
                                            { moment( message.sentAt ).fromNow() } 
                                        </h4>
                                    </div>
                                </div>
                                <Avatar
                                className='bg-white'
                                src={ message.image }
                                />
                            </div>
                        </div>

                    ) )
                    }
                <div ref={ lastMessageRef }></div>
                </div>
                <div className='w-full relative'>
                    <form 
                    onChange={ (e) => setMessage( e.target.value ) }
                    onSubmit={ (e) => {

                        e.preventDefault();

                        socket.emit( 'sendMessage', { fromName:from, message, toSocketID:to.socketID, fromSocketID:socket.id, image } );

                        setMessage( '' );

                        if ( allMessages[ to.socketID ] ) return setAllMessages( { ...allMessages, [ to.socketID ]: [ ...allMessages[ to.socketID ], { message, fromName:from, toSocketID:to.socketID, fromSocketID:socket.id, image } ] } );

                        setAllMessages( { ...allMessages, [ to.socketID ]: [ { message, fromName:from, toSocketID:to.socketID, fromSocketID:socket.id, image } ] } );

                        

                        

                    } }
                    className='flex flex-row items-center p-2 justify-between  bg-white absolute w-full'>
                        <InputBase
                        name='message'
                        value={ message }
                        fullWidth
                        placeholder='Type something to send...'
                        />
                        <IconButton
                        type='submit'
                        style={{ outline:'none' }}
                        >
                            <SendRoundedIcon
                            className='text-black'
                            />
                        </IconButton>
                    </form>
                </div>
            </div>
        </Fade>
    );
};

export default Chat;
