import React, { useRef, useEffect } from 'react';
import { Fade } from '@material-ui/core';
import { Avatar, IconButton, InputBase } from '@material-ui/core';
import { defaultTransiton } from '../../../constants/styles';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { useHistory } from 'react-router-dom';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import TimeAgoInterval from '../../reusableComponents/TimeAgoInterval';
import FileBase64 from 'react-file-base64';
import AlertAnimation from '../AlertAnimation';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ModalOptions from '../Modal';
import FindReplaceRoundedIcon from '@material-ui/icons/FindReplaceRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';



const OtherMessage = ( props ) => {

    const { allMessages, to, message } = props;

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    return (

        <div 
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

                    { !message.isMedia ?  

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

    );

};

const OwnMessage = ( props ) => {

    const { user, isClientVision, from, message, image } = props;

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });


    return (

        <div 
        className='p-5 one__message__own__user w-full flex flex-col space-y-2'>
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


    );

    


};

const MessageClientLeftChat = ( props ) => {

    const { allMessages, clearChat, to } = props;

    return (
        <Fade 
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
                onClick={ () => clearChat() }
                style={ defaultTransiton }
                className='focus:outline-none flex flex-row items-center justify-center bg-yellow-300 p-2 rounded-full focus:bg-yellow-400 text-blue-500 font-semibold hover:text-blue-800'
                type='button'
                >
                    <DeleteForeverRoundedIcon/>
                    Clear Chat
                </button>
            </div>
        </Fade>

    );

};

const ModalShowPicture = ( props ) => {

    const { setMedia, media, isClientVision, sendMediaBusiness, sendMediaClient, resetValueInputFileBase64 } = props;

    return (
        <ModalOptions setCloseModal={ setMedia }>
            <div className={ `bg-white outline-none flex flex-col justify-center items-center rounded mx-2 absolute h-3/4 w-3/4` }>
                    <img 
                    className='w-full h-3/4 object-contain object-center rounded-tl rounded-tr'
                    src={ media } 
                    alt='client'/>
                <div className='flex flex-row space-x-2 justify-center items-center'>
                    <IconButton
                    onClick={ () => {

                        if ( !isClientVision ) return sendMediaBusiness();

                        sendMediaClient();

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

    );

};

const HeaderChat = ( props ) => {

    const { setIsShowOneChat, socket, to, allMessages, isClientVision } = props;

    const history = useHistory();

    const currentSearch = useSelector(state => state.currentSearch);

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    return (

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

    )

}

const BodyChat = ( props ) => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const { isClientVision, allMessages, to, user, from, image, clearChat, lastMessageRef } = props;

    return (
        <div 
        style={{ height: !mobileResolution && !isClientVision ? 'calc(100% - 110px)' : 'calc(100% - 125px)' }}
        className='all__messages bg-gray-200 flex-1 overflow-auto flex-col justify-between flex'>
            { allMessages[ to.socketID ] && allMessages[ to.socketID ].messages.map( ( message, index ) => {

                const propsOther = { allMessages, to, message, key:index };

                if ( message.sentBy === to.socketID ) return <OtherMessage {...propsOther}/>;

                const propsOwn = { user, isClientVision, from, message, image, key:index };

                if ( !message.isLeave ) return <OwnMessage {...propsOwn}/>;

                const propsLeftChat = { allMessages, clearChat, to, key:index };

                return <MessageClientLeftChat {...propsLeftChat}/>

            } )}
            <div ref={ lastMessageRef }></div>  
        </div>

    );

};

const TypingMessage = ( props ) => {

    const { isTyping, isClientVision, allMessages, to } = props;

    const currentSearch = useSelector(state => state.currentSearch);

    return (

        <Fade in={ isTyping }>
            <div className='relative w-full bottom-7 mx-2'>
                <p className='absolute'>
                    { `${ isClientVision ? currentSearch.businessName : allMessages[ to.socketID ] && allMessages[ to.socketID ].fromName } is typing...` }
                </p>
            </div> 
        </Fade>

    );

};

const FooterChat = ( props ) => {

    const { socket, setMessage, to, sendMessageBusiness, sendMessageClient, isClientVision, fileBase64ParentRef, setMedia, setAlert, resetValueInputFileBase64, allMessages, message } = props;

    return (

        <div className='w-full relative'>
            <form 
            onChange={ (e) => {

                if ( e.target.name !== 'image' ) {

                    socket.emit( 'typing', to.socketID );
                    setMessage( e.target.value );

                }                 

            } }
            onSubmit={ (e) => {

                if ( !isClientVision ) return sendMessageBusiness(e);

                sendMessageClient(e);

            } }
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

    );

};

const Chat = ( props ) => {

    const { from, to, allMessages, setIsShowOneChat, socket, image, isClientVision, isTyping, setIsTyping, clearChat, message, setMessage, sendMessageBusiness, sendMessageClient, media, alert, setAlert, sendMediaBusiness, sendMediaClient, setMedia } = props;
    
    const user = useSelector(state => state.user);

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

    const resetValueInputFileBase64 = () => {

        const children = fileBase64ParentRef.current.children[0];

        children.value = '';

    };

    const propsModalPicture = { setMedia, media, isClientVision, sendMediaBusiness, sendMediaClient, resetValueInputFileBase64 };

    const propsHeaderChat = { setIsShowOneChat, socket, to, allMessages, isClientVision };

    const propsBodyChat = { isClientVision, allMessages, to, user, from, image, clearChat, lastMessageRef };

    const propsTypingMessage = { isTyping, isClientVision, allMessages, to };

    const propsFooterChat = { socket, setMessage, to, sendMessageBusiness, sendMessageClient, isClientVision, fileBase64ParentRef, setMedia, setAlert, resetValueInputFileBase64, allMessages, message };

    return (
        <Fade in={ true }>
            <div className='h-screen overflow-hidden'>
                <HeaderChat {...propsHeaderChat}/>
                <BodyChat {...propsBodyChat}/>
                { isTyping && <TypingMessage {...propsTypingMessage}/>}
                <FooterChat {...propsFooterChat}/>
                { alert.type && <AlertAnimation { ...alert } setCloseAlert={ setAlert }/> }
                { media && <ModalShowPicture {...propsModalPicture }/> }
            </div>
        </Fade>
    );
};

export default Chat;
