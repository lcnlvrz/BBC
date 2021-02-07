const Joi = require( 'joi' );
const { usernameValidator, passwordValidator, usernameAndEmailValidator } = require('./validators');

const userObject = Joi.object({

    otp:Joi.number(),
    email:Joi.string(),
    businessName:Joi.string()
    .min( 1 )
    .max( 100 ),
    username:Joi.string()
    .custom( usernameValidator ),
    password:Joi.string()
    .min( 1 )
    .max( 100 )
    .custom( passwordValidator ),
    repeatPassword:Joi.string()
    

});

const usernameAndPasswordObject = Joi.object({

    emailOrUsername:Joi.string()
    .min(1)
    .max( 100 )
    .custom( usernameAndEmailValidator ),
    password:Joi.string()
    .min(1)
    .max( 100 )
    .custom( passwordValidator )

});


module.exports = { userObject, usernameAndPasswordObject };