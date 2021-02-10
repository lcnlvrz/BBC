import { createContext } from "react";
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setClearSearch } from "../actions/currentSearch";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext();

export default function AuthProvider( props ){

    const [isUserValid, setIsUserValid] = useState( { user:false, isLoading:false } );

    const authUser = useAuth();

    const dispatch = useDispatch();


    useEffect(() =>{

        authUser();

        const url = new URL( window.location.href );

        const username = url.searchParams.get( 'username' );

        if ( !username ) dispatch( setClearSearch() );

    }, [ authUser, dispatch ]);

    return <AuthContext.Provider value={ isUserValid }> 
    { props.children } </AuthContext.Provider>


};
