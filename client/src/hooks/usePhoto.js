import { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../api/axiosConfig';
import { getToken } from '../helpers/getToken';
import { useDispatch } from 'react-redux';
import { setBanner, setProfilePhoto, updateBannerSectionProducts } from '../actions/user';


export const usePhoto = () => {

    const dispatch = useDispatch();

    const initialStatePhoto = { tempURL:null, file:null };

    const [photo, setPhoto] = useState( initialStatePhoto );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const [isLoading, setIsLoading] = useState( false );

    const [token, setToken] = useState( null );

    const [cancelTokenCloudinary, setCancelTokenCloudinary] = useState( null );

    const [cancelTokenServer, setCancelTokenServer] = useState( null );

    const validatePhoto = ( data ) => {

        const token = getToken();

        if ( !token ) return false;

        setToken( token );

        setAlert( { type:'', message:'' } );

        if ( data.size > 1000000 ) return setAlert( { type:'image', message:'Image so heavy. Try with one less size', severity:'error' } );

        const tempURL = URL.createObjectURL( data );

        setPhoto( { tempURL, file:data } );

    };

    const uploadPhoto = ( endPoint ) => {

        const formData = new FormData();

        formData.append( 'file', photo.file );
        formData.append( 'upload_preset', 'lvpkg390' );

        setIsLoading( true );

        const sourceToken = axios.CancelToken.source();

        setCancelTokenCloudinary( sourceToken );

        axios.post( 'https://api.cloudinary.com/v1_1/lcnlvrz/image/upload', formData, { cancelToken:sourceToken.token })
        .then( (response) => {

            const { secure_url } = response.data;

            const sourceTokenServer = axiosInstance.CancelToken.source();

            setCancelTokenServer( sourceTokenServer );

            axiosInstance.put( endPoint, { url:secure_url }, { headers:{ authorization:token }, cancelToken:sourceTokenServer.token } )
            .then( () => {

                if ( endPoint === '/profile-photo' ) dispatch( setProfilePhoto( secure_url ) );

                if ( endPoint === '/banner' ) dispatch( setBanner( secure_url ) );

                if ( endPoint === '/banner-section' ) dispatch( updateBannerSectionProducts( secure_url ) ); 
                
                setPhoto( initialStatePhoto );

                setIsLoading( false );

                setAlert( { type:'image', severity:'success', 
                message:`
                ${ endPoint === '/profile-photo' ? 'Profile photo updated successfully' : '' } 
                ${ endPoint === '/banner' ? 'Banner updated successfully' : '' } 
                ${ endPoint === '/banner-section' ? 'Banner section updated successfully' : '' }
                `});

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

        

    return { photo, alert, setPhoto, setAlert, isLoading, cancelTokenCloudinary, cancelTokenServer, validatePhoto, uploadPhoto };

};