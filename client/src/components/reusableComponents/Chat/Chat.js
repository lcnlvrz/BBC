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
import FileBase64 from 'react-file-base64';
import AlertAnimation from '../AlertAnimation';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ModalOptions from '../Modal';
import FindReplaceRoundedIcon from '@material-ui/icons/FindReplaceRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { Helmet } from 'react-helmet-async';

const Chat = ( props ) => {

    const history = useHistory();

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const { from, to, allMessages, setAllMessages, setIsShowOneChat, socket, image, isClientVision, isTyping, setIsTyping } = props;

    const [media, setMedia] = useState( null );

    const [alert, setAlert] = useState( { type:'', message:'', severity:'' } );

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

    const fileBase64ParentRef = useRef( null );

    useEffect(() => {

        if ( fileBase64ParentRef.current ) {
        
            const children = fileBase64ParentRef.current.children[0];
        
           children.setAttribute( 'id', 'image-client' );
           children.setAttribute( 'name', 'image' );
           children.classList.add( 'hidden' );
        
        };
        
    }, [ fileBase64ParentRef ]);

    const sendMessage = (e) => {

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

    }

    const resetValueInputFileBase64 = () => {

        const children = fileBase64ParentRef.current.children[0];

        children.value = '';

    };

    return (
        <Fade in={ true }>
            <div className='h-screen overflow-hidden'>
                { isClientVision ?  
                <Helmet>
                    <title> Business Client Connection - Live Chat { currentSearch.businessName } </title>
                </Helmet> 
                :
                <Helmet>
                    <title> Business Client Connection - Live Chat </title>
                </Helmet>}
                <div className='flex flex-row justify-between items-center'>
                    <IconButton
                    onClick={ () => {

                        if ( setIsShowOneChat ){

                            setIsShowOneChat( false );
                            socket.emit( 'notificateMessagesNotViewedToClient', to.socketID );

                        } else {

                            history.push( `/search/business/?username=${ currentSearch.username }` );

                        };

                    } }
                    style={{ outline:'none', color:'black' }}
                    >
                        <ArrowBackRoundedIcon/>    
                    </IconButton> 
                    <div className='flex flex-row space-x-2 items-center justify-center py-1'>
                        <Avatar
                        src={ isClientVision ? currentSearch.profilePhoto : allMessages[ to.socketID ] ? allMessages[ to.socketID ].image : '' }
                        /> 
                        <div className='flex flex-col items-start justify-center text-left'>
                            <div className='element'>
                                <h3 className='font-semibold text-black text-lg truncate w-full text-left'> 
                                    { isClientVision ? currentSearch.businessName : allMessages[ to.socketID ] && allMessages[ to.socketID ].fromName }
                                </h3>
                            </div>
                            { allMessages[ to.socketID ] &&  allMessages[ to.socketID ].viewed && isClientVision ?
                            <Fade in={ true }>
                                <h1 className={ `${ mobileResolution && 'text-sm'} text-green-400 font-semibold` }> 
                                    is in your chat now! 🙇
                                </h1>
                            </Fade>   
                            :
                            isClientVision && allMessages[ to.socketID ]
                            &&
                            <Fade in={ true }>
                                <h1 className={ `text-red-400 font-semibold ${ mobileResolution && 'text-xs' }` }> 
                                    is answering other clients, wait a minute 🙏
                                </h1>
                            </Fade> }
                        </div> 
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
                style={{ height: !mobileResolution && !isClientVision ? 'calc(100% - 110px)' : 'calc(100% - 125px)' }}
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
                                            <h3 className='text-gray-500 font-semibold pt-2 px-2 text-left truncate'> 
                                                { allMessages[ to.socketID ].fromName }
                                            </h3>
                                        </div>

                                        { !message.isMedia 
                                        ?  

                                            <h3 className='font-semibold text-black pt-2 px-2 text-left break-words'> 
                                                { message.message }
                                            </h3> 
                                        : 
                                        <div className='flex items-center justify-center w-full'>
                                            <img 
                                            className={ `${ mobileResolution ? 'w-full h-2/3 object-contain' : 'w-3/4 h-2/3' } ` }
                                            src={ message.media } 
                                            alt='media'/>
                                        </div> 
                                        }
                                        <div className='flex w-full items-end justify-end p-2'>
                                            <TimeAgoInterval
                                            classes='text-sm font-light'
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
                                            <h3 className='text-gray-500 font-semibold pt-2 px-2 text-right truncate'> 
                                                <span className='font-light'>You as</span> { isClientVision ? from : user.businessName }
                                            </h3>
                                        </div>
                                        { !message.isMedia ?  

                                        <h3 className='font-semibold text-black pt-2 px-2 text-left break-words'> 
                                            { message.message }
                                        </h3> 
                                        :
                                        <div className='flex items-center justify-center w-full '>
                                            <img 
                                            className={ `${ mobileResolution ? 'w-full' : 'w-3/4 h-64 ' } object-contain ` }
                                            src={ message.media } 
                                            alt='media'/>
                                        </div> 
                                        }
                                        <div className='flex w-full items-start justify-start p-2'>
                                            <TimeAgoInterval
                                            classes='text-sm font-light'
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
                            className='w-full flex items-center justify-center flex-col space-y-3 py-2'>
                                <div className='bg-red-500 w-3/4 text-center text-white p-4 rounded-full'>
                                    <div className='element w-full'>
                                    <h3 className='font-semibold text-lg truncate'> 
                                        { allMessages[ to.socketID ].fromName } left from chat 😞 
                                    </h3>
                                    </div>
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
                        <p className='absolute'>
                            { `${ isClientVision ? currentSearch.businessName : allMessages[ to.socketID ] && allMessages[ to.socketID ].fromName } is typing...` }
                        </p>
                    </div> 
                </Fade>  }
                <div className='w-full relative'>
                    <form 
                    onChange={ (e) => {

                        if ( e.target.name !== 'image' ) {

                            socket.emit( 'typing', to.socketID );
                            setMessage( e.target.value );

                        }                 

                    } }
                    onSubmit={ (e) => sendMessage(e) }
                    className='flex flex-row items-center p-2 justify-center  bg-white absolute w-full space-x-2'>
                        <div 
                        className='hidden'
                        ref={ fileBase64ParentRef }>
                            <FileBase64
                            multiple={ false }
                            onDone={ ( file ) => {

                                const { base64, file:image } = file;

                                if ( image.size > 100000 ) return setAlert( { type:'heavyImage', message:"The image is so heavy, try with another less 100 KB", severity:'error' } );

                                setMedia( base64 );

                            } } />
                        </div>
                        <label htmlFor='image-client'>
                            <IconButton
                            onClick={ resetValueInputFileBase64 }
                            component='span'
                            style={{ outline:'none', color:'black' }}
                            >
                                <MenuRoundedIcon/>
                            </IconButton>
                        </label>
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
                { alert.type && <AlertAnimation message={ alert.message } severity={ alert.severity } setCloseAlert={ setAlert }/> }
                { media && 
                <ModalOptions setCloseModal={ setMedia }>
                    <div className={ `bg-white outline-none flex flex-col justify-center items-center rounded mx-2 absolute h-3/4 w-3/4` }>
                            <img 
                            className='w-full h-3/4 object-contain object-center rounded-tl rounded-tr'
                            src={ media } 
                            alt='client'/>
                        <div className='flex flex-row space-x-2 justify-center items-center'>
                            <IconButton
                            onClick={ () => {

                                if ( !media ) return setAlert( { type:'empty', message:'The image is empty', severity:'error' } );

                                socket.emit( 'media', { toSocketID:to.socketID, media, fromName:from, image } );

                                setMedia( null );

                                const sentAt = moment().format();

                                if ( isClientVision ) {

                                    if ( allMessages[ to.socketID ] ) return setAllMessages( { ...allMessages, [ to.socketID ]: {  ...allMessages[ to.socketID ], messages:[ ...allMessages[to.socketID].messages, { media, sentAt, sentBy:socket.id, isMedia:true } ]  }  } );
                    
                                    setAllMessages( { ...allMessages, [ to.socketID ]:{ fromName:currentSearch.businessName, image:currentSearch.profilePhoto, fromSocketID:to.socketID, messages:[ { media, sentAt, sentBy:socket.id, isMedia:true } ] } } );
                    
                                } else {
                    
                                    setAllMessages( { ...allMessages, [ to.socketID ]: {  ...allMessages[ to.socketID ], messages:[ ...allMessages[to.socketID].messages, { media, sentAt, sentBy:socket.id, isMedia:true } ]  }  } );
                    
                                };

                               

                            } }
                            style={{ outline:'none' }}
                            >
                                <SendRoundedIcon
                                className='text-green-400'
                                />             
                            </IconButton>
                            <label htmlFor='image-client'>
                                <IconButton
                                onClick={ resetValueInputFileBase64 }
                                component='span'
                                style={{ outline:'none' }}
                                
                                >
                                    <FindReplaceRoundedIcon
                                    className=''
                                    />
                                </IconButton>
                            </label>
                            <IconButton
                            onClick={ () => setMedia( null ) }
                            style={{ outline:'none' }}
                            >
                                <ClearRoundedIcon
                                className='text-gray-500'
                                />
                            </IconButton>
                        </div>
                    </div>

                </ModalOptions> 
                }
            </div>
        </Fade>
    );
};

export default Chat;
