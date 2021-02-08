import { setClearUser } from '../actions/user';

export const getToken = ( dispatch ) => {

    const token = localStorage.getItem( 'token' );

    if ( !token ) {

        dispatch( setClearUser() );

        return false;

    };

    return token;


};