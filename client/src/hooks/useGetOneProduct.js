import { useDispatch } from 'react-redux';
import { clearCurrentProduct, setCurrentProduct } from '../actions/currentProduct';
import axiosInstance from '../api/axiosConfig';
import { getToken } from '../helpers/getToken';


export const useGetOneProduct = () => {

    const dispatch = useDispatch();

    const url = new URL( window.location.href );

    const userID = url.searchParams.get( 'published' );

    const productID = url.searchParams.get( 'product' );
    
    return () => {

        if ( !userID || !productID ) return dispatch(clearCurrentProduct());

        axiosInstance.get( '/product-by-id', { headers:{ userID, productID } } )
        .then( response =>  dispatch( setCurrentProduct( response.data.product ) )
        )
        .catch( () => dispatch( clearCurrentProduct() ) ); 

    };

};
 


