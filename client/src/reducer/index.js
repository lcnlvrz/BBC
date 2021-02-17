import { combineReducers } from 'redux'
import user from './user';
import currentSearch from './currentSearch';
import currentProduct from './currentProduct';
import helmetTitle from './helmetTitle';

const allReducers = combineReducers( {

    user,
    currentSearch,
    currentProduct,
    helmetTitle

} );

export default allReducers;