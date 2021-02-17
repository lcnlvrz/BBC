import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateInfo } from '../actions/user';
import axiosInstance from '../api/axiosConfig';
import { inputKeys, textAreaBusinessProfileContentMainFunction } from '../constants/content';
import { getToken } from '../helpers/getToken';
import { useSelector } from 'react-redux';


export const useUploadInformation = () => {

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const initialStateFormBusinessProfile = { businessName:'', isOpenBusiness:false, mainPresentationOne:'', footerSectionTwo:'', footerTitle:'', footerSectionOne:'', mainPresentationTwo:'', footerLastLine:'', businessCategory:'', since:'', until:'', location:'' };

    const [alert, setAlert] = useState( { type:'', severity:'', message:'' } );
    const [isLoading, setIsLoading] = useState( false );
    const [socialMediaLinks, setSocialMediaLinks] = useState( { facebook:null, instagram:null, twitter:null } );
    const [cancelToken, setCancelToken] = useState( null );
    const [isNewChange, setIsNewChange] = useState( false );
    const [input, setInput] = useState( initialStateFormBusinessProfile );

    const textAreaBusinessProfileContentMain = textAreaBusinessProfileContentMainFunction( input );


    useEffect(() => {

        if ( !user.isLoading ) {
  
          for (let i = 0; i < inputKeys.length; i++) {
  
            const field = inputKeys[ i ];
  
            setInput( name => ({ ...name, [field]: field === 'isOpenBusiness' ? user[ field ] :  user[ field ] ? user[ field ] : '' }) );
            
          };
  
          const socialMediaValues = { facebook:user.facebookLink, twitter:user.twitterLink, instagram:user.instagramLink };
  
          setSocialMediaLinks( socialMediaValues );
  
        };
       
      }, [ user ]);

    const uploadBusinessInformation = ( inputData, e ) => {

        e.preventDefault();

        setAlert( { type:'', severity:'', message:'' } );

        if ( !inputData.businessName || !inputData.mainPresentationOne || !inputData.mainPresentationTwo || !inputData.footerSectionOne || !inputData.footerSectionTwo || !inputData.footerLastLine || !inputData.footerTitle ) return setAlert( { type:'incomplete', severity:'error', message:'Fill out all the information' } );

        const token = getToken( dispatch );

        if ( !token ) return setAlert( { type:'incomplete', severity:'error', message:"Your token isn't valid" } );

        setIsLoading( true );

        const cancelTokenFunction = axiosInstance.CancelToken.source();

        setCancelToken( cancelTokenFunction );

        axiosInstance.put( '/info-business', inputData, { headers:{ authorization:token }, cancelToken:cancelTokenFunction.token })
        .then( (response) => {

            dispatch( updateInfo( response.data.newInfo ) );
            setIsLoading( false );
            setIsNewChange( false );
            setAlert( { type:'businessProfile', severity:'success', message:'Info business profile updated successfully' } );

        } )
        .catch( (err) => {

            if ( axiosInstance.isCancel( err ) ) return console.log( 'request canceled by user' );

            console.log( err.response.data.message );

            setAlert( { type:'incomplete', severity:'error', message:err.response.data.message } );

            setIsLoading( false );

        } );

    };

    const onChangeForm = ( e ) => {

      setIsNewChange( true );

      if ( e.target.name === 'isOpenBusiness' ) return setInput( { ...input, [ e.target.name ]:e.target.checked } );

      setInput( { ...input, [ e.target.name ]: e.target.value } ); 

        
    };

    useEffect(() => {

        return () => {
  
          if ( cancelToken ) return cancelToken.cancel();
  
        };
  
      }, [ cancelToken ]);

    return { uploadBusinessInformation, alert, setAlert, cancelToken, isLoading, isNewChange, setIsNewChange, onChangeForm, socialMediaLinks, textAreaBusinessProfileContentMain, input, setInput };

};