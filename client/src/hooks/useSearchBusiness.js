import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useDispatch } from 'react-redux';
import { getToken } from '../helpers/getToken';

export const useSearchBusiness = () => {

    const dispatch = useDispatch();

    const [query, setQuery] = useState( '' );

    const [isLoading, setIsLoading] = useState( false );

    const [alert, setAlert] = useState( { type:'', message:'', severity:'' } );

    const [cancelToken, setCancelToken] = useState( null );

    const [isSearching, setIsSearching] = useState( false );

    const [business, setBusiness] = useState( [] );

    const [notFound, setNotFound] = useState( false );

    useEffect(() => {

        setNotFound( false );

        setBusiness( [] );

        if ( !query ) {

            setBusiness([]);
            setIsSearching( false );
            return false;

        };

        setIsSearching( true );

        const timer = setTimeout(() => {

        const token = getToken( dispatch );

        if ( !token ) return setAlert( { type:'Token invalid', message:"The token isn't valid", severity:'error' } );

        const cancelTokenFunction = axiosInstance.CancelToken.source();

        setCancelToken( cancelTokenFunction );

        axiosInstance.get( '/business', { headers:{ query }, cancelToken:cancelTokenFunction.token } )
        .then( (response) => {

            setIsSearching( false );
            console.log( response );
            setBusiness( response.data.business );

        } )
        .catch( (err) => {


            setIsSearching( false );
            setNotFound( { type:'search', message:"Your search didn't match with any business", severity:'error' } );


        } );

            
            
    }, 3000);

        return () => clearTimeout( timer );
        
    }, [ query, dispatch ]);

    return { setQuery, isLoading, setIsLoading, cancelToken, query, business, notFound, setNotFound, isSearching };

};