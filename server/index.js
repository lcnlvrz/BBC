const mongoose = require( 'mongoose' );
require( 'dotenv' ).config();
const app = require( './app' );
const { PORT_SERVER } = require('./config');
const moment = require( 'moment' );
const http = require( 'http' );

const server = http.Server( app );

const socketio = require( 'socket.io' );
const { getStatusBusiness, newBusinessReturnTheirClients, getIndexToDeleteBusinessOffline, getIndexToDeleteClientOffline } = require('./helpers/getStatusBusiness');

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
               

            businessOnline.push( { ...userData, socketID:socket.id } );

            let clientsToSendNotification = [];

            if ( clientsOnline ) {

                clientsToSendNotification = newBusinessReturnTheirClients( userData, clientsOnline );

            };

            if ( clientsToSendNotification.length > 0 ) {

                for (let i = 0; i < clientsToSendNotification.length; i++) {
                    
                    io.to( clientsToSendNotification[ i ] ).emit( 'businesStatus', { isOnline:true, businessData:{ ...userData, socketID:socket.id } } );
                    
                };

            };

            console.log( `LENGTH BUSINESS CONNECT:${ businessOnline.length }` );

           } );

           socket.on( 'businessOffline', ( businessDataDisconnected ) => {


            const indexDeleteBusiness = getIndexToDeleteBusinessOffline( businessOnline, businessDataDisconnected );

            if ( indexDeleteBusiness > -1 ) businessOnline.splice( indexDeleteBusiness, 1 );

            const clientsToSendNotification = newBusinessReturnTheirClients( businessDataDisconnected, clientsOnline );

            if ( clientsToSendNotification.length > 0 ) {

                for (let i = 0; i < clientsToSendNotification.length; i++) {

                    io.to( clientsToSendNotification[i] ).emit( 'businesStatus', { isOnline:false, businessData:null } );
                    
                };

            };

            console.log( `LENGTH BUSINESS DISCONNECT:${ businessOnline.length }` );



           } );


           socket.on( 'clientConnect', ( searchingForBusinessData ) => {

            console.log( businessOnline );

            const { isOnline, businessData } = getStatusBusiness( businessOnline, searchingForBusinessData );

            console.log( businessData );

            clientsOnline.push( searchingForBusinessData )

            socket.emit( 'businesStatus', { isOnline, businessData } );

            console.log( `LENGTH CLIENTS CONNECT:${ clientsOnline.length }` );


           } );

           socket.on( 'clientDisconnect', () => {

            const indexToDeleteClient = getIndexToDeleteClientOffline( clientsOnline, socket.id );

            console.log( indexToDeleteClient );

            if ( indexToDeleteClient === -1 ) return false;

            console.log( indexToDeleteClient );

            clientsOnline.splice( indexToDeleteClient, 1 );




           

           } );

           socket.on( 'sendMessage', (data) => {

            const { fromName, message, toSocketID, fromSocketID, image } = data;

            const sentAt = moment().format();

            io.to( toSocketID ).emit( 'receiveMessage', { message, fromName, sentAt, fromSocketID, image } );

           } );

          

        } );


    } );


} );

