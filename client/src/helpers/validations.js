export const validateCode = ( code ) => {

    const isNumber = Number.isInteger( code );

    if ( !isNumber ) return false;

    return true;

};

function isInt(n){
    return Number(n) === n && n % 1 === 0;
};

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
};


export const validateNumber = ( number ) => {

    const isInteger = isInt( number );
    const isDecimal = isFloat ( number );

    if ( !isInteger && !isDecimal ) return false;

    return true;

};


export const validateBusinessName = ( businessName ) => {

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


export const validateName = ( name ) => {

    const regexName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;

    const valueAfterValidation = regexName.test( name );

    if ( !valueAfterValidation ) return false;

    return true;

};