const mongoose = require( 'mongoose' );
require( 'dotenv' ).config();
const app = require( './app' );
const { PORT_SERVER } = require('./config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect( process.env.MONGODB_CONNECT, ( err ) => {

    if ( err ) throw err;

    console.log( 'CONNECTED TO DATABASE SUCCESSFULLY' );

    app.listen( PORT_SERVER, () => {

        console.log( `SERVER RUNNING ON: http://localhost:${ PORT_SERVER }` );

    } );


} );

