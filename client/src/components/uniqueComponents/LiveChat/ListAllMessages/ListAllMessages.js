import React from 'react';
import { Avatar } from '@material-ui/core';
import AvatarStatus from '../../../reusableComponents/AvatarStatus.js';
import { useSelector } from 'react-redux';
import { defaultTransiton } from '../../../../constants/styles.js';
import PropagateLoader from "react-spinners/PropagateLoader";
import HeaderMobile from '../../HeaderForBusiness/HeaderMobile/HeaderMobile.js';
import TimeAgoInterval from '../../../reusableComponents/TimeAgoInterval/index.js';

const ListAllMessages = ( props ) => {

    const { allMessages, setIsShowOneChat, setTo, mobileResolution, isShowOneChat, to, setAllMessages, socket } = props;

    const user = useSelector(state => state.user);

    const messagesKeys = Object.keys( allMessages );

    const onClickMessage = ( client ) => {

        if ( !isShowOneChat )  setIsShowOneChat( true );

        if ( to.socketID !== client ) {

            const clientSocketID = allMessages[ client ].fromSocketID;

            setTo( { socketID:clientSocketID } );

            setAllMessages( { ...allMessages, [ clientSocketID ]:{ ...allMessages[ clientSocketID ], viewed:{ quantity:0, doubleCheck:true } } } );

            socket.emit( 'notificateMessagesViewedToClient', clientSocketID );
            socket.emit( 'notificateMessagesNotViewedToClient', to.socketID );

        };

    };

    return(
        <div className='h-screen overflow-hidden bg-gray-500'>
            <div className={ `flex flex-row justify-between items-center w-full p-5 bg-gray-600` }>
                <AvatarStatus
                status={ true }
                spacingBadge={ 2 }
                spacingAvatar={ 7 }
                souceProfilePhoto={ user.profilePhoto }
                vertical='bottom'
                horizontal='right'
                /> 
                <h1 className='text-2xl font-light text-white'> CHAT </h1>
                { mobileResolution 
                ? 
                <HeaderMobile color='white' isOnlyButton={ true }/> 
                :
                <h1 className='opacity-0 ghost__filler'> CHAT </h1>
                }
            </div>
            <div 
            className={ `clients__chat  bg-gray-500 flex-1 overflow-auto max-h-full` }>
                {  messagesKeys.length > 0 ? messagesKeys.map( ( client, index ) => (

                    <div 
                    onClick={ () => onClickMessage( client ) }
                    key={ index }
                    style={ defaultTransiton }
                    className='one__user flex flex-row space-x-2 items-center hover:bg-gray-700 cursor-pointer  p-5'>
                        <Avatar
                        src={ allMessages[ client ].image }
                        />
                        <div className='flex flex-col items-start w-full'>
                            <div className='flex flex-row w-full justify-between'>
                                <div className='element'>
                                    <h3 className='font-semibold text-green-400 truncate w-full'> 
                                    { allMessages[ client ].fromName }
                                    </h3>
                                </div>
                                { allMessages[ client ].fromSocketID !== to.socketID &&  allMessages[ client ].viewed.quantity > 0 &&
                            
                                    <h3 className='bg-green-300 rounded-full px-2'> 
                                        { allMessages[ client ].viewed.quantity } 
                                    </h3>
                                } 
                            </div>
                            <div className='element'>
                                <h4 className='font-semibold text-white truncate w-full'> 
                                    { allMessages[ client ].lastMessage.text }
                                </h4>
                            </div>
                            <div className='flex flex-row justify-between w-full'>
                                <h3 className='text-xs opacity-0'> 
                                    10 minuts ago
                                </h3>
                                <TimeAgoInterval
                                classes='text-xs text-gray-400'
                                date={ allMessages[ client ].lastMessage.sentAt }
                                />
                            </div>
                        </div>
                    </div>
                ) ) 
                :
                <div 
                style={{ height:'80vh' }}
                className='flex  flex-col justify-center items-center p-2 space-y-5'>
                    <PropagateLoader color='#7aeb7a'/>
                    <h1 className='text-white'> 
                        Waiting for new messages... 
                    </h1>
                </div> 
                }
            </div>
        </div>
    );
};

export default ListAllMessages;
