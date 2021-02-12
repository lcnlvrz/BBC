import { combineReducers } from 'redux'
import user from './user';
import currentSearch from './currentSearch';
import currentProduct from './currentProduct';

const allReducers = combineReducers( {

    user,
    currentSearch,
    currentProduct

} );

export default allReducers;