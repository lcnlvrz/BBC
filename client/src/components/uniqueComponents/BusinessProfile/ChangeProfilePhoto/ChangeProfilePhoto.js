import React from 'react'
import ModalOptions from '../../../reusableComponents/Modal';
import { useMediaQuery } from 'react-responsive';
import { defaultTransiton } from '../../../../constants/styles';
import { usePhoto } from '../../../../hooks/usePhoto';
import AlertAnimation from '../../../reusableComponents/AlertAnimation';
import PhotoPreview from '../../../reusableComponents/PhotoPreview';

const ChangeProfilePhoto = ( props ) => {

    const { setCloseModal } = props;

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const { photo, alert, setData, setPhoto, setAlert, setUpload, isLoading, cancelTokenCloudinary, cancelTokenServer } = usePhoto();


    return (
        <>
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
                    <li 
                    style={ defaultTransiton }
                    className='cursor-pointer font-semibold text-lg text-red-300 hover:text-red-400'> 
                        Delete Photo 
                    </li>
                    <hr/>
                    <li 
                    onClick={ () => {

                        setCloseModal( false );

                    } }
                    style={ defaultTransiton }
                    className='cursor-pointer font-semibold text-lg text-gray-300 hover:text-gray-400'> 
                        Cancel 
                    </li>
                </ul> 
                { alert.type && 
                <AlertAnimation setCloseAlert={ setAlert } severity={ alert.severity } message={ alert.message }/>
                }
                <input
                key={ Date.now() }
                onChange={ (e) => setData( e.target.files[0] ) }
                className='hidden'
                accept="image/*"
                id="profile-photo"
                type="file"
                />
            </div>
        </ModalOptions> 
        { photo.file &&  
        <PhotoPreview setPhoto={ setPhoto } mobileResolution={ mobileResolution } photo={ photo } isLoading={ isLoading } setUpload={ setUpload } cancelTokenCloudinary={ cancelTokenCloudinary } cancelTokenServer={ cancelTokenServer } endPoint='/profile-photo'/> }
        </>
        

    );
};

export default ChangeProfilePhoto;
