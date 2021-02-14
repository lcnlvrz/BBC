import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../socket/config';


export const useChatBusiness = () => {

    const user = useSelector(state => state.user);

    const [allMessages, setAllMessages] = useState( {} );

    const [isTyping, setIsTyping] = useState( false );

    console.log( allMessages );

    
    window.onbeforeunload = (e) => {
    
        socket.emit( 'businessOffline', { userID:user.userID, username:user.username, socketID:user.socketID } );

        socket.disconnect();


    };

    useEffect(() => {

    
        if ( !user.isLoading && user.userID ) {

            socket.connect();

            const socketID = socket.id;

            socket.emit( 'businessOnline', { userID:user.userID, username:user.username, socketID } );

            socket.on( 'receiveMessage', ( data ) => {

                const { message, fromName, sentAt, fromSocketID, image } = data;

                console.log( data );

                setAllMessages( messages => ({ ...messages, [ fromSocketID ]:messages[fromSocketID] ? {  ...messages[ fromSocketID ], lastMessage:{ text:message, sentAt }, messages:[ ...messages[fromSocketID].messages, { message, sentAt, sentBy:fromSocketID } ]  } : { fromName, image, fromSocketID, lastMessage:{ text:message, sentAt }, messages:[ { message, sentAt, sentBy:fromSocketID } ]  } } ) );



            } );

            socket.on( 'otherUserIsTyping', () => {


                setIsTyping( true );

            } );

            socket.on( 'otherUserIsNotTyping', () => {

                setIsTyping( false );


            } );

            socket.on( 'clientDisconnect', clientSocketID => {


                setAllMessages( messages => messages[ clientSocketID ] ? {  ...messages, [ clientSocketID ]:{  ...messages[ clientSocketID ], isLeave:true, messages:[ ...messages[ clientSocketID ].messages, { isLeave:true, message:'Left from chat' } ] } } : [] );


            } );


        };
        
        return () => {

            socket.emit( 'businessOffline', { userID:user.userID, username:user.username, socketID:user.socketID } );

            socket.disconnect();


        };

    }, [ user ]);

    return { allMessages, setAllMessages, socket, isTyping, setIsTyping };

};