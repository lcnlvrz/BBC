const User = require( '../models/users' );
const bcrypt = require( 'bcryptjs' );
const moment = require( 'moment' );
const jwt = require( 'jsonwebtoken' );
require( 'dotenv' ).config({ path:'../' });
const validator = require( 'validator' );
const { validateURL, validateURLs } = require('../helpers/validators');
const { validate } = require('../models/users');
const { informationBusinessObject, realTimeObject } = require('../helpers/joiObjects');

const populateUser = { path:'products', options:{ sort:{ 'createdAt':-1 }, limit:10 } };

const createUser = ( req, res ) => {

    const { businessName, username:usernameNoLowerCase, password, email } = req.body;

    const username = usernameNoLowerCase.toLowerCase();

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

    const { emailOrUsername:emailOrUsernameNoLowerCase, password } = req.body;

    const emailOrUsername = emailOrUsernameNoLowerCase.toLowerCase();

    const filter = { $or:[ { email:emailOrUsername }, { username:emailOrUsername } ] };

    User.findOne( filter, ( err, userStored ) => {

        if ( err ) throw err;

        if ( !userStored ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

        bcrypt.compare( password, userStored.password, ( err, success ) => {

            const { 
                businessName, 
                username, 
                _id, 
                profilePhoto, 
                banner, 
                mainPresentationOne,
                mainPresentationTwo,
                footerSectionOne,
                footerSectionTwo,
                footerLastLine,
                footerTitle,
                isOpenBusiness,
                facebookLink,
                instagramLink,
                twitterLink,
                products,
                bannerSectionProducts,
                bannerSectionProductsText,
                location,
                businessCategory,
                since,
                until,
                personalWorking,
                clientsInTheShop,
                lastUpdatePersonalWorking,
                lastUpdateClientsInTheShop
            } = userStored;

            if ( err ) throw err;

            if ( !success ) return res.status( 401 ).send( { message:"The password isn't correct" } );

            const payload = { userID:userStored._id };

            jwt.sign( payload, process.env.SECRET_TOKEN, { expiresIn:1209600 }, ( err, token ) => {

                if ( err ) throw err;

                if ( !token ) return res.status( 500 ).send( { message:'Error from server to encoded the token' } );

                const userData = {

                    businessName, 
                    username, 
                    userID:_id, 
                    isLoading:false, 
                    condition:'business', 
                    profilePhoto, 
                    banner, 
                    mainPresentationOne,
                    mainPresentationTwo,
                    footerSectionOne,
                    footerSectionTwo,
                    footerLastLine,
                    footerTitle,
                    isOpenBusiness,
                    facebookLink,
                    instagramLink,
                    twitterLink,
                    products,
                    bannerSectionProducts,
                    bannerSectionProductsText,
                    location,
                    businessCategory,
                    since,
                    until,
                    personalWorking,
                    clientsInTheShop,
                    lastUpdatePersonalWorking,
                    lastUpdateClientsInTheShop   
                };

                res.status( 200 ).send( { message:'User logged successfully', token, userData } );

            } );

        } );

    } ).populate( populateUser );

};

const getUserInfo = ( req, res ) => {

    const userID = res.locals.userID;

    const filter = { _id:userID };

    User.findOne( filter, ( err, userStored ) => {

        if ( err ) throw err;

        if ( !userStored ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

        const { 
            businessName, 
            username, 
            profilePhoto, 
            banner,  
            mainPresentationOne,
            mainPresentationTwo,
            footerSectionOne,
            footerSectionTwo,
            footerLastLine,
            footerTitle,
            isOpenBusiness,
            facebookLink,
            instagramLink,
            twitterLink,
            products,
            bannerSectionProducts,
            bannerSectionProductsText,
            location,
            businessCategory,
            since,
            until,
            personalWorking,
            clientsInTheShop,
            lastUpdatePersonalWorking,
            lastUpdateClientsInTheShop    
        } = userStored;

        const userData = { 
            businessName, 
            username, 
            userID, 
            isLoading:false, 
            condition:'business', 
            profilePhoto, 
            banner, 
            mainPresentationOne,
            mainPresentationTwo,
            footerSectionOne,
            footerSectionTwo,
            footerLastLine,
            footerTitle,
            isOpenBusiness,
            facebookLink,
            instagramLink,
            twitterLink,
            products,
            bannerSectionProducts,
            bannerSectionProductsText,
            location,
            businessCategory,
            since,
            until,
            personalWorking,
            clientsInTheShop,
            lastUpdatePersonalWorking,
            lastUpdateClientsInTheShop  
        };

        res.status( 200 ).send( { message:'User login successfully', userData } );

    } ).populate( populateUser );

};

const uploadProfilePhoto = ( req, res ) => {

    const { url } = req.body;

    const validation = validateURL( url );

    if ( !validation ) return res.status( 422 ).send( { message:"The url isn't valid" } );

    const userID = res.locals.userID;

    const filter = { _id:userID };

    const update = { profilePhoto:url };

    User.updateOne( filter, update, ( err, userStored ) => {
        
        if ( err ) throw err;

        if ( !userStored ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

        res.status( 200 ).send({ message:'Profile photo updated successfully', url });

    } );

};

const uploadBanner = ( req, res ) => {

    const { url } = req.body;

    const validation = validateURL( url );

    if ( !validation ) return res.status( 422 ).send( { message:"The url isn't valid" } );

    const userID = res.locals.userID;

    const filter = { _id:userID };

    const update = { banner:url };

    User.updateOne( filter, update, ( err, userStored ) => {

        if ( err ) throw err;

        if ( !userStored ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

        res.status( 200 ).send( { message:'Banner uploaded successfully', url } );

    } );

};

const deleteProfilePhoto = ( req, res ) => {

    const userID = res.locals.userID;

    const filter = { _id:userID };

    const update = { $unset:{ profilePhoto:"" } };

    User.updateOne( filter, update, ( err, updated ) => {

        if ( err ) throw err;

        if ( !updated ) return res.status( 404 ).send( { message:"The user isn't exist" } );

        res.status( 200 ).send( { message:'The profile photo was deleted successfully' } );

    } );

};

const deleteBanner = ( req, res ) => {

    const userID = res.locals.userID;

    const filter = { _id:userID };

    const update = { $unset:{ banner:"" } };

    User.updateOne( filter, update, ( err, updated ) => {

        if ( err ) throw err;

        if ( !updated ) return res.status( 404 ).send( { message:"The user doesn't exist" } );
        
        res.status( 200 ).send({ message:'The banner was deleted successfully' });

    } );

};

const updateBannerSectionProducts = ( req, res ) => {

    const { url } = req.body;

    const validation = validateURL( url );

    if ( !validation ) return res.status( 422 ).send( { message:"The url isn't valid" } );

    const userID = res.locals.userID;

    const filter = { _id:userID };

    const update = { bannerSectionProducts:url };

    User.updateOne( filter, update, ( err, userStored ) => {

        if ( err ) throw err;

        if ( !userStored ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

        res.status( 200 ).send( { message:'Banner uploaded successfully', url } );

    } );


}

const deleteBannerSectionProducts = ( req, res ) => {

    const userID = res.locals.userID;

    const filter = { _id:userID };

    const update = { $unset:{ bannerSectionProducts:"" } };

    User.updateOne( filter, update, ( err, updated ) => {

        if ( err ) throw err;

        if ( !updated ) return res.status( 404 ).send( { message:"The user isn't exist" } );

        res.status( 200 ).send( { message:'The banner product was deleted successfully' } );

    } );

};

const updateBusinessInfo = ( req, res ) => {

    const infoBusiness = req.body;

    const validation = informationBusinessObject.validate( infoBusiness );

    if ( validation.error ) return res.status( 422 ).send( { message:validation.error } );

    const userID = res.locals.userID;

    const filter = { _id:userID };

    User.updateOne( filter, infoBusiness, ( err, updated ) => {

        if ( err ) throw err;

        if ( !updated ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

        res.status( 200 ).send( { message:'Information business updated successfully', newInfo:infoBusiness } );

    } );

};

const updateSocialMedias = ( req, res ) => {

    const data = req.body;

    if ( !data ) return res.status( 404 ).send( { message:'The data provided are empty' } );

    const validation = validateURLs( data );

    if ( !validation ) return res.status( 422 ).send( { message:"The urls aren't valid" } );

    const userID = res.locals.userID;

    const filter = { _id:userID };

    User.updateOne( filter, data, ( err, updated ) => {

        if ( err ) throw err;

        if ( !updated ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

        res.status( 200 ).send( { message:'Social media updated successfully', newSocialMedia:data } );

    } );

};

const getAllBusiness = ( req, res ) => {

    const { query } = req.headers;

    const userPattern = new RegExp( '^'+query );

    const filter = { businessName:{ $regex:userPattern, $options:'i' } };

    User.find( filter, ( err, users ) => {

        if ( err ) throw err;

        if ( users.length === 0 ) return res.status( 404 ).send({ message:"Your search didn't match any business" });

        res.status( 200 ).send( { message:'Business found!', business:users } );

    } ).populate( populateUser ).select( '-email -password' ).limit( 10 )

};

const updateSectionProductsText = ( req, res ) => {

    const { data } = req.body;

    if ( !data ) return res.status( 404 ).send( { message:'The data is empty' } );

    const dataType = typeof data;

    if ( dataType !== 'string' ) return res.status( 422 ).send( { message:"The data provided isn't valid" } );

    const userID = res.locals.userID;

    const filter = { _id:userID };

    const update = { bannerSectionProductsText:data };

    User.updateOne( filter, update, ( err, updated ) => {

        if ( err ) throw err;

        if ( !updated ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

        res.status( 200 ).send( { mesage:'The text banner was updated successfully', newTitle:data } );

    } );

};


const updateRealTimeData = ( req, res ) => {

    const data = req.body;

    const { clientsInTheShop, personalWorking } = req.body;

    if ( clientsInTheShop < 0 || personalWorking < 0 ) return res.status( 422 ).send( { message:'The data provided is less than zero.' } );

    const userID = res.locals.userID;

    const filter = { _id:userID };

    const lastUpdated = moment().unix();

    const lastUpdatedLessFewSeconds = moment().add( -10, 'seconds' ).unix();

    const update = { clientsInTheShop, personalWorking, lastUpdatePersonalWorking:lastUpdated, lastUpdateClientsInTheShop:lastUpdatedLessFewSeconds };

    User.findOneAndUpdate( filter, update, ( err, updated ) => {

        if ( err ) throw err;

        if ( !updated ) res.status( 500 ).send( { message:'Error from server to update the server' } );

        res.status( 200 ).send( { message:'Real time data updated successfully', newRealTimeInfo:data } );

    } );

}

const getOneBusinessByUsername = ( req, res ) => {

    const { username } = req.headers;

    if ( !username ) return res.status( 404 ).send( { message:'The username is empty' } );

    const regUsername = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;

    const valueAfterValidation = regUsername.test( username );

    if ( !valueAfterValidation ) return res.status( 422 ).send({ message:"The username isn't valid" });

    const filter = { username };
    
    User.findOne( filter, ( err, userStored ) => {

        if ( err ) throw err;

        if ( !userStored ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

        res.status( 200 ).send({ message:'User found successfully', business:{ ...userStored._doc, isLoading:false, business:true } });

    } ).select( '-email -password' ).populate( populateUser );

};



module.exports = { createUser, signInUser, getUserInfo, uploadProfilePhoto, uploadBanner, deleteProfilePhoto, deleteBanner, updateBusinessInfo, updateSocialMedias, getAllBusiness, updateBannerSectionProducts, deleteBannerSectionProducts, updateSectionProductsText, getOneBusinessByUsername, updateRealTimeData };