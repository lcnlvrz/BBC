import React from 'react'
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = ( props ) => {

    const { facebookLink, instagramLink, twitterLink, footerSectionOne, footerSectionTwo, footerTitle, footerLastLine } = props;

    return (
        <footer className='bg-black p-5 space-y-5'>
            <div className='flex flex-row justify-between'>
                <div className='flex items-center space-x-2'>
                    <h1 className='text-white text-lg font-semibold'> 
                        { footerTitle }
                    </h1>
                </div>
                <div className='space-x-2'>
                    { facebookLink && 
                    <a href={ facebookLink }>
                        <FacebookIcon
                        className='text-white'
                        />
                    </a> }
                    { instagramLink && 
                    <a href={ instagramLink }>
                        <InstagramIcon
                        className='text-white'
                        />
                    </a> }
                    { twitterLink && 
                    <a href={ twitterLink }>
                        <TwitterIcon
                        className='text-white'
                        />
                    </a> }
                </div>
            </div>
            <div className='footer__questions text-white flex flex-row justify-between space-x-5'>
                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'> 
                        What is Nike? 
                    </h1>
                    <p className='font-light'> 
                        { footerSectionOne }
                    </p>
                </div>
                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'> 
                        Why Nike? 
                    </h1>
                    <p className='font-light'> 
                       { footerSectionTwo }
                    </p>
                </div>
            </div>
            <div className='text-white'>
                <p className='font-light'> 
                   { footerLastLine }
                </p>
            </div>
        </footer>      
    );
};

export default Footer;
