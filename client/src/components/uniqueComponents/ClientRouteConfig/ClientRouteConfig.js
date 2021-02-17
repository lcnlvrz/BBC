import React from 'react';
import Home from '../Home';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ClientRouteConfig = () => {

    const history = useHistory();

    const url = new URL( window.location.href );

    const page = url.searchParams.get( 'section' );

    const user = useSelector(state => state.user);

    useEffect(() => {

        const { isLoading, userID } = user;

        if ( !isLoading && userID ) {

            history.push( '/business/?section=panel' );

        };
        
    }, [ user, history ]);

    if ( !page ) return <Home/>

    if ( page === 'sign-in' ) return <SignIn/>

    if ( page === 'sign-up' ) return <SignUp/>

};

export default ClientRouteConfig;
