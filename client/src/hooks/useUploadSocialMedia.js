import { useState, useEffect } from 'react';
import { getToken } from '../helpers/getToken';
import { useDispatch } from 'react-redux';
import axiosInstance from '../api/axiosConfig';
import { updateSocialMedia } from '../actions/user';
import { useSelector } from 'react-redux';
import validator from 'validator';

export const useUploadSocialMedia = () => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState( false );
    const [cancelToken, setCancelToken] = useState( null );
    const [alert, setAlert] = useState( { type:'', severity:'', message:'' } );
    const [input, setInput] = useState( { facebookLink:'https://facebook.com/', twitterLink:'https://twitter.com/', instagramLink:'https://instagram.com/' } );
    const [disable, setDisable] = useState( { facebook:false, instagram:false, twitter:false } );

    useEffect(() => {

        const businessLinks = { instagram:user.instagramLink, facebook:user.facebookLink, twitter:user.twitterLink };

        const businessLinksObject = Object.keys( businessLinks );

        for (let i = 0; i < businessLinksObject.length; i++) {

            const socialMediaValue = businessLinks[ businessLinksObject[ i ] ];
            
            if ( !socialMediaValue ) {

                setDisable( d => ({ ...d, [ `${ businessLinksObject[i] }` ]:true }) );
                setInput( socialMedias => ({ ...socialMedias, [ `${ businessLinksObject[i] }Link` ]:'' }) );

            } else {

                setInput( socialMedias => ({ ...socialMedias, [ `${ businessLinksObject[i] }Link` ]:socialMediaValue }) );
            };
            
        };

    }, [ user ]);

    useEffect(() => {

        return () => { if( cancelToken ) cancelToken.cancel() };
       
    }, [ cancelToken ]);

    const upload = ( data, e, setCloseModal ) => {

        e.preventDefault();

        const token = getToken( dispatch );

        if ( !token ) return setAlert( { type:'tokenInvalid', severity:'error', message:"The token isn't valid" } );

        const cancelTokenFunction = axiosInstance.CancelToken.source();

        setCancelToken( cancelTokenFunction );

        setIsLoading( true );

        axiosInstance.put( '/socialMedia', data, { headers:{ authorization:token }, cancelToken:cancelTokenFunction.token } )
        .then( (response) => {

            setIsLoading( false );
            dispatch( updateSocialMedia( response.data.newSocialMedia ) );  
            setCloseModal( false );

        } )
        .catch( (err) => {

            if ( axiosInstance.isCancel( err ) ) return console.log( 'Request canceled by user' );

            setAlert( { type:'error', message:err.response.data.message, severity:'error' } );

            setIsLoading( false );

        } ); 

    };

    const validateForm = ( e ) => {

        const validation = validator.isURL( e.target.value );

        if ( !validation && e.target.name === 'facebookLink' ) return setInput( { ...input, [ e.target.name ]:`https://facebook.com/${ e.target.value }` } );

        if ( !validation && e.target.name === 'twitterLink' ) return setInput( { ...input, [ e.target.name ]:`https://twitter.com/${ e.target.value }` } );

        if ( !validation && e.target.name === 'instagramLink' ) return setInput( { ...input, [ e.target.name ]:`https://instagram.com/${ e.target.value }` } );

        setInput( { ...input, [ e.target.name ]:e.target.value } );

    };


    return { isLoading, setAlert, cancelToken, alert, upload, disable, setDisable, input, setInput, validateForm };

};