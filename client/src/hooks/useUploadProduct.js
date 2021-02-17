import { useState, useEffect } from 'react';
import { getToken } from '../helpers/getToken';
import { preSubmitPublishProduct } from '../helpers/preSubmit';
import { useDispatch } from 'react-redux';
import axiosInstance from '../api/axiosConfig';
import axios from 'axios';
import { uploadOneProduct } from '../actions/user';
import { initialStateInputAddProduct } from '../constants/content';

export const useUploadProduct = () => {

    const dispatch = useDispatch();

    const [alert, setAlert] = useState( { type:'', message:'', severity:'' } );
    const [cancelToken, setCancelToken] = useState( null );
    const [isSuccess, setIsSuccess] = useState( false );
    const [isLoading, setIsLoading] = useState( false );
    const [cancelTokenCloudinary, setCancelTokenCloudinary] = useState( null );
    const [input, setInput] = useState( initialStateInputAddProduct );
    const [imagePreview, setImagePreview] = useState( '' );

    const uploadProduct = ( data, e ) => {

        e.preventDefault();

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

                setInput( initialStateInputAddProduct );

                dispatch( uploadOneProduct( response.data.newProduct ) );

                setAlert({ type:'image', message:"Product uploaded successfully", severity:'success' });

            } )
            .catch( (err) => {

                setIsLoading( false );

                setAlert({ type:'image', message:'Error from server to store the product', severity:'error' });


            } );

        } )
        .catch( ( err ) => {

            if ( axios.isCancel( err ) ) return console.log( 'Request canceled by user' );
            
            setAlert({ type:'image', message:"Error from server to upload the product's photo", severity:'error' });

        } );

    };

    const onChangeForm = (e) => {

        if ( e.target.name === 'image' && e.target.files[0].size > 1000000 ) return setAlert( { type:'image', message:'Image so heavy. Try with one less size', severity:'error' } );

        if ( e.target.name === 'image' ) return setInput( { ...input, image:e.target.files[ 0 ] } );

        setInput( { ...input, [ e.target.name ]:e.target.value } );

    };

    const onChangeInputFile = ( e ) => {

        if ( e.target.files[0].size > 1000000 ) return setAlert( { type:'image', message:'Image so heavy. Try with one less size', severity:'error' } );

        const imagePreview = URL.createObjectURL( e.target.files[0] );
        setImagePreview( imagePreview );

    };


    useEffect(() => {
        
        return () => { 

            if ( cancelToken ) cancelToken.cancel();
            if ( cancelTokenCloudinary ) cancelTokenCloudinary.cancel();

        };
    
    }, [ cancelToken, cancelTokenCloudinary ]);


    return { alert, setAlert, isLoading, cancelTokenCloudinary, isSuccess, uploadProduct, input, setInput, onChangeForm, imagePreview, onChangeInputFile };

};