import { createContext } from "react";
import { useState, useEffect } from 'react';
import { useAuth } from "../hooks/useAuth";
import { useGetOneBusiness } from "../hooks/useGetOneBusiness";
import { useGetOneProduct } from "../hooks/useGetOneProduct";
import { useSelector } from 'react-redux';
import LoadingAnimation from "../components/reusableComponents/LoadingAnimation";
import { Helmet } from 'react-helmet-async';

export const AuthContext = createContext();

export default function AuthProvider( props ){

    const [isUserValid] = useState( { user:false, isLoading:false } );

    const authUser = useAuth();

    const getBusiness = useGetOneBusiness();

    const getOneProduct = useGetOneProduct();

    const currentProduct = useSelector(state => state.currentProduct);

    const user = useSelector(state => state.user);
    
    const currentSearch = useSelector(state => state.currentSearch);

    const helmetTitle = useSelector(state => state.helmetTitle);

    useEffect(() =>{
        
        authUser();

        getBusiness();

        getOneProduct();

    }, []);

    if ( currentProduct.isLoading || currentSearch.isLoading || user.isLoading ) return <LoadingAnimation/>

    return (
    <AuthContext.Provider value={ isUserValid }>
        <Helmet>
            <title> { helmetTitle } </title>
        </Helmet>
        { props.children }
    </AuthContext.Provider>)


};
