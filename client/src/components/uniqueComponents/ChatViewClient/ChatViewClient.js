import React, { useEffect, useRef, useState } from 'react';
import Chat from '../../reusableComponents/Chat';
import { useSelector } from 'react-redux';
import BusinessOffline from './BusinessOffline';
import { useChatClient } from '../../../hooks/useChatClient';
import { useFixViewPort } from '../../../hooks/useFixViewport';
import Form from './Form';
import LoadingAnimation from '../../reusableComponents/LoadingAnimation';
import { Avatar } from '@material-ui/core';
import AvatarStatus from '../../reusableComponents/AvatarStatus.js';
import { defaultTransiton } from '../../../constants/styles';

const ChatViewClient = () => {

    const { input, setInput, isFormFillOut, setIsFormFillOut, isOnline, currentSearch, socket, businessToSendMSG, allMessages, setAllMessages, isLoading, image, setImage, isTyping, setIsTyping, setIsContinueWithDataFromLS, isContinueWithDataFromLS } = useChatClient();

    const [nameLS, setNameLS] = useState( false );

    useEffect(() => {

        const completeNameFormLS = localStorage.getItem( 'completeName' );

        setNameLS( completeNameFormLS );
        
    }, []);

    const imageLS = localStorage.getItem( 'image' );

    if ( !isOnline && !isLoading ) return <BusinessOffline currentSearch={ currentSearch } isOnline={ isOnline }/>

    if ( nameLS && !isLoading && isOnline && !isFormFillOut ) return (

        <div className='h-screen flex items-center justify-center flex-col space-y-5'>
                <AvatarStatus isOnlyAvatar={ true } spacingAvatar={ 10 } souceProfilePhoto={ imageLS }/>
                <h1 
                className='text-2xl font-light'> 
                    ¿Continue as <span className='font-semibold'>{ nameLS }</span>? 
                </h1>
            <div className='flex flex-row items-center justify-between space-x-5'>
                <button
                onClick={ () => {

                    setInput( { completeName:nameLS } );
                    const image = localStorage.getItem( 'image' );
                    setImage( image );
                    setIsFormFillOut( true );

                } }
                style={ defaultTransiton }
                className='bg-green-500 text-white rounded p-2 focus:outline-none hover:text-black'
                type='button'
                >
                    Yes, for sure.
                </button>
                <button
                onClick={ () => {

                    setImage( null );
                    setInput( '' );
                    localStorage.removeItem( 'image' );
                    localStorage.removeItem( 'completeName' );
                    setNameLS( '' );
                    // setIsContinueWithDataFromLS( { isContinue:false, answered:true } )
                         
                    
                } }
                style={ defaultTransiton }
                className='bg-red-500 rounded p-2 text-white focus:outline-none hover:text-black'
                type='button'
                >
                    No, change it.
                </button>
            </div>
        </div>

    );


    if ( isOnline && !isFormFillOut && !isLoading && !nameLS ) return <Form 
    setImage={ setImage } 
    setIsContinueWithDataFromLS={ setIsContinueWithDataFromLS }
    input={ input } 
    image={ image }
    setIsFormFillOut={ setIsFormFillOut } 
    setInput={ setInput }/>

    if ( isOnline && isFormFillOut && !isLoading ) return (

        <Chat 
        setIsTyping={ setIsTyping }
        isTyping={ isTyping }
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
