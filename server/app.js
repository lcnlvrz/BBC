const express = require( 'express' );
const helmet = require( 'helmet' );
const app = express();
const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );


app.use( bodyParser.urlencoded( { extended:false } ) );
app.use( bodyParser.json( { limit:'10mb' } ) );
app.use( cors() );
app.use( helmet() );


module.exports = app;




