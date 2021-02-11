import { createContext } from "react";
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setClearSearch } from "../actions/currentSearch";
import { useAuth } from "../hooks/useAuth";
import { useGetOneBusiness } from "../hooks/useGetOneBusiness";

export const AuthContext = createContext();

export default function AuthProvider( props ){

    const [isUserValid, setIsUserValid] = useState( { user:false, isLoading:false } );

    const authUser = useAuth();

    const getBusiness = useGetOneBusiness();

    const dispatch = useDispatch();

    useEffect(() =>{

        authUser();

        getBusiness();

    }, [ authUser, dispatch, getBusiness ]);

    return <AuthContext.Provider value={ isUserValid }> 
    { props.children } </AuthContext.Provider>


};
