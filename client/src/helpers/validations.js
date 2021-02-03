export const validateCode = ( code ) => {

    const isNumber = Number.isInteger( code );

    if ( !isNumber ) return false;

    return true;

};

export const validateBusinessName = ( businessName ) => {

    const regBusinessName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]*$/;

    const valueAfterValidation = regBusinessName.test( businessName );

    if ( !valueAfterValidation ) return false;

    return true;

};

export const validateUsername = ( username ) => {

    const regUsername = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;

    const valueAfterValidation = regUsername.test( username );

    if ( !valueAfterValidation ) return false;

    return true;

};

export const validatePassword = ( password ) => {

    const regPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    const valueAfterValidation = regPassword.test( password );

    if ( !valueAfterValidation ) return false;

    return true;

};

