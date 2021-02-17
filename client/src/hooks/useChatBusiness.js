import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../socket/config';
import moment from 'moment';


export const useChatBusiness = () => {

    const user = useSelector(state => state.user);

    const [allMessages, setAllMessages] = useState( {} );

    const [isTyping, setIsTyping] = useState( false );

    const [to, setTo] = useState('');

    const [isShowOneChat, setIsShowOneChat] = useState( false );

    const [message, setMessage] = useState('');

    const [media, setMedia] = useState( null );

    const [alert, setAlert] = useState( { type:'', message:'', severity:'' } );
    
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

                setAllMessages( messages => ({ ...messages, [ fromSocketID ]:messages[fromSocketID] ? {  ...messages[ fromSocketID ], lastMessage:{ text:message, sentAt }, messages:[ ...messages[fromSocketID].messages, { message, sentAt, sentBy:fromSocketID } ], viewed:{ quantity:messages[fromSocketID].viewed ? messages[fromSocketID].viewed.quantity + 1 : 1 } } : { fromName, image, fromSocketID, lastMessage:{ text:message, sentAt }, messages:[ { message, sentAt, sentBy:fromSocketID } ], viewed:{ doubleCheck:false, quantity: 1 }  } } ) );

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

            socket.on( 'media', data => {

                const { fromSocketID, media, sentAt, image, fromName } = data;

                setAllMessages( messages => ({ ...messages, [ fromSocketID ]:messages[fromSocketID] ? {  ...messages[ fromSocketID ], lastMessage:{ text:'Message type media', sentAt }, messages:[ ...messages[fromSocketID].messages, { media, sentAt, sentBy:fromSocketID, isMedia:true } ], viewed:{ quantity:messages[fromSocketID].viewed ? messages[fromSocketID].viewed.quantity + 1 : 1 } } : { fromName, image, fromSocketID, lastMessage:{ text:'Message type media', sentAt }, messages:[ { media, sentAt, sentBy:fromSocketID, isMedia:true } ], viewed:{ doubleCheck:false, quantity: 1 }  } } ) );

            } );


        };
        
        return () => {

            socket.emit( 'businessOffline', { userID:user.userID, username:user.username, socketID:user.socketID } );

            socket.disconnect();


        };

    }, [ user ]);

    const clearChat = () => {

        setIsShowOneChat( false );

        const copyAllMessages = { ...allMessages };

        delete copyAllMessages[ to.socketID ];

        setAllMessages( copyAllMessages );

    };

    const sendMessageBusiness = ( e ) => {

        e.preventDefault();

        if ( !message ) return false;

        setTimeout(() => {

            socket.emit( 'stopTyping', to.socketID );
            socket.emit( 'sendMessage', { fromName:user.businessName, message, toSocketID:to.socketID, fromSocketID:socket.id, image:user.profilePhoto } );

            setMessage( '' );

            const sentAt = moment().format();

            setAllMessages( { ...allMessages, [ to.socketID ]: {  ...allMessages[ to.socketID ], messages:[ ...allMessages[to.socketID].messages, { message, sentAt, sentBy:socket.id } ]  }  } );

           
            
        }, 100);

    };

    const sendMediaBusiness = () => {

        if ( !media ) return setAlert( { type:'empty', message:'The image is empty', severity:'error' } );

        socket.emit( 'media', { toSocketID:to.socketID, media, fromName:user.businessName, image:user.profilePhoto } );

        setMedia( null );

        const sentAt = moment().format();

        setAllMessages( { ...allMessages, [ to.socketID ]: {  ...allMessages[ to.socketID ], messages:[ ...allMessages[to.socketID].messages, { media, sentAt, sentBy:socket.id, isMedia:true } ]  }  } );

    };

    return { allMessages, setAllMessages, socket, isTyping, setIsTyping, to, setTo, isShowOneChat, setIsShowOneChat, clearChat, message, setMessage, sendMessageBusiness, media, setMedia, alert, setAlert, sendMediaBusiness };

};