


const getStatusBusiness = ( businessOnline, searchingForBusiness ) => {

    if ( businessOnline.length === 0 ) return false;

    const { searchingForID, searchingForUsername } = searchingForBusiness;

    let isOnline = false;

    let businessData = {};

    for (let i = 0; i < businessOnline.length; i++) {

        const { userID, username } = businessOnline[i];
        
        if ( userID === searchingForID ) {

            isOnline = true;

            businessData = businessOnline[i];

        };
        
    };

    return { isOnline, businessData };

};

const newBusinessReturnTheirClients = ( businessOnlineData, clientsOnline ) => {

    if ( clientsOnline.length === 0 ) return [];

    const clientsToSendNotificationBusinessIsOnline = [];

    const { socketID, userID, username } = businessOnlineData;

    for (let i = 0; i < clientsOnline.length; i++) {

        const { searchingForID, socketID } = clientsOnline[i];
        
        if ( searchingForID === userID ) clientsToSendNotificationBusinessIsOnline.push( socketID );
        
    };

    return clientsToSendNotificationBusinessIsOnline;
};

const getIndexToDeleteBusinessOffline = ( businessOnline, businessDisconnected ) => {

    const { userID } = businessDisconnected;

    const indexToDelete = businessOnline.findIndex( ( business ) => {

        return userID === business.userID;

    } );

    if ( indexToDelete !== -1 ) return indexToDelete

    return false;

};

module.exports = { getStatusBusiness, newBusinessReturnTheirClients, getIndexToDeleteBusinessOffline };