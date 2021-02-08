const express = require( 'express' );
const UserMiddleware = require( '../middlewares/users' );
const TemporaryUserMiddleware = require( '../middlewares/temporaryUser' );
const UserController = require( '../controllers/users' );

const app = express.Router();

app.post( '/user', [ UserMiddleware.validateSignUpData ],[ UserMiddleware.validateIfUsernameAlreadyExist ], [ TemporaryUserMiddleware.deleteTemporaryUser ], UserController.createUser );

app.post( '/sign-in', [ UserMiddleware.validateSignInData ], UserController.signInUser );

app.get( '/user-info', [ UserMiddleware.validateToken ], UserController.getUserInfo );

app.put( '/profile-photo', [ UserMiddleware.validateToken ], UserController.uploadProfilePhoto );

module.exports = app;