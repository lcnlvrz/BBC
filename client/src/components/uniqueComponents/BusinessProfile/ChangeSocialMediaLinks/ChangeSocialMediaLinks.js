import React from 'react'
import ModalOptions from '../../../reusableComponents/Modal';
import { useMediaQuery } from 'react-responsive';
import { defaultTransiton, outlineButton } from '../../../../constants/styles';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';
import { IconButton, InputBase } from '@material-ui/core';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import { useUploadSocialMedia } from '../../../../hooks/useUploadSocialMedia';
import PropagateLoader from "react-spinners/PropagateLoader";
import AlertAnimation from '../../../reusableComponents/AlertAnimation';
import { socialsMedia } from '../../../../constants/content';

const ChangeSocialMediaLinks = ( props ) => {

    const { setCloseModal } = props;

    const { isLoading, setAlert, alert, upload, disable, input, setInput, setDisable, validateForm } = useUploadSocialMedia();

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const SocialMedia = ( props ) => {

        const { socialMedia } = props;

        return (

            <div 
            key={ socialMedia.id }
            className='space-x-5 flex flex-row items-center'>
                <socialMedia.icon
                className='text-green-400'
                />
                <InputBase
                disabled={ disable[ socialMedia.id ] }
                ref={ socialMedia.ref }
                name={ `${ socialMedia.id }Link` }
                placeholder={ `Type your business's ${ socialMedia.id }` }
                className='outline-none font-light w-full'
                value={ input[ `${ socialMedia.id }Link` ] }
                />
                { disable[ socialMedia.id ] 
                ?
                <IconButton
                onClick={ () => {

                    setDisable( { ...disable, [ socialMedia.id ]:false } );

                    setInput( { ...input, [ `${ socialMedia.id }Link` ]: `https://${ socialMedia.id }.com/` } );

                } }
                style={{ outline:'none' }}
                >
                    <VisibilityRoundedIcon className='text-green-400'/>
                </IconButton>
                :
                <IconButton
                onClick={ () => {

                    setDisable( { ...disable, [ socialMedia.id ]:true } );

                    setInput( { ...input, [ `${ socialMedia.id }Link` ]:'' } );

                } }
                style={{ outline:'none' }}
                >
                    <VisibilityOffRoundedIcon className='text-red-500'/>
                </IconButton>
                }
            </div>

        );

    };


    return (
        <ModalOptions setCloseModal={ setCloseModal }>
            <form 
            onSubmit={ (e) => upload( input, e, setCloseModal ) }
            onChange={ (e) => validateForm( e ) }
            className={ `bg-white rounded-2xl h-auto ${ mobileResolution ? 'w-3/4' : 'w-2/4' } p-5 outline-none flex flex-col items-center justify-center space-y-5` }>
                { socialsMedia.map( ( socialMedia ) => (

                    <SocialMedia key={ socialMedia.id } socialMedia={ socialMedia } />

                ) ) }
                { !isLoading ? 
                <button type='submit'style={ defaultTransiton }className={ outlineButton }>
                    Save
                </button> 
                :
                <div className='py-5'>
                    <PropagateLoader/>
                </div>
                }
                { alert.type && <AlertAnimation { ...alert } setCloseAlert={ setAlert }/> }
            </form>
        </ModalOptions>
    );
};

export default ChangeSocialMediaLinks;
