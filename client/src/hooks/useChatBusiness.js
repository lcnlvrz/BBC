import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../socket/config';


export const useChatBusiness = () => {

    const user = useSelector(state => state.user);

    const [allMessages, setAllMessages] = useState( {} );
    

    window.onbeforeunload = (e) => {
    
        socket.emit( 'businessOffline', { userID:user.userID, username:user.username, socketID:user.socketID } );

    };

    useEffect(() => {
        
        if ( !user.isLoading && user.userID ) {

            socket.emit( 'businessOnline', { userID:user.userID, username:user.username, socketID:socket.id } );

            socket.on( 'receiveMessage', ( data ) => {

                const { fromSocketID } = data;


                setAllMessages( messages => ({ ...messages, [ fromSocketID ]:messages[fromSocketID] ? [ ...messages[ fromSocketID ], data ] : [data] }) );


            } );


        };
        
        return () => {

            socket.emit( 'businessOffline', { userID:user.userID, username:user.username, socketID:user.socketID } );

        };

    }, [ user ]);

    return { allMessages, setAllMessages };

};