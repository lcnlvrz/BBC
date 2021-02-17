import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { preSubmitCreateAccount } from '../helpers/preSubmit';

export const useSignUp = () => {

    const history = useHistory();

    const [isLoading, setIsLoading] = useState( false );

    const [alertFetch, setAlertFetch] = useState( { type:'', message:'' } );

    const [cancelToken, setCancelToken] = useState( null );

    const validateAndSignUp = ( data, e ) => {

        e.preventDefault();

        const { businessName, username, password, repeatPassword, email, otp } = data;

        const isFormValid = preSubmitCreateAccount( data, setAlertFetch );

        if ( !isFormValid ) return false;

        const objectUser = { businessName, username, password, repeatPassword, email, otp };

        setIsLoading( true );

        const cancelTokenInstance = axiosInstance.CancelToken.source();

        setCancelToken( cancelTokenInstance );

        axiosInstance.post( '/user', objectUser, { cancelToken:cancelTokenInstance.token } )
        .then( () => history.push( '/sign-in/?account__created=true' ) )
        .catch( (err) => {

            if ( axiosInstance.isCancel( err ) ) return console.log( 'Request canceled' );

            setIsLoading( false );
            
            if ( err.response.data.errorCode ) return setAlertFetch( { type:err.response.data.errorCode, message:err.response.data.message } );

            setAlertFetch( { type:'general', message:'Error from server' } );

        } );


    };

    useEffect(() => {

        return () => {

            if ( cancelToken ) cancelToken.cancel();

        };
        
    }, [ cancelToken ]);

    return { isLoading, alertFetch, validateAndSignUp };

};