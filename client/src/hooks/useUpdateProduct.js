import { useState, useEffect } from 'react';
import { getToken } from '../helpers/getToken';
import { preSubmitUpdateProduct } from '../helpers/preSubmit';
import { useDispatch } from 'react-redux';
import axiosInstance from '../api/axiosConfig';
import { deleteOneProduct, updateOneProduct } from '../actions/user';


export const useUpdateProduct = () => {

    const [isLoading, setIsLoading] = useState( false );

    const [cancelToken, setCancelToken] = useState( false );

    const [alert, setAlert] = useState( { type:'', message:'', severity:'' } );

    const [productID, setProductID] = useState( null );

    const [indexProduct, setIndexProduct] = useState( null );

    const [data, setData] = useState( null );

    const [action, setAction] = useState( '' );

    const dispatch = useDispatch();


    useEffect(() => {

        const token = getToken( dispatch );

        if ( !token ) return setAlert( { type:'', message:'', severity:'' } );
        
        if ( data && action === 'update' ) {

            setAlert( { type:'', message:'', severity:'' } );

            const validation = preSubmitUpdateProduct( data, setAlert );

            if ( !validation ) return false;
            
            const cancelTokenFunction = axiosInstance.CancelToken.source();

            setCancelToken( cancelTokenFunction );

            setIsLoading( true );

            axiosInstance.put( '/update-product', { data, productID }, { headers:{ authorization:token }, cancelToken:cancelTokenFunction.token } )
            .then( response => {

                setIsLoading( false );

                console.log( response );

                dispatch( updateOneProduct( indexProduct, response.data.newInfoProduct ) );


            } )
            .catch( err => {

                console.log( err );

                if ( axiosInstance.isCancel( err ) ) return console.log( 'Request canceled by user' );

                setIsLoading( false );


            } );

        } else if ( data && action === 'delete' ) {

            const cancelTokenFunction = axiosInstance.CancelToken.source();

            setCancelToken( cancelTokenFunction );

            setIsLoading( true );

            axiosInstance.delete( '/delete-product', { headers:{ authorization:token, productID }, cancelToken:cancelTokenFunction.token } )
            .then( (response) => {

                console.log( response );

                setIsLoading( false );

                dispatch( deleteOneProduct( indexProduct ) );

            } )
            .catch( (err) => {

                if ( axiosInstance.isCancel( err ) ) return console.log( 'Request canceled by user' );

                console.log( err.response );

                setIsLoading( false );

                setAlert( { type:'product', message:'Error from server to delete the product. Try again', severity:'error' } );

            } );

        };
        
    }, [ data, dispatch, productID, indexProduct, action ]);

    useEffect(() => {


        return () => { if ( cancelToken ) cancelToken.cancel() };

        
        
    }, [ cancelToken ]);

    return { alert, setAlert, setData, setProductID, isLoading, setIndexProduct, setAction };

};