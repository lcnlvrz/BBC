import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Fade } from '@material-ui/core';
import { useChatBusiness } from '../../../hooks/useChatBusiness';
import ListAllMessages from './ListAllMessages';
import Chat from '../../reusableComponents/Chat/Chat';
import { Link } from 'react-router-dom';
import LeftMenu from '../../reusableComponents/LeftMenu';
import { useSelector } from 'react-redux';


const LiveChat = () => {
    
    const { allMessages, setAllMessages, socket } = useChatBusiness();

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const [to, setTo] = useState( '' );

    const user = useSelector(state => state.user);

    const [isShowOneChat, setIsShowOneChat] = useState( false );

    const [isChange, setIsChange] = useState( [] );


    if ( mobileResolution ) {

        if ( isShowOneChat ) return <Chat socket={ socket } setIsShowOneChat={ setIsShowOneChat } from={ socket.id } to={ to } image={ user.profilePhoto }/>;

        return <ListAllMessages 
        setTo={ setTo }
        mobileResolution={ mobileResolution } 
        allMessages={ allMessages } 
        setIsShowOneChat={ setIsShowOneChat }/>

    }; 

   

    return (
        <Fade in={ true }>     
            <div className='w-full flex flex-row justify-evenly flex-wrap'>
                <div className='left__part  text-white w-2/5 bg-gray-500'>
                    <ListAllMessages 
                    mobileResolution={ mobileResolution }
                    setTo={ setTo }
                    allMessages={ allMessages } 
                    setIsShowOneChat={ setIsShowOneChat }/>
                </div>
                <div className='right__part rounded w-3/5'>
                    <Chat 
                    image={ user.profilePhoto }
                    socket={ socket }
                    setIsShowOneChat={ setIsShowOneChat }
                    from={ user.businessName } 
                    to={ to } 
                    allMessages={ allMessages } 
                    setAllMessages={ setAllMessages }/>
                </div>   
            </div>
        </Fade>
    );
};

export default LiveChat;
