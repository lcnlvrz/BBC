const mongoose = require( 'mongoose' );
require( 'dotenv' ).config();
const app = require( './app' );
const { PORT_SERVER } = require('./config');
const moment = require( 'moment' );
const http = require( 'http' );

const server = http.Server( app );

const socketio = require( 'socket.io' );
const { getStatusBusiness, newBusinessReturnTheirClients, getIndexToDeleteBusinessOffline } = require('./helpers/getStatusBusiness');

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

const businessOnline = [];

const clientsOnline = [];

mongoose.connect( process.env.MONGODB_CONNECT, ( err ) => {

    if ( err ) throw err;

    console.log( 'CONNECTED TO DATABASE SUCCESSFULLY' );

    server.listen( PORT_SERVER, () => {

        console.log( `SERVER RUNNING ON: http://localhost:${ PORT_SERVER }` );

        io.on( 'connection', socket => {

           socket.on( 'businessOnline', ( userData ) => {

            businessOnline.push( userData );

            let clientsToSendNotification = [];

            if ( clientsOnline ) {

                clientsToSendNotification = newBusinessReturnTheirClients( userData, clientsOnline );

            };

            if ( clientsToSendNotification.length > 0 ) {

                for (let i = 0; i < clientsToSendNotification.length; i++) {
                    
                    io.to( clientsToSendNotification[ i ] ).emit( 'businesStatus', { isOnline:true, businessData:userData } );
                    
                };

            };

           } );

           socket.on( 'businessOffline', ( businessDataDisconnected ) => {

            const indexDeleteBusiness = getIndexToDeleteBusinessOffline( businessOnline, businessDataDisconnected );

            if ( indexDeleteBusiness ) businessOnline.slice( indexDeleteBusiness, 1 );

            const clientsToSendNotification = newBusinessReturnTheirClients( businessDataDisconnected, clientsOnline );

            if ( clientsToSendNotification.length > 0 ) {

                for (let i = 0; i < clientsToSendNotification.length; i++) {

                    console.log( `'SEND DISCONNECT TO:${ clientsToSendNotification[i] }` );

                    io.to( clientsToSendNotification[i] ).emit( 'businesStatus', { isOnline:false, businessData:null } );
                    
                };

            };


           } );


           socket.on( 'getStatusBusiness', ( searchingForBusinessData ) => {

            const { isOnline, businessData } = getStatusBusiness( businessOnline, searchingForBusinessData );

            clientsOnline.push( searchingForBusinessData )

            socket.emit( 'businesStatus', { isOnline, businessData } );


           } );

           socket.on( 'sendMessage', (data) => {

            const { fromName, message, toSocketID, fromSocketID } = data;

            const sentAt = moment().format();

            io.to( toSocketID ).emit( 'receiveMessage', { message, fromName, sentAt, fromSocketID } );

           } );

        } );


    } );


} );

