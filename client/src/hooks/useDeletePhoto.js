import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBanner, deleteBannerSectionProducts, deleteProfilePhoto } from '../actions/user';
import axiosInstance from '../api/axiosConfig';
import { getToken } from '../helpers/getToken';

export const useDeletePhoto = () => {
 
    const [isLoading, setIsLoading] = useState( false );

    const dispatch = useDispatch();

    const [alertFetch, setAlertFetch] = useState( { type:'', message:'', severity:'' } );

    const [deletePhoto, setDeletePhoto] = useState( { isStartDelete:false, endPoint:null } );

    const [cancelToken, setCancelToken] = useState( null );

    useEffect(() => {

     if ( deletePhoto.isStartDelete ) {

        const token = getToken( dispatch );

        if ( !token ) return setAlertFetch( { type:'tokenInvalid', message:"The token isn't valid" } );

        const cancelTokenFunction = axiosInstance.CancelToken.source();

        setCancelToken( cancelTokenFunction );

        setIsLoading( true );

        axiosInstance.delete( deletePhoto.endPoint, { headers:{ authorization:token }, cancelToken:cancelTokenFunction.token } )
        .then( ( response ) => {

            console.log( deletePhoto.endPoint );

            setIsLoading( false );

            if ( deletePhoto.endPoint === '/delete-profilePhoto' ) dispatch( deleteProfilePhoto() );

            if ( deletePhoto.endPoint === '/delete-banner' ) dispatch( deleteBanner() );

            if ( deletePhoto.endPoint === '/delete-bannerSection' ) dispatch( deleteBannerSectionProducts() );

        } )
        .catch( (err) => {

            console.log( err.response );

            if ( axiosInstance.isCancel( err ) ) return console.log( 'request canceled by user' );

            setIsLoading( false );

            setAlertFetch( { type:'deletePhoto', message:'Error to delete the banner. Try again', severity:'error' } );

        } );

     };       
        
    }, [ deletePhoto, dispatch ]);


    return { isLoading, setDeletePhoto, cancelToken, alertFetch, setAlertFetch };

};