import { setUser } from "../actions/user";
import { preSubmitCreateAccount, preSubmitSignIn } from "../helpers/preSubmit"
import axiosInstance from "./axiosConfig";
import axios from 'axios';

export const signInUserAPI = ( inputData, setAlert, setLoading, event, history, dispatch, setCancelTokenSource ) => {

    const isFormValid = preSubmitSignIn( inputData, setAlert, event );

    if ( !isFormValid ) return false;

    setLoading( true );

    const cancelToken = axiosInstance.CancelToken.source();

    setCancelTokenSource( cancelToken );

    axiosInstance.post( '/sign-in', inputData, { cancelToken:cancelToken.token } )
    .then( (response) => {

        setLoading( false );

        localStorage.setItem( 'token', response.data.token );

        dispatch( setUser( response.data.userData ) );

    } )
    .catch( (err) => {

        setLoading( false );

        if ( axios.isCancel( err )) return console.log( 'request canceled' ); 

        setAlert( { type:'user', message:err.response.data.message } );
        
    } );

};


export const createAccountAPI = ( inputData, setLoading, setAlert, event, history, userData ) => {

    const { email, otp } = userData;

    const { businessName, username, password, repeatPassword } = inputData;

    const isFormValid = preSubmitCreateAccount( inputData, setAlert, event );

    if ( !isFormValid ) return false;

    const objectUser = { businessName, username, password, repeatPassword, email, otp };

    setLoading( true );

    axiosInstance.post( '/user', objectUser )
    .then( (response) => {

        setLoading( false );

        history.push( '/sign-in/?account__created=true' );


    } )
    .catch( (err) => {

        setLoading( false );

        if ( err.response.data.errorCode ) return setAlert( { type:err.response.data.errorCode, message:err.response.data.message } );

        setAlert( { type:'general', message:'Error from server' } );

    } );


};
