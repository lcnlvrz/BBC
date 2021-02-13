import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../socket/config';


export const useChatBusiness = () => {

    const user = useSelector(state => state.user);

    const [allMessages, setAllMessages] = useState( {} );

    console.log( allMessages );
    

    window.onbeforeunload = (e) => {
    
        socket.emit( 'businessOffline', { userID:user.userID, username:user.username, socketID:user.socketID } );

        socket.disconnect();

        console.log( 'BUSINESS DISCONNECT!' );

    };

    useEffect(() => {

    
        if ( !user.isLoading && user.userID ) {

            socket.connect();

            const socketID = socket.id;

            socket.emit( 'businessOnline', { userID:user.userID, username:user.username, socketID } );

            socket.on( 'receiveMessage', ( data ) => {

                const { fromSocketID } = data;

                console.log( data );

                setAllMessages( messages => ({ ...messages, [ fromSocketID ]:messages[fromSocketID] ? [ ...messages[ fromSocketID ], data ] : [data] }) );


            } );


        };
        
        return () => {

            socket.emit( 'businessOffline', { userID:user.userID, username:user.username, socketID:user.socketID } );

            socket.disconnect();

            console.log( 'BUSINESS DISCONNECT!' );

        };

    }, [ user ]);

    return { allMessages, setAllMessages, socket };

};