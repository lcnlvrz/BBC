const express = require( 'express' );
const helmet = require( 'helmet' );
const app = express();
const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );
const { API_VERSION } = require('./config');

app.use( bodyParser.urlencoded( { extended:false } ) );
app.use( bodyParser.json( { limit:'10mb' } ) );
app.use( cors() );
app.use( helmet() );

//load routes
const temporaryUserRouter = require( './routers/temporaryUsers' );
const userRouter = require( './routers/users' );
const productRouter = require( './routers/products' );


app.use( `/api/${ API_VERSION }`, temporaryUserRouter );
app.use( `/api/${ API_VERSION }`, userRouter );
app.use( `/api/${ API_VERSION }`, productRouter );

module.exports = app;




