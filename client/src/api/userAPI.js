import { setUser } from "../actions/user";
import { preSubmitCreateAccount, preSubmitSignIn } from "../helpers/preSubmit"
import axiosInstance from "./axiosConfig";

export const signInUserAPI = ( inputData, setAlert, setLoading, event, history, dispatch ) => {

    const isFormValid = preSubmitSignIn( inputData, setAlert, event );

    if ( !isFormValid ) return false;

    setLoading( true );

    axiosInstance.post( '/sign-in', inputData )
    .then( (response) => {

        setLoading( false );

        localStorage.setItem( 'token', response.data.token );

        history.push( '/business/?section=panel' );

        dispatch( setUser( response.data.userData ) );


    } )
    .catch( (err) => {

        setLoading( false );

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
