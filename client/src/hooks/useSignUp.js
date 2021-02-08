import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { preSubmitCreateAccount } from '../helpers/preSubmit';

export const useSignUp = () => {

    const history = useHistory();

    const [data, setData] = useState( null );

    const [isLoading, setIsLoading] = useState( false );

    const [alertFetch, setAlertFetch] = useState( { type:'', message:'' } );

    useEffect(() => {

        if ( data ) {

            const { businessName, username, password, repeatPassword, email, otp } = data;

            const isFormValid = preSubmitCreateAccount( data, setAlertFetch );

            if ( !isFormValid ) return false;

            const objectUser = { businessName, username, password, repeatPassword, email, otp };

            setIsLoading( true );

            axiosInstance.post( '/user', objectUser )
            .then( (response) => {

                setIsLoading( false );

                history.push( '/sign-in/?account__created=true' );


            } )
            .catch( (err) => {

                setIsLoading( false );

                if ( axiosInstance.isCancel( err ) ) return console.log( 'Request canceled' );

                if ( err.response.data.errorCode ) return setAlertFetch( { type:err.response.data.errorCode, message:err.response.data.message } );

                setAlertFetch( { type:'general', message:'Error from server' } );

            } );

        };  
                
    }, [ data, history ]);

    return { isLoading, alertFetch, setData };

};