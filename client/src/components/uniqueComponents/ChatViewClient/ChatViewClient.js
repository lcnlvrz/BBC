import React, { useEffect, useState } from 'react';
import Chat from '../../reusableComponents/Chat';
import BusinessOffline from './BusinessOffline';
import { useChatClient } from '../../../hooks/useChatClient';
import Form from './Form';
import LoadingAnimation from '../../reusableComponents/LoadingAnimation';
import { Fade } from '@material-ui/core';
import AvatarStatus from '../../reusableComponents/AvatarStatus.js';
import { defaultTransiton } from '../../../constants/styles';
import NotFoundPage from '../../reusableComponents/NotFoundPage';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../actions/helmetTitle';

const AskIfContinueLS = ( props ) => {

    const { imageLS, nameLS, setInput, setImage, setIsFormFillOut, setNameLS } = props;

    const continueWithInfoFromLS = () => {

        setInput( { completeName:nameLS } );
        const image = localStorage.getItem( 'image' );
        setImage( image );
        setIsFormFillOut( true );

    };

    const noContinueWithInfoFromLS = () => {

        setImage( null );
        setInput( '' );
        localStorage.removeItem( 'image' );
        localStorage.removeItem( 'completeName' );
        setNameLS( '' );
                            

    };

    return (

        <Fade in={ true }>
            <div className='h-screen flex items-center justify-center flex-col space-y-5'>
                <AvatarStatus isOnlyAvatar={ true } spacingAvatar={ 10 } souceProfilePhoto={ imageLS }/>
                <h1 
                className='text-2xl font-light text-center'> 
                    ¿Continue as <span className='font-semibold'>{ nameLS }</span>? 
                </h1>
                <div className='flex flex-row items-center justify-between space-x-5'>
                    <button
                    onClick={ continueWithInfoFromLS }
                    style={ defaultTransiton }
                    className='bg-green-500 text-white rounded p-2 focus:outline-none hover:text-black'
                    type='button'
                    >
                        Yes, for sure.
                    </button>
                    <button
                    onClick={ noContinueWithInfoFromLS }
                    style={ defaultTransiton }
                    className='bg-red-500 rounded p-2 text-white focus:outline-none hover:text-black'
                    type='button'
                    >
                        No, change it.
                    </button>
                </div>
            </div>
        </Fade>

    );

};

const ChatViewClient = () => {

    const { input, setInput, isFormFillOut, setIsFormFillOut, isOnline, currentSearch, socket, businessToSendMSG, allMessages, setAllMessages, isLoading, image, setImage, isTyping, setIsTyping, setIsContinueWithDataFromLS, message, setMessage, sendMessageClient, sendMediaClient, media, alert, setMedia, setAlert } = useChatClient();

    const dispatch = useDispatch();
    
    const [nameLS, setNameLS] = useState( false );

    useEffect(() => {

        const completeNameFormLS = localStorage.getItem( 'completeName' );

        setNameLS( completeNameFormLS );

        dispatch( setTitle( `Business Client Connection - Chat with ${ currentSearch.businessName }` ) );
        
    }, [ dispatch, currentSearch.businessName ]);

    const imageLS = localStorage.getItem( 'image' );

    const propsChat = {

        message,
        setMessage,
        setIsTyping,
        isTyping,
        isClientVision:true,
        allMessages,
        setAllMessages,
        socket,
        image,
        from:input.completeName, 
        to: businessToSendMSG,
        sendMessageClient,
        sendMediaClient,
        media, 
        alert,
        setMedia, 
        setAlert

    };

    const propsForm = {

        setImage,
        setIsContinueWithDataFromLS,
        input, 
        image,
        setIsFormFillOut,
        setInput

    };

    const propsAskIfContinue = { imageLS, nameLS, setInput, setImage, setIsFormFillOut, setNameLS };

    if ( !isOnline && !isLoading && currentSearch.business ) return <BusinessOffline currentSearch={ currentSearch } isOnline={ isOnline }/>

    if ( !isLoading && !currentSearch.business ) return <NotFoundPage/>

    if ( nameLS && !isLoading && isOnline && !isFormFillOut ) return <AskIfContinueLS {...propsAskIfContinue}/>

    if ( isOnline && !isFormFillOut && !isLoading && !nameLS ) return <Form {...propsForm}/>

    if ( isOnline && isFormFillOut && !isLoading ) return <Chat {...propsChat}/>;

    if ( isLoading )  return <LoadingAnimation/>;
    
};

export default ChatViewClient;
