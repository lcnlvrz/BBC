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

const informationBusinessObject = Joi.object({

    businessName:Joi.string()
    .min( 1 )
    .max( 100 ),
    isOpenBusiness:Joi.boolean(),
    mainPresentationOne:Joi.string()
    .min( 1 )
    .max( 1000 ),
    mainPresentationTwo:Joi.string()
    .min( 1 )
    .max( 1000 ),
    footerTitle:Joi.string()
    .min( 1 )
    .max( 100 ),
    footerSectionOne:Joi.string()
    .min( 1 )
    .max( 1000 ),
    footerSectionTwo:Joi.string()
    .min( 1 )
    .max( 1000 ),
    footerLastLine:Joi.string()
    .min( 1 )
    .max( 100 )

});


module.exports = { userObject, usernameAndPasswordObject, informationBusinessObject };