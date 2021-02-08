import { useState, useRef, useEffect } from 'react';
import emailValidator from 'email-validator';
import axiosInstance from '../api/axiosConfig';

export const useSendOTP = ( ) => {

    const [alertFetch, setAlertFetch] = useState( { type:'', message:'' } );

    const [initialColorInput, setInitialColorInput] = useState('#000000');

    const [data, setData] = useState( null );

    const [isLoading, setIsLoading] = useState( false );

    const [cancelToken, setCancelToken] = useState( null );

    const [isSuccess, setIsSuccess] = useState( { fetched:false, success:false } );

    const inputEmailRef = useRef( null );

    useEffect(() => {

        if ( data ) {

            setInitialColorInput( '#000000' );
            setAlertFetch( { type:'', message:'' } );

            const isValid = emailValidator.validate( data.email );

            if ( !isValid ){

                inputEmailRef.current.focus();
                setInitialColorInput( '#FF0000' );

                setAlertFetch( { type:'email', message:"The email isn't valid" } );

                return false;
            };

            setIsLoading( true );

            const tokenToCancel = axiosInstance.CancelToken.source();

            setCancelToken( tokenToCancel );

            axiosInstance.post( '/temporary-user', { email:data.email }, { cancelToken:tokenToCancel.token } )
            .then( () => {

                setIsLoading( false );
                setIsSuccess( { fetched:true, success:true } );

            } )
            .catch( (err) => {

                if ( axiosInstance.isCancel( err )) return console.log( 'request canceled' ); 

                setIsLoading( false );
                setAlertFetch( { type:'email', message:err.response.data.message } );
                setIsSuccess( { fetched:true, success:false } );

            } );

        };
                
    }, [ data ]);

    return { alertFetch, initialColorInput, isLoading, cancelToken, isSuccess, setData, inputEmailRef };

    
};