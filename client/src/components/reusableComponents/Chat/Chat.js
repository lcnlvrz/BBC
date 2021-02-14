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
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import TimeAgoInterval from '../../reusableComponents/TimeAgoInterval';

const Chat = ( props ) => {

    const history = useHistory();

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const { from, to, allMessages, setAllMessages, setIsShowOneChat, socket, image, isClientVision, isTyping, setIsTyping } = props;

    const numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];


    const [message, setMessage] = useState( '' );
    
    const user = useSelector(state => state.user);

    const currentSearch = useSelector(state => state.currentSearch);

    const lastMessageRef = useRef( null );


    useEffect(() => {

        if ( lastMessageRef ) lastMessageRef.current.scrollIntoView( { behavior:'smooth' } );
        
    }, [ allMessages ]);

    useEffect(() => {

        const timer = setTimeout(() => {

          socket.emit( 'stopTyping', to.socketID );
            
        }, 1000);

        return () => { clearTimeout( timer ) };
        
    }, [ socket, to, isTyping, message ]);

    useEffect(() => {

        setIsTyping( false );
        
    }, [ setIsTyping ]);


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
                        <h3 className='font-semibold text-black text-lg truncate w-full text-center'> 
                            { isClientVision ? currentSearch.businessName : allMessages[ to.socketID ] && allMessages[ to.socketID ].fromName }
                        </h3>
                        <Avatar
                        src={ isClientVision ? currentSearch.profilePhoto : allMessages[ to.socketID ] ? allMessages[ to.socketID ].image : '' }
                        />
                        {/* <AvatarStatus
                        status={ true }
                        spacingBadge={ 3 }
                        spacingAvatar={ 7 }
                        souceProfilePhoto={ isClientVision ? currentSearch.profilePhoto : allMessages[ to.socketID ] ? allMessages[ to.socketID ].image : '' }
                        vertical='bottom'
                        horizontal='right'
                        /> */}
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
                className='all__messages bg-gray-200 flex-1 overflow-auto flex-col justify-between flex'>
                    <div>
                        { allMessages[ to.socketID ] && allMessages[ to.socketID ].messages.map( ( message, index ) => message.sentBy === to.socketID ? (

                            <div 
                            key={ index }
                            className='p-5 one__message__other__user w-full flex flex-col space-y-2'>
                                <div className='flex flex-row items-center space-x-2'>
                                    <Avatar
                                    className='bg-white'
                                    src={ allMessages[ to.socketID ].image }
                                    />
                                    <div className='bg-white rounded-2xl w-3/4'>
                                        <div className='element w-full'>
                                            <h3 className='text-black font-semibold pt-2 px-2 text-left truncate'> 
                                                { allMessages[ to.socketID ].fromName }
                                            </h3>
                                        </div>
                                        <h3 className='font-semibold text-gray-500 pt-2 px-2 text-left break-words'> 
                                            { message.message }
                                        </h3>
                                        <div className='flex w-full items-end justify-end p-2'>
                                            <TimeAgoInterval
                                            classes='text-xs'
                                            date={ message.sentAt }
                                            />
                                        </div>
                                    </div> 
                                </div>
                            </div>

                        ) : 
                        !message.isLeave ? (
                            
                            <div 
                            key={ index }
                            className='p-5 one__message__other__user w-full flex flex-col space-y-2'>
                                <div className='flex flex-row justify-end items-center space-x-2'>
                                    <div className='bg-white rounded-2xl w-3/4'>
                                        <div className='element w-full'>
                                            <h3 className='text-black font-semibold pt-2 px-2 text-right truncate'> 
                                                { isClientVision ? from : user.businessName }
                                            </h3>
                                        </div>
                                        <h3 className='font-semibold text-gray-500 pt-2 px-2 text-right break-words '> 
                                            { message.message }
                                        </h3>
                                        <div className='flex w-full items-start justify-start p-2'>
                                            <TimeAgoInterval
                                            classes='text-xs'
                                            date={ message.sentAt }
                                            />
                                        </div>
                                    </div>
                                    <Avatar
                                    className='bg-white'
                                    src={ image }
                                    /> 
                                </div>
                            </div>
                        ) 
                        : 
                        <Fade 
                        key={ index }
                        in={ true }>
                            <div 
                            className='w-full flex items-center justify-center flex-col space-y-5'>
                                <div className='bg-red-500 w-3/4 text-center text-white p-4 rounded-full'>
                                    <h3 className='font-semibold text-lg'> 
                                        { allMessages[ to.socketID ].fromName } left from chat 😞 
                                    </h3>
                                </div>
                                <button
                                onClick={ () => {

                                    setIsShowOneChat( false );

                                    const copyAllMessages = { ...allMessages };

                                    delete copyAllMessages[ to.socketID ];

                                    setAllMessages( copyAllMessages );


                                } }
                                style={ defaultTransiton }
                                className='focus:outline-none flex flex-row items-center justify-center bg-yellow-300 p-2 rounded-full focus:bg-yellow-400 text-blue-500 font-semibold hover:text-blue-800'
                                type='button'
                                >
                                    <DeleteForeverRoundedIcon/>
                                    Clear Chat
                                </button>
                            </div>
                        </Fade>
                        )
                        }
                        <div ref={ lastMessageRef }></div>
                    </div>   
                </div>
                { isTyping &&
                <Fade in={ isTyping }>
                    <div className='relative w-full bottom-7 mx-2'>
                        <p className='bg-gray-200 absolute'>
                            { `${ isClientVision ? currentSearch.businessName : allMessages[ to.socketID ] && allMessages[ to.socketID ].fromName } is typing...` }
                        </p>
                    </div> 
                </Fade>  }
                <div className='w-full relative'>
                    <form 
                    onChange={ (e) => {

                        setMessage( e.target.value );
                        socket.emit( 'typing', to.socketID );

                    } }
                    onSubmit={ (e) => {

                        e.preventDefault();

                        if ( !message ) return false;

                        setTimeout(() => {

                            socket.emit( 'stopTyping', to.socketID );
                            socket.emit( 'sendMessage', { fromName:from, message, toSocketID:to.socketID, fromSocketID:socket.id, image } );

                            setMessage( '' );

                            const sentAt = moment().format();

                            if ( isClientVision ) {

                                if ( allMessages[ to.socketID ] ) return setAllMessages( { ...allMessages, [ to.socketID ]: {  ...allMessages[ to.socketID ], messages:[ ...allMessages[to.socketID].messages, { message, sentAt, sentBy:socket.id } ]  }  } );

                                setAllMessages( { ...allMessages, [ to.socketID ]:{ fromName:currentSearch.businessName, image:currentSearch.profilePhoto, fromSocketID:to.socketID, messages:[ { message, sentAt, sentBy:socket.id } ] } } );

                            } else {

                                setAllMessages( { ...allMessages, [ to.socketID ]: {  ...allMessages[ to.socketID ], messages:[ ...allMessages[to.socketID].messages, { message, sentAt, sentBy:socket.id } ]  }  } );

                            };
                            
                        }, 100);
                    } }
                    className='flex flex-row items-center p-2 justify-between  bg-white absolute w-full'>
                        <InputBase
                        maxLength={ 2000 }
                        disabled={ allMessages[to.socketID] && allMessages[to.socketID].isLeave ? true : false }
                        name='message'
                        value={ message }
                        fullWidth={ true }
                        placeholder='Type something to send...'
                        />
                        <IconButton
                        disabled={ allMessages[to.socketID] && allMessages[to.socketID].isLeave ? true : false }
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
