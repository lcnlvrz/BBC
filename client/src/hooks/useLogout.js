import { useDispatch } from 'react-redux';
import { setClearUser } from '../actions/user';

export const useLogout = () => {

    const dispatch = useDispatch();

    return () => {

        localStorage.removeItem( 'token' );
        dispatch( setClearUser() );

    };

};