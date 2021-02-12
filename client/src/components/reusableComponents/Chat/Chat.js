import React, { useState } from 'react';
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

const Chat = ( props ) => {

    const { from, to, allMessages, setAllMessages } = props;

    const numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

    const currentSearch = useSelector(state => state.currentSearch);

    const StyledBadge = badgeOnlineOrOffline( currentSearch.isOpenBusiness, 2 );

    const useStylesClient = avatarSizeChat( 6 );

    const [message, setMessage] = useState( '' );

    console.log( allMessages );


    return (
        <Fade in={ true }>
            <div className='w-full flex flex-row justify-evenly flex-wrap p-2'>
                <div className='right__part rounded w-3/5'>
                    <div className='flex flex-col space-y-1 items-center py-1'>  
                        <h3 className='font-semibold text-gray-500 text-lg'> 
                            { currentSearch.businessName }
                        </h3>
                        <AvatarStatus
                        status={ true } 
                        spacingBadge={ 2 } 
                        spacingAvatar={ 5 } 
                        souceProfilePhoto={ currentSearch.profilePhoto } 
                        vertical='bottom'
                        horizontal='right'
                        />
                    </div>
                    <div className='all__messages bg-gray-200 h-96 overflow-auto'>
                        <div className='p-5 one__message__other__user w-full'>
                            <div className='flex flex-row items-center space-x-2'>
                                <Avatar
                                src='https://image.shutterstock.com/image-photo/sad-pensive-man-spectacles-glasses-260nw-1807028797.jpg'
                                />
                                <div className='bg-white rounded-2xl'>
                                    <h3 className='text-black font-semibold pt-2 px-2 text-left'> 
                                        Hi, i need reclaim one product. Can you help me?
                                        
                                    </h3>
                                    <div className='flex w-full items-end justify-end p-2'>
                                        <h4 className='text-xs'> 
                                            10 min ago 
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { numbers.map( ( number, index ) => (
                            <div 
                            key={ index }
                            className='p-5 one__message__own flex items-end justify-end w-full '>
                                <div className='flex flex-row items-center space-x-2'>
                                    <div className='bg-white rounded-2xl'>
                                        <h3 className='text-black font-semibold pt-2 px-2'> 
                                            Hi, i need reclaim one product. Can you help me?
                                            
                                        </h3>
                                        <div className='flex w-full items-end justify-end p-2'>
                                            <h4 className='text-xs text-right'> 
                                                10 min ago 
                                            </h4>
                                        </div>
                                    </div>
                                    <Avatar
                                    src='https://image.shutterstock.com/image-photo/sad-pensive-man-spectacles-glasses-260nw-1807028797.jpg'
                                    />
                                </div>
                            </div>
                        ) ) }
                    </div>
                    <form 
                    onSubmit={ (e) => {

                        e.preventDefault();


                        socket.emit( 'sendMessage', { message, fromName:from, toSocketID:to.socketID, fromSocketID:socket.id } );
                        setAllMessages( [ ...allMessages, { from, to, message } ] );

                        setMessage( '' );

                    } }
                    onChange={ (e) => setMessage( e.target.value ) }
                    className='flex flex-row items-center p-2 justify-between w-full'>
                        <InputBase
                        name='message'
                        fullWidth
                        value={ message }
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
