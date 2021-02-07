const validator = require( 'validator' );

const usernameValidator = ( value, helpers ) => {

    const regUsername = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;

    const valueAfterValidation = regUsername.test( value );

    if ( !valueAfterValidation ) return helpers.error( 'any.invalid' );

    return true;

};

const passwordValidator = ( value, helpers ) => {

    const regPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    const valueAfterValidation = regPassword.test( value );

    if ( !valueAfterValidation ) return helpers.error( 'any.invalid' );

    return true;

};

const usernameAndEmailValidator = ( value, helpers ) => {

    const regUsername = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;

    const isUsernameValid = regUsername.test( value );
    const isEmailValid = validator.isEmail( value );

    if ( !isUsernameValid && !isEmailValid ) return helpers.error( 'any.invalid' );

    return true;

};

module.exports = { usernameValidator, passwordValidator, usernameAndEmailValidator };