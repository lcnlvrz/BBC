import React from 'react';
import { Avatar, Fade } from '@material-ui/core';
import AvatarStatus from '../../../reusableComponents/AvatarStatus.js';
import { useSelector } from 'react-redux';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import { defaultTransiton } from '../../../../constants/styles.js';
import moment from 'moment';
import { Fragment } from 'react';

const ListAllMessages = ( props ) => {

    const { allMessages, setIsShowOneChat, setTo, mobileResolution } = props;

    console.log( allMessages ); 

    const user = useSelector(state => state.user);

    const messagesKeys = Object.keys( allMessages );

    const numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

    return(
        <Fade in={ true }>
            <div className='h-screen overflow-hidden'>
                <div className={ `flex flex-row justify-between items-center bg-gray-600 w-full p-5` }>
                    <AvatarStatus
                    status={ true }
                    spacingBadge={ 2 }
                    spacingAvatar={ 7 }
                    souceProfilePhoto={ user.profilePhoto }
                    vertical='bottom'
                    horizontal='right'
                    /> 
                    <h1 className='text-2xl font-light text-white'> CHAT </h1>
                    <h1 className='opacity-0'> CHAT </h1>
                </div>
                <div 
                className={ `clients__chat  bg-gray-500 flex-1 overflow-auto max-h-full` }>
                    {  messagesKeys.length > 0 && messagesKeys.map( ( message, index ) => (

                        <div 
                        onClick={ () => {

                            setIsShowOneChat( true );
                            setTo( { socketID:allMessages[message][0].fromSocketID } );

                        } }
                        key={ index }
                        style={ defaultTransiton }
                        className='one__user flex flex-row space-x-2 items-center hover:shadow-2xl cursor-pointer rounded-2xl p-5'>
                            <Avatar
                            src={ allMessages[ message ][0].image ? allMessages[ message ][0].image : '' }
                            />
                            <div className='flex flex-col items-start w-full'>
                                <div className='flex flex-row w-full justify-between'>
                                    <div className='element'>
                                        <h3 className='font-semibold text-green-400 truncate w-full'> 
                                        { allMessages[ message ][0].fromName }
                                        </h3>
                                    </div>
                                    <h3 className='bg-green-300 rounded-full px-2'> 
                                         { allMessages[ message ].length } 
                                    </h3>
                                </div>
                                <div className='element'>
                                    <h4 className='font-semibold text-white truncate w-full'> 
                                    { allMessages[ message ].map( ( lastMessage, index ) => index + 1 === allMessages[ message ].length && lastMessage.message ) }
                                    </h4>
                                </div>
                                <div className='flex flex-row justify-between w-full'>
                                    <h3 className='text-xs opacity-0'> 
                                        10 min ago 
                                    </h3>
                                    <h3 className='text-xs text-gray-400'> 
                                    { allMessages[ message ].map( ( lastMessage, index ) => index + 1 === allMessages[ message ].length && moment( lastMessage.message.sentAt ).fromNow() ) } 
                                    </h3>

                                </div>
                            </div>
                        </div>
                    ) ) }
                </div>
            </div>
        </Fade>
    );
};

export default ListAllMessages;
