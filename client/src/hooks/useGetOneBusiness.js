import axiosInstance from "../api/axiosConfig";
import { useDispatch } from 'react-redux';
import { setClearSearch, setCurrentSearch } from "../actions/currentSearch";


export const useGetOneBusiness = () => {

    const dispatch = useDispatch();

    return () => {

        const url = new URL( window.location.href );

        const username = url.searchParams.get( 'username' );

        if ( !username ) return dispatch( setClearSearch() );

        axiosInstance.get( '/business-by-username', { headers:{ username } } )
        .then( (response) => {

            dispatch( setCurrentSearch( response.data.business ) );

        } )
        .catch( () => dispatch( setClearSearch() ) );

    };

};