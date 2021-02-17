import React from 'react';
import BBClogoWhite from '../../../../images/bbc-logo-white.png';
import GitHubIcon from '@material-ui/icons/GitHub';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import './Footer.css';
import { footerContent } from '../../../../constants/content';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = () => {


    return (
        <footer className='bg-black p-5'>
            <img
            className='w-20'
            src={ BBClogoWhite }
            alt='BCC LOGO'/>
            <div className='flex flex-row flex-wrap items-start justify-between w-full'>
                { footerContent.map( ( item, index ) => (

                    <div 
                    key={ index }
                    className='my-5 space-y-4 w-2/5'>
                        <h4 className='font-semibold text-white text-2xl'> 
                            { item.title } 
                        </h4>
                        <p className='text-white font-light'> 
                            { item.text }
                        </p>
                    </div>

                ) ) }
            </div>
            <h3 className='text-white text-center text-2xl font-semibold my-5'> 
                ¿Do you have any suggestions to improve the project? 
            </h3>
            <p className='text-white text-center my-5'>  Contact me: 
            </p>
            <li className='flex flex-row items-center justify-evenly'>
                <ul>
                    <a href='https://www.github.com/lcnlvrz' rel='noreferrer' target='_blank'>
                        <GitHubIcon 
                        className='github__link'
                        style={{ color:'#ccc' }}/>
                    </a>  
                </ul>
                <ul> 
                    <a href='mailto:lucianoalvarez1212@gmail.com' 
                    rel='noreferrer' target='_blank'>
                        <AlternateEmailRoundedIcon
                        className='email__link'
                        style={{ color:'ccc' }}/>
                    </a> 
                </ul>
                <ul>
                    <a 
                    href='https://www.linkedin.com/in/luciano-alvarez/' rel='noreferrer' target='_blank'>
                        <LinkedInIcon
                        className='text-gray-300 hover:text-white'
                        />
                    </a> 
                </ul>
            </li>
        </footer>
    );
};

export default Footer;
