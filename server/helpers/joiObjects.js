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
    .max( 100 ),
    location:Joi.string()
    .min( 1 )
    .max( 500 ),
    since:Joi.string()
    .length(5),
    until:Joi.string()
    .length( 5 ),
    businessCategory:Joi.string()
    .min( 1 )
    .max( 100 )


});

const realTimeObject = Joi.object({

    personalWorking:Joi.number()
    .min( 1 )
    .max( 10000 ),
    clientsInTheShop:Joi.number()
    .min( 1 )
    .max( 10000 )

});



const productObject = Joi.object({

    image:Joi.string()
    .uri()
    .min( 1 )
    .max( 200 ),
    title:Joi.string()
    .min( 1 )
    .max( 200 ),
    subtitle:Joi.string()
    .min( 1 )
    .max( 200 ),
    price:Joi.number()
    .min( 0 )
    .max( 10000000000000 ),
    currency:Joi.string()
    .length( 3 ),
    description:Joi.string()
    .min( 1 )
    .max( 100 ),
    details:Joi.string()
    .min( 1 )
    .max( 100 ),
    category: Joi.string()
    .min( 1 )
    .max( 500 ),
    stock:Joi.number()
    .min( 0 )
    .max( 10000000000000 )

});

const productUpdateInfoObject = Joi.object({

    image:Joi.string()
    .uri()
    .min( 1 )
    .max( 200 ),
    title:Joi.string()
    .min( 1 )
    .max( 200 ),
    subtitle:Joi.string()
    .min( 1 )
    .max( 200 ),
    price:Joi.number()
    .min( 0 )
    .max( 10000000000000 ),
    currency:Joi.string()
    .length( 3 ),
    description:Joi.string()
    .min( 1 )
    .max( 100 ),
    details:Joi.string()
    .min( 1 )
    .max( 100 ),
    stock:Joi.number()
    .min( 0 )
    .max( 10000000000000 )

});

module.exports = { userObject, usernameAndPasswordObject, informationBusinessObject, productObject,productUpdateInfoObject, realTimeObject };