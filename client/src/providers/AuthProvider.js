import { createContext } from "react";
import { useState, useEffect } from 'react';
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext();

export default function AuthProvider( props ){

    const [isUserValid, setIsUserValid] = useState( { user:false, isLoading:false } );

    const authUser = useAuth();

    useEffect(() => authUser(), [ authUser ]);

    return <AuthContext.Provider value={ isUserValid }> 
    { props.children } </AuthContext.Provider>


};
