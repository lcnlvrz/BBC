import { combineReducers } from 'redux'
import user from './user';
import currentSearch from './currentSearch';

const allReducers = combineReducers( {

    user,
    currentSearch

} );

export default allReducers;