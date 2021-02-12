import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = ( props ) => {

    const { facebookLink, instagramLink, twitterLink, footerSectionOne, footerSectionTwo, footerTitle, footerLastLine } = props;

    return (
        <footer className='bg-black p-5 space-y-5'>
            <div className='flex flex-row justify-between w-full'>
                <div className='flex items-center space-x-2 w-1/2 break-words truncate'>
                    <h1 className='text-white text-lg font-semibold break-words'> 
                        { footerTitle }
                    </h1>
                </div>
                <div className='space-x-2 w-1/2 text-right'>
                    { facebookLink && 
                    <a 
                    rel='noreferrer'
                    target='_blank'
                    href={ facebookLink }>
                        <FacebookIcon
                        className='text-white'
                        />
                    </a> }
                    { instagramLink && 
                    <a 
                    rel='noreferrer'
                    target='_blank'
                    href={ instagramLink }>
                        <InstagramIcon
                        className='text-white'
                        />
                    </a> }
                    { twitterLink && 
                    <a 
                    rel='noreferrer'
                    target='_blank'
                    href={ twitterLink }>
                        <TwitterIcon
                        className='text-white'
                        />
                    </a> }
                </div>
            </div>
            <div className='footer__questions text-white flex flex-row justify-between w-full'>
                <div className='space-y-2 w-1/2'>
                    <p className='font-light break-words'> 
                        { footerSectionOne }
                    </p>
                </div>
                <div className='space-y-2 w-1/2'>
                    <p className='font-light text-right break-words'> 
                       { footerSectionTwo }
                    </p>
                </div>
            </div>
            <div className='text-white w-full'>
                <p className='font-light break-words'> 
                   { footerLastLine }
                </p>
            </div>
        </footer>      
    );
};

export default Footer;
