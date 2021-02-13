import React, { useEffect, useRef, useState } from 'react';
import Chat from '../../reusableComponents/Chat';
import { useSelector } from 'react-redux';
import BusinessOffline from './BusinessOffline';
import { useChatClient } from '../../../hooks/useChatClient';
import { useFixViewPort } from '../../../hooks/useFixViewport';
import Form from './Form';
import LoadingAnimation from '../../reusableComponents/LoadingAnimation';

const ChatViewClient = () => {

    const { input, setInput, isFormFillOut, setIsFormFillOut, isOnline, currentSearch, socket, businessToSendMSG, allMessages, setAllMessages, isLoading, image, setImage } = useChatClient();


    if ( !isOnline && !isLoading ) return <BusinessOffline currentSearch={ currentSearch } isOnline={ isOnline }/>

    if ( isOnline && !isFormFillOut && !isLoading ) return <Form 
    setImage={ setImage } 
    input={ input } 
    image={ image }
    setIsFormFillOut={ setIsFormFillOut } 
    setInput={ setInput }/>

    if ( isOnline && isFormFillOut && !isLoading ) return (

        <Chat 
        isClientVision={ true }
        allMessages={ allMessages }
        setAllMessages={ setAllMessages } 
        socket={ socket } 
        image={ image }
        from={ input.completeName } 
        to={ businessToSendMSG } />

    );

    if ( isLoading )  return <LoadingAnimation/>;

  
    
};

export default ChatViewClient;
