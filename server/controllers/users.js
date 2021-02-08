const User = require( '../models/users' );
const bcrypt = require( 'bcryptjs' );
const moment = require( 'moment' );
const jwt = require( 'jsonwebtoken' );
require( 'dotenv' ).config({ path:'../' });
const validator = require( 'validator' );

const createUser = ( req, res ) => {

    const { businessName, username, password, email } = req.body;

    console.log( req.body );

    bcrypt.hash( password, 15 , ( err, hash ) => {

        if ( err ) throw err;

        if ( !hash ) return res.status( 500 ).send( { message:'Exception error to hash the password' } );

        const createdAt = moment().unix();

        const newUser = new User( { businessName, username, password:hash, createdAt, email } );

        newUser.save( ( err, userStored ) => {

            if ( err ) throw err;

            if ( !userStored ) return res.status( 500 ).send({ message:'Error from server to save the user' });

            res.status( 200 ).send( { message:'The user was created successfully. Ready to signin' } );

        } );

    } );

};

const signInUser = ( req, res ) => {

    const { emailOrUsername, password } = req.body;

    const filter = { $or:[ { email:emailOrUsername }, { username:emailOrUsername } ] };

    User.findOne( filter, ( err, userStored ) => {

        if ( err ) throw err;

        if ( !userStored ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

        bcrypt.compare( password, userStored.password, ( err, success ) => {

            const { businessName, username, _id, profilePhoto } = userStored;

            if ( err ) throw err;

            if ( !success ) return res.status( 401 ).send( { message:"The password isn't correct" } );

            const payload = { userID:userStored._id };

            jwt.sign( payload, process.env.SECRET_TOKEN, { expiresIn:1209600 }, ( err, token ) => {

                if ( err ) throw err;

                if ( !token ) return res.status( 500 ).send( { message:'Error from server to encoded the token' } );

                const userData = { businessName, username, userID:_id, isLoading:false, condition:'business', profilePhoto };

                res.status( 200 ).send( { message:'User logged successfully', token, userData } );

            } );

        } );

    } );

};

const getUserInfo = ( req, res ) => {

    const userID = res.locals.userID;

    const filter = { _id:userID };

    User.findOne( filter, ( err, userStored ) => {

        if ( err ) throw err;

        if ( !userStored ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

        const { businessName, username, profilePhoto } = userStored;

        const userData = { businessName, username, userID, isLoading:false, condition:'business', profilePhoto };

        res.status( 200 ).send( { message:'User login successfully', userData } );

    } ).select( 'businessName username profilePhoto' );

};

const uploadProfilePhoto = ( req, res ) => {

    const { url } = req.body;

    if ( !url ) return res.status( 404 ).send( { message:'The url is empy' } );

    const isURLvalid = validator.isURL( url );

    if ( !isURLvalid ) return res.status( 422 ).send({ message:"The url isn't valid" });

    const userID = res.locals.userID;

    const filter = { _id:userID };

    const update = { profilePhoto:url };

    User.updateOne( filter, update, ( err, userStored ) => {
        
        if ( err ) throw err;

        if ( !userStored ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

        res.status( 200 ).send({ message:'Profile photo updated successfully', url });

    } );

};

module.exports = { createUser, signInUser, getUserInfo, uploadProfilePhoto };