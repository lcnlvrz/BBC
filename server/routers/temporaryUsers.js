const express = require( 'express' );
const TemporaryUserController = require( '../controllers/temporaryUsers' );
const TemporaryUserMiddleware = require( '../middlewares/temporaryUser' );
const app = express.Router();


app.post( '/temporary-user', [ TemporaryUserMiddleware.validateIfEmailAlreadyExistAsUser ], TemporaryUserController.createTemporaryUser );

app.post( '/validate-otp', [ TemporaryUserMiddleware.validateTemporaryUser ], TemporaryUserController.validateOTP );

module.exports = app;