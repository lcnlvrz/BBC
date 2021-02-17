import { useState, useRef, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { validateCode } from '../helpers/validations';

export const useValidOTP = () => {

    const [alertFetch, setAlertFetch] = useState( { type:'', message:'' } );

    const [isLoading, setIsLoading] = useState( false );

    const [isSuccess, setIsSuccess] = useState( { fetched:false, success:false } );

    const [initialColorInput, setInitialColorInput] = useState( '#000000' );

    const [cancelToken, setCancelToken] = useState( null );

    const inputEmailRef = useRef( null );

    const validOTP = ( data, e ) => {

        e.preventDefault();

        setAlertFetch( { type:'', message:'' } );

        const isValid = validateCode( Number(data.code) );

        if ( !isValid || data.code.length < 4 ){

            inputEmailRef.current.focus();
            setInitialColorInput( '#FF0000' );

            setAlertFetch( { type:'code', message:"The code is a number with 4 digits" } );

            return false;
        };

        setIsLoading( true );

        const cancelTokenInstance = axiosInstance.CancelToken.source();

        setCancelToken( cancelTokenInstance );

        axiosInstance.post( '/validate-otp', { email:data.email, otp:Number(data.code) }, { cancelToken:cancelTokenInstance.token } )
        .then( () => {

            setIsLoading( false );

            setIsSuccess( { fetched:true, success:true } );

        } )
        .catch( (err) => {

            if ( axiosInstance.isCancel( err )) return console.log( 'request canceled' ); 

            setIsLoading( false );
            setAlertFetch( { type:'code', message:err.response.data.message } );

        } );

    };

    useEffect(() => {

        return () => {
            
            if ( cancelToken ) cancelToken.cancel();

        };
        
    }, [ cancelToken ]);


    return { alertFetch, isLoading, isSuccess, initialColorInput, inputEmailRef, validOTP };

    
};