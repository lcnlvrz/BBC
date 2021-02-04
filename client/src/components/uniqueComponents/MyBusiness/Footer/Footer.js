import React from 'react'
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = () => {
    return (
        <footer className='bg-black p-5 space-y-5'>
            <div className='flex flex-row justify-between'>
                <div className='flex items-center space-x-2'>
                    <h1 className='text-white text-lg font-semibold'> 
                        Nike  <span className='font-light'> | Oficial Business</span>
                    </h1>
                </div>
                <div className='space-x-2'>
                    <FacebookIcon
                    className='text-white'
                    />
                    <InstagramIcon
                    className='text-white'
                    />
                    <TwitterIcon
                    className='text-white'
                    />
                </div>
            </div>
            <div className='footer__questions text-white flex flex-row justify-between space-x-5'>
                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'> 
                        What is Nike? 
                    </h1>
                    <p className='font-light'> 
                        Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing.
                    </p>
                </div>
                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'> 
                        Why Nike? 
                    </h1>
                    <p className='font-light'> 
                        Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment
                    </p>
                </div>
            </div>
            <div className='text-white'>
                <p className='font-light'> 
                    Nike All Rights Reserved. 
                </p>
            </div>
        </footer>      
    );
};

export default Footer;
