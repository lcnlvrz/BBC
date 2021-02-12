import { useState, useEffect, useRef } from 'react';
import { getToken } from '../helpers/getToken';
import { preSubmitPublishProduct } from '../helpers/preSubmit';
import { useDispatch } from 'react-redux';
import axiosInstance from '../api/axiosConfig';
import axios from 'axios';
import { uploadOneProduct } from '../actions/user';

export const useUploadProduct = () => {

    const dispatch = useDispatch();

    const [alert, setAlert] = useState( { type:'', message:'', severity:'' } );

    const [cancelToken, setCancelToken] = useState( null );

    const [data, setData] = useState( null );

    const [isSuccess, setIsSuccess] = useState( false );

    const [isLoading, setIsLoading] = useState( false );

    const [cancelTokenCloudinary, setCancelTokenCloudinary] = useState( null );

    useEffect(() => {

        if ( data ) {

            setIsSuccess( false );

            setAlert( { type:'', message:'', severity:'' } );

            const validation = preSubmitPublishProduct( data, setAlert );

            if ( !validation ) return false;

            const token = getToken( dispatch );

            if ( !token ) return setAlert( { type:'token', message:"The token isn't valid", severity:'error' } );

            const cancelTokenFunction = axiosInstance.CancelToken.source();

            setCancelToken( cancelTokenFunction );

            setIsLoading( true );

            const formData = new FormData();

            formData.append( 'file', data.image );
            formData.append( 'upload_preset', 'lvpkg390' );

            const sourceToken = axios.CancelToken.source();

            setCancelTokenCloudinary( sourceToken );

            setIsLoading( true );

            axios.post( 'https://api.cloudinary.com/v1_1/lcnlvrz/image/upload', formData, { cancelToken:sourceToken.token })
            .then( (response) => {

                const { secure_url } = response.data;

                axiosInstance.post( '/product', { ...data, image:secure_url }, { headers:{ authorization:token }, cancelToken:cancelTokenFunction.token } )
                .then( (response) => {

                    setIsLoading( false );

                    dispatch( uploadOneProduct( response.data.newProduct ) );

    
                } )
                .catch( (err) => {
    
                    setIsLoading( false );

                    console.log( err.response );

                    setAlert({ type:'image', message:'Error from server to store the product', severity:'error' });
    
                } );

            } )
            .catch( ( err ) => {

                if ( axios.isCancel( err ) ) return console.log( 'Request canceled by user' );

                console.log( err.response );
                
                setAlert({ type:'image', message:"Error from server to upload the product's photo", severity:'error' });

            } );

        };
        
    }, [ data, dispatch ]);

    return { alert, cancelToken, setData, setAlert, isLoading, cancelTokenCloudinary, isSuccess };

};