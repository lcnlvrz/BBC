import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosConfig";
import { preSubmitSignIn } from "../helpers/preSubmit";
import { setUser } from "../actions/user";


export const useSignIn = ( ) => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState( false );

    const [alertFetch, setAlertFetch] = useState( { type:'', message:'' } );

    const [data, setData] = useState( null );

    const [cancelToken, setCancelToken] = useState( null );

    useEffect(() => {

        if ( data ) {
            
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

                setIsLoading( false );

                if ( axiosInstance.isCancel( err )) return console.log( 'request canceled' );

                setAlertFetch( { type:'user', message:err.response.data.message } );
  
                
            } );

        };

        
    }, [ dispatch, data ]);

    return { alertFetch, isLoading, cancelToken, setData };

};