

export const validateCode = ( code ) => {

    const isNumber = Number.isInteger( code );

    if ( !isNumber ) return false;

    return true;

};