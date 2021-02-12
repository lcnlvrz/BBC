import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../socket/config';

export const useChatClient = () => {

    const [input, setInput] = useState( { completeName:'' } );

    const [isFormFillOut, setIsFormFillOut] = useState( false );

    const [isOnline, setIsOnline] = useState( false );

    const [businessToSendMSG, setBusinessToSendMSG] = useState( null );

    const [allMessages, setAllMessages] = useState( [] );

    const currentSearch = useSelector(state => state.currentSearch);

    useEffect(() => {

        if ( !currentSearch.isLoading && currentSearch.business ) {

            socket.emit( 'getStatusBusiness', { searchingForUsername:currentSearch.username, searchingForID:currentSearch._id, socketID:socket.id } );

            socket.on( 'businesStatus', ( response ) => {

                const { isOnline, businessData } = response;

                setIsOnline( isOnline );

                setBusinessToSendMSG( businessData );
                

            } );

            socket.on( 'receiveMessage', message => {

                console.log( message );

            } )

        };
    
    }, [ currentSearch ]);

    return { input, setInput, isFormFillOut, setIsFormFillOut, isOnline, currentSearch, businessToSendMSG, socket, setAllMessages, allMessages };

};