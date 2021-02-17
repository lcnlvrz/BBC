import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Fade } from '@material-ui/core';
import { useChatBusiness } from '../../../hooks/useChatBusiness';
import ListAllMessages from './ListAllMessages';
import Chat from '../../reusableComponents/Chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import ImageChatExample from '../../../images/chatExampleImg.png';
import { setTitle } from '../../../actions/helmetTitle';


const LiveChat = () => {
    
    const { allMessages, setAllMessages, socket, isTyping, setIsTyping, to, setTo, isShowOneChat, setIsShowOneChat, clearChat, message, setMessage, sendMessageBusiness, media, setMedia, alert, setAlert, sendMediaBusiness } = useChatBusiness();

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch( setTitle( 'Business Client Connection - Live Chat' ) );
       
    }, [ dispatch ]);

    const user = useSelector(state => state.user);

    const propsChat = { 
        setIsTyping,
        clearChat,
        isTyping, 
        image:user.profilePhoto,
        socket,
        setIsShowOneChat,
        from:user.businessName, 
        to, 
        allMessages, 
        setAllMessages,
        message, 
        setMessage,
        sendMessageBusiness,
        media, 
        setMedia, 
        alert, 
        setAlert,
        sendMediaBusiness
    };

    const propsListAllMessages = {

        setTo, 
        socket, 
        to,
        setAllMessages,
        isShowOneChat,
        mobileResolution,
        allMessages, 
        setIsShowOneChat,

    };
    

    if ( mobileResolution ) {

        if ( isShowOneChat ) return <Chat { ...propsChat }/>

        return <ListAllMessages {...propsListAllMessages}/>

    }; 



    return (
        <Fade in={ true }>     
            <div className='w-full flex flex-row justify-evenly flex-wrap'>
                <div className='left__part  text-white w-2/5 bg-gray-500'>
                    <ListAllMessages { ...propsListAllMessages }/>
                </div>
                <div className='right__part rounded w-3/5'>
                    { !isShowOneChat ?
                    <Fade in={ true }>
                        <div className='flex items-center justify-center h-screen p-2'>
                            <h1 className='font-semibold text-3xl text-center absolute z-30'> 
                                Select one chat to see something here 😊 
                            </h1>
                            <img
                            style={{ filter:'blur(5px)' }}
                            className='w-full h-full object-cover' 
                            src={ ImageChatExample } 
                            alt=''/>
                        </div>
                    </Fade> 
                    : 
                    <Chat {...propsChat}/> }
                </div>   
            </div>
        </Fade>
    );
};

export default LiveChat;
