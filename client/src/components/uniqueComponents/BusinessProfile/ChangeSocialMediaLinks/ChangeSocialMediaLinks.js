import React from 'react'
import ModalOptions from '../../../reusableComponents/Modal';
import { useMediaQuery } from 'react-responsive';
import { defaultTransiton, outlineButton } from '../../../../constants/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const ChangeSocialMediaLinks = ( props ) => {

    const { setCloseModal } = props;

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });
 
    return (

        <ModalOptions setCloseModal={ setCloseModal }>
            <div className={ `bg-white rounded-2xl h-auto ${ mobileResolution ? 'w-3/4' : 'w-2/4' } p-5 outline-none flex flex-col items-center justify-center space-y-5` }>
                <div className='space-x-5'>
                    <FacebookIcon
                    className='text-black'
                    />
                    <input
                    className='outline-none font-light'
                    defaultValue='www.facebook.com/nike'
                    />
                </div>
                <div className='space-x-5'>
                    <InstagramIcon
                    />
                    <input
                    className='outline-none font-light'
                    defaultValue='www.instagram.com/nike'
                    />
                </div>
                <div className='space-x-5'>
                    <TwitterIcon
                    className='text-black'
                    />
                    <input
                    className='outline-none font-light'
                    defaultValue='www.twitter.com/nike'
                    />
                </div>
                <button
                style={ defaultTransiton }
                className={ outlineButton }
                >

                    Save

                </button>
            </div>
        </ModalOptions>

    )
};

export default ChangeSocialMediaLinks;
