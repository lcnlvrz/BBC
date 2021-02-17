import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateSectionProductsText } from '../actions/user';
import axiosInstance from '../api/axiosConfig';
import { getToken } from '../helpers/getToken';

export const useUpdateSectionText = () => {

    const [isLoading, setIsLoading] = useState( false );

    const [cancelToken, setCancelToken] = useState( null );

    const [alert, setAlert] = useState( { type:'', message:'', severity:'' } );

    const [isNewChange, setIsNewChange] = useState( false );

    const dispatch = useDispatch();

    const update = ( data, e ) => {

        e.preventDefault();

        const token = getToken( dispatch );

        if ( !token ) return setAlert( { type:'invalidToken', message:"The token isn't valid", severity:'errror' } );

        const cancelTokenFunction = axiosInstance.CancelToken.source();

        setCancelToken( cancelTokenFunction );

        setIsLoading( true );

        axiosInstance.put( '/title-sectionProducts', { data } , { headers:{ authorization:token }, cancelToken:cancelTokenFunction.token } )
        .then( (response) => {

            dispatch( updateSectionProductsText( response.data.newTitle ) );
            setIsLoading( false );
            setIsNewChange( false );
            setAlert( { message:"Information updated successfully", severity:'success', type:'title' } );


        } )
        .catch( (err) => {

            if ( axiosInstance.isCancel( err ) ) return console.log( 'Request canceled by user' );

            setAlert( { message:err.response.data.message, severity:'error', type:'title' } );

        } );

    };

    useEffect(() => {
        
        return () => { if ( cancelToken ) cancelToken.cancel(); };
        
    }, [ cancelToken ]);

    return { update, isLoading, alert, setAlert, isNewChange, setIsNewChange };

};