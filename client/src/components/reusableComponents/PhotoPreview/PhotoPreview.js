import { IconButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import ModalOptions from '../Modal';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import PropagateLoader from "react-spinners/PropagateLoader";

const PhotoPreview = ( props ) => {

    const { setPhoto, mobileResolution, photo, isLoading, setUpload, cancelTokenCloudinary, cancelTokenServer, endPoint } = props;

    console.log( endPoint );

    useEffect(() => {

        return () => {

            if ( cancelTokenCloudinary ) cancelTokenCloudinary.cancel();

            if ( cancelTokenServer ) cancelTokenServer.cancel();

            setUpload( { isStartFetch:false, endPoint:'' } );

        };
       
    }, [ cancelTokenCloudinary, cancelTokenServer, setUpload ]);


    return (
        <ModalOptions setCloseModal={ setPhoto }>
            <div className={ `bg-white rounded-2xl h-auto ${ mobileResolution ? 'w-3/4' : 'w-2/4' } p-5 outline-none space-y-5` }>
                <img 
                className='w-full h-64 object-contain'
                src={ photo.tempURL } 
                alt=''/> 
                <div className='flex flex-row items-center justify-center w-full space-x-10'>
                    { !isLoading ?
                    <> 
                        <IconButton
                        onClick={ () => setUpload( { isStartFetch:true, endPoint } ) }
                        style={{ outline:'none' }}
                        >
                            <PublishRoundedIcon
                            className='text-green-400'
                            />
                        </IconButton>
                        <IconButton
                        onClick={ () => setPhoto( { photo:null, file:null } ) }
                        style={{ outline:'none' }}
                        >
                            <CancelRoundedIcon
                            className='text-red-500'
                            /> 
                        </IconButton> 
                    </>
                    :
                    <div className='my-5'>
                        <PropagateLoader/>
                    </div>}
                </div> 
            </div>
        </ModalOptions>
    );
};

export default PhotoPreview;
