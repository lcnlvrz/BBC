import React from 'react'
import ModalOptions from '../../../reusableComponents/Modal';
import { useMediaQuery } from 'react-responsive';
import { defaultTransiton } from '../../../../constants/styles';


const ChangeProfilePhoto = ( props ) => {

    const { setCloseModal } = props;

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });


    return (

        <ModalOptions setCloseModal={ setCloseModal }>
            <div className={ `bg-white rounded-2xl h-auto ${ mobileResolution ? 'w-3/4' : 'w-2/4' } p-5 outline-none` }>
                <ul className='text-center space-y-5'>
                    <li 
                    style={ defaultTransiton }
                    className='cursor-pointer font-semibold text-lg text-green-300 hover:text-green-400' > 
                        Change Photo 
                    </li>
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
            </div>
        </ModalOptions>

    );
};

export default ChangeProfilePhoto;
