import io from 'socket.io-client';

const webSocketServer = 'ws://localhost:3977';

const socket = io( webSocketServer );

export default socket;