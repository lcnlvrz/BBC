import { preSubmitCreateAccount, preSubmitSignIn } from "../helpers/preSubmit"

export const signInUserAPI = ( inputData, setAlert, setLoading, event ) => {

    const isFormValid = preSubmitSignIn( inputData, setAlert, event );

    if ( !isFormValid ) return false;


    //axios...
    //setLoading(true)..


};



export const createAccountAPI = ( inputData, setLoading, setAlert, event ) => {

    const isFormValid = preSubmitCreateAccount( inputData, setAlert, event );

    if ( !isFormValid ) return false;

    //setLoading(true)
    //axios...


};