import { createContext } from "react";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setClearUser } from "../actions/user";
import axiosInstance from "../api/axiosConfig";

export const AuthContext = createContext();

export default function AuthProvider( props ){

    const [user, setUser] = useState( { user:false, isLoading:false } );

    const dispatch = useDispatch();

    useEffect(() => {

        const token = localStorage.getItem( 'token' );

        if ( !token ) return dispatch( setClearUser() )
        
    }, []);

    return <AuthContext.Provider value={ user }> 
    { props.children } </AuthContext.Provider>


};
