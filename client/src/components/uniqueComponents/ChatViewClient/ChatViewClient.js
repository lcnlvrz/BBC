import React, { useEffect, useRef, useState } from 'react';
import Chat from '../../reusableComponents/Chat';
import { useSelector } from 'react-redux';
import BusinessOffline from './BusinessOffline';
import { useChatClient } from '../../../hooks/useChatClient';
import { useFixViewPort } from '../../../hooks/useFixViewport';
import Input from '../../reusableComponents/Input';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { Fade, TextField } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, } from '@material-ui/core/styles';
import Theme from '../../reusableComponents/Theme';
import { fillButton } from '../../../constants/styles';
import AvatarStatus from '../../reusableComponents/AvatarStatus.js';
import { validateName } from '../../../helpers/validations';
import AlertAnimation from '../../reusableComponents/AlertAnimation';

const ChatViewClient = () => {

    const { input, setInput, isFormFillOut, setIsFormFillOut, isOnline, currentSearch, socket, businessToSendMSG, allMessages, setAllMessages } = useChatClient();
    
    console.log( businessToSendMSG );

    const [alert, setAlert] = useState( { type:'', message:'', severity:'' } );

    useFixViewPort();
    
    if ( !isOnline ) return <BusinessOffline currentSearch={ currentSearch } isOnline={ isOnline }/>

    if ( isOnline && !isFormFillOut ) return (
        
        <Fade in={ true }>
            <div className='h-screen flex flex-col items-center justify-center space-y-5 mx-5'>

                <AvatarStatus 
                status={ true } 
                spacingBadge={ 5 } 
                spacingAvatar={ 15 } 
                souceProfilePhoto={ currentSearch.profilePhoto } 
                vertical='bottom'
                horizontal='right'/>

                <h1 className='font-semibold text-3xl text-center'> 
                    { currentSearch.businessName } is waiting for you! 
                </h1>
                <Theme color='#000000'>
                    <form
                    onSubmit={ (e) => {

                        e.preventDefault();

                        const validation = validateName( input.completeName );

                        if ( !validation ) return setAlert( { type:'invalidName', message:"The name isn't valid. Only accepts letters", severity:'error' } );

                        setIsFormFillOut( true );

                    } }
                    onChange={ (e) => setInput( { completeName:e.target.value } ) }
                    className='flex flex-col items-center justify-center space-y-5'
                    >
                        <TextField
                        placeholder='Only letters accepts' 
                        name='completeName'
                        label="Complete Name" 
                        variant="outlined"
                        />
                        <button 
                        style={{ width:'100%', borderRadius:'5px' }}
                        className={ fillButton }>

                            JOIN

                        </button>
                    </form>
                </Theme>
                { alert.type && 
                <AlertAnimation 
                setCloseAlert={ setAlert }
                severity={ alert.severity } 
                message={ alert.message }/> 
                }
            </div>
        </Fade>

    );

    return (
        <Chat 
        allMessages={ allMessages }
        setAllMessages={ setAllMessages } 
        socket={ socket } 
        from={ input.completeName } 
        to={ businessToSendMSG } />
    )
};

export default ChatViewClient;
