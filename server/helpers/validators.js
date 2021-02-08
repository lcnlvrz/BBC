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

const validateURL = ( url ) => {

    if ( !url ) return false;

    const isURLvalid = validator.isURL( url );

    if ( !isURLvalid ) return res.status( 422 ).send({ message:"The url isn't valid" });

    return true;

};

const validateURLs = ( urls ) => {

    const keys = Object.keys( urls );

    const socialMediasAllowed = [ 'facebook.com', 'instagram.com', 'twitter.com', 'mercadolibre.com' ];

    const booleans = keys.map( ( socialMedia, index ) => {
        
        let protocol = "";
        let hostURL = "";
        let namePage = "";

        const validateIfIsURL = validator.isURL( urls[ socialMedia ] );

        if ( validateIfIsURL ) {

            hostURL = new URL( urls[ socialMedia ] );

            namePage = hostURL.host.split( '.' )[0];

            protocol = hostURL.protocol;

            hostURL = hostURL.host;

        };

        let isSocialMediaAllowed = false;

        for (let i = 0; i < socialMediasAllowed.length; i++) {

            if ( hostURL === socialMediasAllowed[i] && protocol === 'https:' && socialMedia === `${ namePage }Link` ) isSocialMediaAllowed = true; 
            
        };

        if ( !isSocialMediaAllowed && urls[ socialMedia ] !== ""   ) return false;

        return true;

    } );

    const indexInvalid = booleans.indexOf( false );

    if ( indexInvalid !== -1 ) return false;

    return true;

};

module.exports = { usernameValidator, passwordValidator, usernameAndEmailValidator, validateURL, validateURLs };