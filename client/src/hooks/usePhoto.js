import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../api/axiosConfig';
import { getToken } from '../helpers/getToken';
import { useDispatch } from 'react-redux';
import { setBanner, setProfilePhoto } from '../actions/user';


export const usePhoto = () => {

    const dispatch = useDispatch();

    const [photo, setPhoto] = useState( { tempURL:null, file:null } );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const [isLoading, setIsLoading] = useState( false );

    const [data, setData] = useState( null );

    const [upload, setUpload] = useState( { isStartFetch:false, endPoint:'' } );

    const [token, setToken] = useState( null );

    const [cancelTokenCloudinary, setCancelTokenCloudinary] = useState( null );

    const [cancelTokenServer, setCancelTokenServer] = useState( null );
    

    useEffect(() => {

        if ( data ) {

            const token = getToken();

            if ( !token ) return false;

            setToken( token );

            setAlert( { type:'', message:'' } );

            if ( data.size > 1000000 ) return setAlert( { type:'image', message:'Image so heavy. Try with one less size', severity:'error' } );

            const tempURL = URL.createObjectURL( data );

            setPhoto( { tempURL, file:data } );

        };
        
    }, [ data ]);


    useEffect(() => {

        if ( upload.isStartFetch ) {

            const formData = new FormData();

            formData.append( 'file', data );
            formData.append( 'upload_preset', 'lvpkg390' );

            setIsLoading( true );

            const sourceToken = axios.CancelToken.source();

            setCancelTokenCloudinary( sourceToken );

            axios.post( 'https://api.cloudinary.com/v1_1/lcnlvrz/image/upload', formData, { cancelToken:sourceToken.token })
            .then( (response) => {

                const { secure_url } = response.data;

                const sourceTokenServer = axiosInstance.CancelToken.source();

                setCancelTokenServer( sourceTokenServer );

                axiosInstance.put( upload.endPoint, { url:secure_url }, { headers:{ authorization:token }, cancelToken:sourceTokenServer.token } )
                .then( (response) => {

                    setIsLoading( false );

                    setAlert( { type:'image', severity:'success', message:'Profile photo updated successfully' } );

                    if ( upload.endPoint === '/profile-photo' ) dispatch( setProfilePhoto( secure_url ) );

                    if ( upload.endPoint === '/banner' ) dispatch( setBanner( secure_url ) );

                    

                } )
                .catch( (err) => {

                    setIsLoading( false );

                    if ( axiosInstance.isCancel( err ) ) {

                        setAlert( { type:'image', severity:'error', message:'You canceled the operation' } );
                        setPhoto({ tempURL:null, file:null });


                    } else {

                        setAlert( { type:'image', severity:'error', message:'Error from server to save photo' } );
                    };           
                } );
        

            } )
            .catch( (err) => {

                setIsLoading( false );

                if ( axios.isCancel( err ) ) {

                    console.log( 'Request canceled' );
                    setAlert( { type:'image', severity:'error', message:'You canceled the operation' } );
                    setPhoto({ tempURL:null, file:null });


                } else {

                    setAlert( { type:'image', severity:'error', message:'Error from server to save photo' } );

                };


            } );

        };

        
    }, [ token, dispatch, upload, data ]);



    return { photo, alert, setData, setPhoto, setAlert, setUpload, isLoading, cancelTokenCloudinary, cancelTokenServer };

};