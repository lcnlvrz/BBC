const TemporaryUser = require( '../models/temporaryUsers' );
const validator = require( 'validator' );
const moment = require( 'moment' );
const { getCodePromise } = require('../helpers/otp');
const { getTransportToSendOTP } = require('../helpers/sendMail');


const createTemporaryUser = async ( req, res ) => {
    
    const { email } = req.body;

    if ( !email ) return res.status( 404 ).send( { message:'The email is empty' } );

    const isEmailValid = validator.isEmail( email );

    if ( !isEmailValid ) return res.status( 403 ).send( { message:"The email isn't valid" } );

    const createdAt = moment().unix();

    const otp = await getCodePromise();

    if ( !otp ) return res.status( 500 ).send( { message:'Error from server to create code' } );

    const filter = { email };
    
    const update = { createdAt, otp };
    
    TemporaryUser.findOneAndUpdate( filter, update, ( err, updated ) => {

        if ( err ) throw err;

        const { transporter, mailDetails } = getTransportToSendOTP( otp, email );

        if ( !updated ) {

            const newTemporaryUser = new TemporaryUser( { email, createdAt, otp } );

            newTemporaryUser.save( ( err, temporaryUserStored ) => {

                if ( err ) throw err;

                if ( !temporaryUserStored ) return res.status( 500 ).send( { message:'Error from server to save the email' } );

                transporter.sendMail( mailDetails, ( err, info ) => {

                    if ( err ) throw err;

                    if ( !info ) return res.status( 502 ).send( { message:'Error to send the email' } );

                    res.status( 201 ).send( { message:'Temporary user created successfully' } );

                } );
            
            } );

        };

        transporter.sendMail( mailDetails, ( err, info ) => {

            if ( err ) throw err;

            if ( !info ) return res.status( 502 ).send( { message:'Error to send the email' } );

            res.status( 201 ).send( { message:'Temporary user created successfully' } );

        } );


    } );

};

const validateOTP = ( req, res ) => {

    const { otp, email } = req.body;

    const filter = { otp, email };

    TemporaryUser.findOne( filter, ( err, temporaryUserStored ) => {

        if ( err ) throw err;

        if ( !temporaryUserStored ) return res.status( 401 ).send( { message:"The code isn't correct" } );

        res.status( 200 ).send({ message:'OTP valid. Can continue with the process' });

    } );

};

module.exports = { createTemporaryUser, validateOTP };