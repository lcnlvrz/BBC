const validator = require( 'validator' );
const User = require( '../models/users' );
const TemporaryUser = require( '../models/temporaryUsers' );

const validateTemporaryUser = ( req, res, next ) => {

    const { otp, email } = req.body;

    if ( !otp || !email ) return res.status( 404 ).send( { message:'Validate data are empty' } );

    const isOTPvalid = Number.isInteger( otp );
    const isEmailValid = validator.isEmail( email );

    if ( !isOTPvalid ) return res.status( 403 ).send( { message:'The code is not an integer numbers' } );

    if ( isOTPvalid.length < 4 ) return res.status( 400 ).send( { message:"The code doesn't have 4 numbers" } );

    if ( !isEmailValid ) return res.status( 403 ).send( { message:"The email isn't valid" } );

    next();

};

const validateIfEmailAlreadyExistAsUser = ( req, res, next ) => {

    const { email } = req.body;

    if ( !email ) return res.status( 404 ).send( { message:"The email is empty" } );

    const isEmailValid = validator.isEmail( email );

    if ( !isEmailValid ) return res.status( 400 ).send( { message:"The email isn't valid" } );

    const filter = { email };

    User.findOne( filter, ( err, userStored ) => {

        if ( err ) throw err;

        if ( userStored ) return res.status( 409 ).send( { message:'The email already exist' } );

        next();

    } );

};


const deleteTemporaryUser = ( req, res, next ) => {

    const { otp, email } = req.body;

    const filter = { otp, email };

    TemporaryUser.findOneAndDelete( filter, ( err, deleted ) => {

        if ( err ) throw err;

        if ( !deleted ) return res.status( 401 ).send( { message:"The code isn't valid" } );

        next();

    } );

};

module.exports = { validateTemporaryUser, deleteTemporaryUser, validateIfEmailAlreadyExistAsUser };