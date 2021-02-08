import { useDispatch } from 'react-redux';
import { setClearUser, setUser } from '../actions/user';
import axiosInstance from '../api/axiosConfig';
import { useLogout } from './useLogout';

export const useAuth = () => {

    const dispatch = useDispatch();

    const logout = useLogout();

    return () => {

        const token = localStorage.getItem( 'token' );

        if ( !token ) return dispatch( setClearUser() );

        axiosInstance.get( '/user-info', { headers:{ authorization:token } } )
        .then( (response) => {

            dispatch( setUser( response.data.userData ) );

        } )
        .catch( () => logout() );

    };

};