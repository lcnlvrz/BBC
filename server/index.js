const mongoose = require( 'mongoose' );
require( 'dotenv' ).config();
const app = require( './app' );
const { PORT_SERVER } = require('./config');

const http = require( 'http' );

const server = http.Server( app );

const socketio = require( 'socket.io' );

const io = socketio( server, {

    cors:{

        origin:'http://localhost:3000',
        credentials:true

    }

} );

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect( process.env.MONGODB_CONNECT, ( err ) => {

    if ( err ) throw err;

    console.log( 'CONNECTED TO DATABASE SUCCESSFULLY' );

    server.listen( PORT_SERVER, () => {

        console.log( `SERVER RUNNING ON: http://localhost:${ PORT_SERVER }` );

        io.on( 'connection', socket => {


           socket.on( 'getSocketID', () => {

            socket.emit( 'socketID', socket.id );

           } );

        } );


    } );


} );

