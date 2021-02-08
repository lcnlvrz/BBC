import { useState, useRef, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { validateCode } from '../helpers/validations';

export const useValidOTP = () => {

    const [alertFetch, setAlertFetch] = useState( { type:'', message:'' } );

    const [data, setData] = useState( null );

    const [isLoading, setIsLoading] = useState( false );

    const [isSuccess, setIsSuccess] = useState( { fetched:false, success:false } );

    const [initialColorInput, setInitialColorInput] = useState( '#000000' );

    const inputEmailRef = useRef( null );

    useEffect(() => {

        if ( data ) {

            setAlertFetch( { type:'', message:'' } );

            const isValid = validateCode( Number(data.code) );

            if ( !isValid || data.code.length < 4 ){

                inputEmailRef.current.focus();
                setInitialColorInput( '#FF0000' );

                setAlertFetch( { type:'code', message:"The code is a number with 4 digits" } );

                return false;
            };

            setIsLoading( true );

            axiosInstance.post( '/validate-otp', { email:data.email, otp:Number(data.code) } )
            .then( ( ) => {

                setIsLoading( false );

                setIsSuccess( { fetched:true, success:true } );

            } )
            .catch( (err) => {

                if ( axiosInstance.isCancel( err )) return console.log( 'request canceled' ); 

                setIsLoading( false );
                setAlertFetch( { type:'code', message:err.response.data.message } );

            } );

        };
            
    }, [ data ]);

    return { alertFetch, setData, isLoading, isSuccess, initialColorInput, inputEmailRef };

    
};