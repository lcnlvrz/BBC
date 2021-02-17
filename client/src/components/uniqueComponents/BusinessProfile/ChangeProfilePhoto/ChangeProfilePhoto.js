import React from 'react'
import ModalOptions from '../../../reusableComponents/Modal';
import { useMediaQuery } from 'react-responsive';
import { defaultTransiton } from '../../../../constants/styles';
import { usePhoto } from '../../../../hooks/usePhoto';
import AlertAnimation from '../../../reusableComponents/AlertAnimation';
import PhotoPreview from '../../../reusableComponents/PhotoPreview';
import { useDeletePhoto } from '../../../../hooks/useDeletePhoto';
import PropagateLoader from "react-spinners/PropagateLoader";

const ChangeProfilePhoto = ( props ) => {

    const { setCloseModal, endPoint, endPointDelete } = props;

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const { photo, alert, setPhoto, setAlert, isLoading, cancelTokenCloudinary, cancelTokenServer, validatePhoto, uploadPhoto } = usePhoto();

    const { isLoading:isLoadingDeletePhoto, setDeletePhoto, alertFetch, setAlertFetch } = useDeletePhoto();

    const photoPreviewProps = {

        setPhoto, 
        mobileResolution,
        photo,
        isLoading,
        uploadPhoto,
        cancelTokenCloudinary,
        cancelTokenServer,
        endPoint

    };

    return (
        <ModalOptions setCloseModal={ setCloseModal }>
            <div className={ `bg-white rounded-2xl h-auto ${ mobileResolution ? 'w-3/4' : 'w-2/4' } p-5 outline-none` }>
                <ul className='text-center space-y-5'>
                    <label htmlFor='profile-photo'>
                        <li 
                        style={ defaultTransiton }
                        className='cursor-pointer font-semibold text-lg text-green-300 hover:text-green-400' > 
                            Change Photo 
                        </li>
                    </label>
                    <hr/>
                    { !isLoadingDeletePhoto 
                    ?  
                        <li 
                        onClick={ () => setDeletePhoto( { isStartDelete:true, endPoint:endPointDelete } ) }
                        style={ defaultTransiton }
                        className='cursor-pointer font-semibold text-lg text-red-300 hover:text-red-400'> 
                            Delete Photo 
                        </li> 
                    :
                        <div className='py-4'>
                            <PropagateLoader/>
                        </div>
                    }
                    <hr/>
                    <li 
                    onClick={ () => setCloseModal( false ) }
                    style={ defaultTransiton }
                    className='cursor-pointer font-semibold text-lg text-gray-300 hover:text-gray-400'> 
                        Cancel 
                    </li>
                </ul> 
                { alert.type && 
                <AlertAnimation setCloseAlert={ setAlert } {...alert}/>
                }
                { alertFetch.type && 
                <AlertAnimation setCloseAlert={ setAlertFetch } severity={ alertFetch.severity } message={ alertFetch.message }/> }
                <input
                key={ Date.now() }
                onChange={ (e) => validatePhoto( e.target.files[0] ) }
                className='hidden'
                accept="image/*"
                id="profile-photo"
                type="file"
                />
                { photo.file && <PhotoPreview  { ...photoPreviewProps }/> }
            </div>
        </ModalOptions> 
    );
};

export default ChangeProfilePhoto;
