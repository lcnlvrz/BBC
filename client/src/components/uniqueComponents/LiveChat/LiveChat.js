import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Fade } from '@material-ui/core';
import { useChatBusiness } from '../../../hooks/useChatBusiness';
import ListAllMessages from './ListAllMessages';
import Chat from '../../reusableComponents/Chat/Chat';
import { Link } from 'react-router-dom';
import LeftMenu from '../../reusableComponents/LeftMenu';
import { useSelector } from 'react-redux';
import ImageChatExample from '../../../images/chatExampleImg.png';


const LiveChat = () => {
    
    const { allMessages, setAllMessages, socket, isTyping, setIsTyping } = useChatBusiness();

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const [to, setTo] = useState( '' );

    const user = useSelector(state => state.user);

    const [isShowOneChat, setIsShowOneChat] = useState( false );


    if ( mobileResolution ) {


        if ( isShowOneChat ) return <Chat 
        setIsTyping={ setIsTyping }
        isTyping={ isTyping } 
        image={ user.profilePhoto }
        socket={ socket }
        setIsShowOneChat={ setIsShowOneChat }
        from={ user.businessName } 
        to={ to } 
        allMessages={ allMessages }  
        setAllMessages={ setAllMessages }/>

        return <ListAllMessages 
        setTo={ setTo }
        to={ to }
        isShowOneChat={ isShowOneChat }
        mobileResolution={ mobileResolution } 
        allMessages={ allMessages } 
        setIsShowOneChat={ setIsShowOneChat }/>

    }; 


    return (
        <Fade in={ true }>     
            <div className='w-full flex flex-row justify-evenly flex-wrap'>
                <div className='left__part  text-white w-2/5 bg-gray-500'>
                    <ListAllMessages 
                    to={ to }
                    isShowOneChat={ isShowOneChat }
                    mobileResolution={ mobileResolution }
                    setTo={ setTo }
                    allMessages={ allMessages } 
                    setIsShowOneChat={ setIsShowOneChat }/>
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
                    <Chat 
                    setIsTyping={ setIsTyping }
                    isTyping={ isTyping }
                    image={ user.profilePhoto }
                    socket={ socket }
                    setIsShowOneChat={ setIsShowOneChat }
                    from={ user.businessName } 
                    to={ to } 
                    allMessages={ allMessages }  
                    setAllMessages={ setAllMessages }/> }
                </div>   
            </div>
        </Fade>
    );
};

export default LiveChat;
