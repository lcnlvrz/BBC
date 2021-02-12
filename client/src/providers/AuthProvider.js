import { createContext } from "react";
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setClearSearch } from "../actions/currentSearch";
import { useAuth } from "../hooks/useAuth";
import { useGetOneBusiness } from "../hooks/useGetOneBusiness";
import { useGetOneProduct } from "../hooks/useGetOneProduct";
import { useSelector } from 'react-redux';
import AlertAnimation from "../components/reusableComponents/AlertAnimation";
import LoadingAnimation from "../components/reusableComponents/LoadingAnimation";

export const AuthContext = createContext();

export default function AuthProvider( props ){

    const [isUserValid, setIsUserValid] = useState( { user:false, isLoading:false } );

    const authUser = useAuth();

    const getBusiness = useGetOneBusiness();

    const getOneProduct = useGetOneProduct();

    const dispatch = useDispatch();

    const currentProduct = useSelector(state => state.currentProduct);
    
    const currentSearch = useSelector(state => state.currentSearch);

    useEffect(() =>{
        
        authUser();

        getBusiness();

        getOneProduct();

    }, []);

    if ( currentProduct.isLoading || currentSearch.isLoading ) return <LoadingAnimation/>

    return <AuthContext.Provider value={ isUserValid }> 
    { props.children } </AuthContext.Provider>


};
