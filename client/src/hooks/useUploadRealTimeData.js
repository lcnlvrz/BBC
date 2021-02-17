import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateRealTimeData } from '../actions/user';
import axiosInstance from '../api/axiosConfig';
import { getToken } from '../helpers/getToken';

export const useUploadRealTimeData = () => {

    const [isLoading, setIsLoading] = useState( false );

    const [cancelToken, setCancelToken] = useState( null );

    const [alert, setAlert] = useState( { type:'', message:'', severity:'' } );

    const dispatch = useDispatch();

    const update = ( data ) => {

        const token = getToken( dispatch );

        if ( !token ) return setAlert( { type:'invalidToken', message:"The token isn't valid", severity:'error' } );

        const { personalWorking:personalWorkingString, clientsInTheShop:clientsInTheShopString, fieldChanged } = data;

        const personalWorking = Number( personalWorkingString );

        const clientsInTheShop = Number( clientsInTheShopString );

        const isValidPersonalWorking = Number.isInteger(  personalWorking  );
        const isValidClientsInTheShop = Number.isInteger( clientsInTheShop );

        if ( !isValidClientsInTheShop || clientsInTheShop < 1 || !isValidPersonalWorking || personalWorking < 1 ) return setAlert( { type:'NaN', message:'The quantity have to be numbers more than 0', severity:'error' } );

        const cancelTokenFunction = axiosInstance.CancelToken.source();

        setCancelToken( cancelTokenFunction );

        setIsLoading( true );

        let endPoint = '';

        if ( fieldChanged === 'clientsInTheShop' ) endPoint = '/clients-in-shop';

        if ( fieldChanged === 'personalWorking' ) endPoint = '/personal-working';

        axiosInstance.put( endPoint, { personalWorking, clientsInTheShop }, { headers:{ authorization:token } } )
        .then( response => {
            
            dispatch( updateRealTimeData( response.data.newRealTimeInfo ) );
            setIsLoading( false );
            setAlert( { message:'Data updated successfully', severity:'success', type:'OK' } );
            

        } )
        .catch( err => {

            if ( axiosInstance.isCancel( err ) ) return console.log( 'Request canceled by user' );

            setIsLoading( false );

            setAlert( { message:err.response.data.message, severity:'error', type:'rejected update' } );

        } );

    };

    useEffect(() => {

        return () => { if ( cancelToken ) cancelToken.cancel() };
        
    }, [ cancelToken ]);

    return { alert, setAlert, isLoading, update };

};