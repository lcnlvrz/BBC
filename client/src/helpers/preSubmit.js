import { validateBusinessName, validateNumber, validatePassword, validateUsername } from "./validations";
import emailValidator from 'email-validator';

export const preSubmitSignIn = ( inputData, setAlert ) => {

    setAlert({ type:'', message:'' });

    const { emailOrUsername, password } = inputData;
    
    const isEmailValid = emailValidator.validate( emailOrUsername );
    const isUsernameValid = validateUsername( emailOrUsername );
    const isPasswordValid = validatePassword( password );

    if ( ( !isEmailValid && !isUsernameValid ) || !isPasswordValid ) {

        setAlert( { type:'user', message:"The user doesn't exist" } );

        return false;

    };

    return { isWasValidated:true, inputData };


};

export const preSubmitCreateAccount = ( inputData, setAlert ) => {

    setAlert({ type:'', message:'' });

    const { businessName, username, password, repeatPassword } = inputData;

    if ( !businessName || !username || !password || !repeatPassword ) return false;

    const isBusinessNameValid = validateBusinessName( businessName );
    const isUsernameValid = validateUsername( username );
    const isPasswordValid = validatePassword( password );

    if ( !isBusinessNameValid ) {

        setAlert( { type:'businessName', messagge:'Only accepts letters, numbers and spaces' } );

        return false;

    };

    if ( !isUsernameValid ) {

        setAlert( { type:'username', message:'Only accepts letters, numbers . and _' } );

        return false;

    };

    if ( !isPasswordValid ) {

        setAlert( { type:'password', message:'At least one upper case, one lower case, one digit, one special character and minimun eight characters' } );

        return false;

    };

    if ( password !== repeatPassword ) {

        setAlert( { type:'repeatPassword', message:'The passwords needs be equal' } );

        return false;

    };


    return { isWasValidated:true, inputData };

};

export const preSubmitPublishProduct = ( inputData, setAlert ) => {

    const { price, stock, image } = inputData;

    if ( !image ) {

        setAlert( { type:'image', message:"Upload one product's photo", severity:'error' } );
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return false;

    };

    const isPriceValid = validateNumber( Number(price) );
    const isStockValid = validateNumber( Number(stock) );

    if ( !isPriceValid ){

        setAlert( { type:'price', message:'The price is not valid', severity:'error' } );
        return false;

    };
    
    if ( !isStockValid ){

        setAlert( { type:'stock', message:'The stock is not valid', severity:'error' } );
        return false;

    };

    return true;

};

export const preSubmitUpdateProduct = ( inputData, setAlert ) => {

    const { price, stock, title, description, subtitle, details } = inputData;

    if ( !title || !description || !subtitle || !details ) {

        setAlert( { type:'incomplete', message:'Fill out all the information', severity:'error' } );
        return false;

    };

    const isPriceValid = validateNumber( Number(price) );
    const isStockValid = validateNumber( Number(stock) );

    if ( !isPriceValid ) {

        setAlert({ type:'price', message:"The price isn't valid", severity:'error' });

        return false;

    };

    if ( !isStockValid ) {

        setAlert({ type:'stock', message:"The stock isn't valid", severity:'error' });

        return false;

    };

    return true;

};
