import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosConfig";
import { preSubmitSignIn } from "../helpers/preSubmit";
import { setUser } from "../actions/user";


export const useSignIn = ( ) => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState( false );

    const [alertFetch, setAlertFetch] = useState( { type:'', message:'' } );

    const [cancelToken, setCancelToken] = useState( null );

    const validateCredentials = ( data ) => {

        const isFormValid = preSubmitSignIn( data, setAlertFetch );

        if ( !isFormValid ) return false;

        const tokenToCancel = axiosInstance.CancelToken.source();

        setCancelToken( tokenToCancel );

        setIsLoading( true );

        axiosInstance.post( '/sign-in', data, { cancelToken:tokenToCancel.token } )
        .then( (response) => {

            setIsLoading( false );

            localStorage.setItem( 'token', response.data.token );

            dispatch( setUser( response.data.userData ) );

        } )
        .catch( (err) => {

            if ( axiosInstance.isCancel( err )) return console.log( 'request canceled' );

            setIsLoading( false );

            setAlertFetch( { type:'user', message:err.response.data.message } );

            
        } );

    };

    useEffect(() => {

        return () => {

            if ( cancelToken ) cancelToken.cancel();

        };
         
    }, [ cancelToken ]);
    

    return { alertFetch, isLoading, validateCredentials };

};