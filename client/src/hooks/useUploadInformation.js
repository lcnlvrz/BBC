import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateInfo } from '../actions/user';
import axiosInstance from '../api/axiosConfig';
import { getToken } from '../helpers/getToken';


export const useUploadInformation = () => {

    const [alert, setAlert] = useState( { type:'', severity:'', message:'' } );

    const [inputData, setInputData] = useState( null );

    const [isLoading, setIsLoading] = useState( false );

    const [cancelToken, setCancelToken] = useState( null );

    const dispatch = useDispatch();

    useEffect(() => {

        if ( inputData ) {


            setAlert( { type:'', severity:'', message:'' } );

            if ( !inputData.businessName || !inputData.mainPresentationOne || !inputData.mainPresentationTwo || !inputData.footerSectionOne || !inputData.footerSectionTwo || !inputData.footerLastLine || !inputData.footerTitle ) return setAlert( { type:'incomplete', severity:'error', message:'Fill out all the information' } );

            const token = getToken( dispatch );

            if ( !token ) return setAlert( { type:'incomplete', severity:'error', message:"Your token isn't valid" } );

            setIsLoading( true );

            const cancelTokenFunction = axiosInstance.CancelToken.source();

            setCancelToken( cancelTokenFunction );

            axiosInstance.put( '/info-business', inputData, { headers:{ authorization:token }, cancelToken:cancelTokenFunction.token })
            .then( (response) => {

                setIsLoading( false );

                dispatch( updateInfo( response.data.newInfo ) );

            } )
            .catch( (err) => {

                if ( axiosInstance.isCancel( err ) ) return console.log( 'request canceled by user' );

                setIsLoading( false );

            } );
        };
        
    }, [ inputData, dispatch ]);

    return { setInputData, alert, setAlert, cancelToken, isLoading };

};