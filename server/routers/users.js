const express = require( 'express' );
const UserMiddleware = require( '../middlewares/users' );
const TemporaryUserMiddleware = require( '../middlewares/temporaryUser' );
const UserController = require( '../controllers/users' );

const app = express.Router();

app.post( '/user', [ UserMiddleware.validateSignUpData ],[ UserMiddleware.validateIfUsernameAlreadyExist ], [ TemporaryUserMiddleware.deleteTemporaryUser ], UserController.createUser );

app.post( '/sign-in', [ UserMiddleware.validateSignInData ], UserController.signInUser );

app.get( '/user-info', [ UserMiddleware.validateToken ], UserController.getUserInfo );

app.put( '/profile-photo', [ UserMiddleware.validateToken ], UserController.uploadProfilePhoto );

app.put( '/banner', [ UserMiddleware.validateToken ], UserController.uploadBanner ); 

app.delete( '/delete-profilePhoto', [ UserMiddleware.validateToken ], UserController.deleteProfilePhoto );

app.delete( '/delete-banner', [ UserMiddleware.validateToken ], UserController.deleteBanner );

app.put( '/info-business', [ UserMiddleware.validateToken ], UserController.updateBusinessInfo );

app.put( '/socialMedia', [ UserMiddleware.validateToken ], UserController.updateSocialMedias );

app.get( '/business', UserController.getAllBusiness );

app.put( '/banner-section', [ UserMiddleware.validateToken ], UserController.updateBannerSectionProducts );

app.delete( '/delete-bannerSection', [ UserMiddleware.validateToken ], UserController.deleteBannerSectionProducts );

app.put( '/title-sectionProducts', [ UserMiddleware.validateToken ], UserController.updateSectionProductsText );

app.put( '/personal-working', [ UserMiddleware.validateToken ], UserController.updatePersonalWorking );

app.put( '/clients-in-shop', [ UserMiddleware.validateToken ], UserController.updateClientsInTheShop );

app.get( '/business-by-username', UserController.getOneBusinessByUsername );

module.exports = app;