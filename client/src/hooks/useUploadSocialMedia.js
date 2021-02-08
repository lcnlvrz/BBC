import { useState, useEffect } from 'react';
import { getToken } from '../helpers/getToken';
import { useDispatch } from 'react-redux';
import axiosInstance from '../api/axiosConfig';
import { updateSocialMedia } from '../actions/user';

export const useUploadSocialMedia = () => {

    const [isLoading, setIsLoading] = useState( false );

    const [cancelToken, setCancelToken] = useState( null );

    const [data, setData] = useState( null );

    const [alert, setAlert] = useState( { type:'', severity:'', message:'' } );

    const dispatch = useDispatch();

    useEffect(() => {

        if ( data ) {

            const token = getToken( dispatch );

            if ( !token ) return setAlert( { type:'tokenInvalid', severity:'error', message:"The token isn't valid" } );

            const cancelTokenFunction = axiosInstance.CancelToken.source();

            setCancelToken( cancelTokenFunction );

            setIsLoading( true );

            axiosInstance.put( '/socialMedia', data, { headers:{ authorization:token }, cancelToken:cancelTokenFunction.token } )
            .then( (response) => {

                setIsLoading( false );

                dispatch( updateSocialMedia( response.data.newSocialMedia ) );  

            } )
            .catch( (err) => {

                if ( axiosInstance.isCancel( err ) ) return console.log( 'Request canceled by user' );

                console.log( err.response );

                setIsLoading( false );

            } ); 

        };
        
    }, [ data, dispatch ]);


    return { setData, isLoading, setAlert, cancelToken, alert };

};