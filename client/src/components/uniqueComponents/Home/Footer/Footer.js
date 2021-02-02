import React, { useState } from 'react';
import BBClogoWhite from '../../../../images/bbc-logo-white.png';
import GitHubIcon from '@material-ui/icons/GitHub';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import './Footer.css';

const Footer = () => {

    const footerItems = [ 
        { title:'About Us', text:'BBC is an application web that connect business and client for best communiccation. We generate two benefits, one for client and another for the business. All win using our plataform.' }, 
        { title:'Our Mision', text:'This application was created with the only purpose to help small - medium business to improve there comunication with clients'}, { title:'Origin', text:"The idea originated mainly for the bad service client of business. A lot of them not pick up the telephone when any client call them. Sometimes when one client go to the location on that moment knows when the shop are full, there are'nt stock available, it closed, prices changed, and more things like this. These stuff happens when the communication is not clear. BCC is here to fix that." },
        { title:'The creator', text:'This application was programmed by Luciano Alvarez, a young argentinian programmer who lives in Tucuman, Argentina who loves create  solutions for  business by programming' } ];

        const [colorLinkedinLogo, setColorLinkedinLogo] = useState( 'c2c2c2' );

        console.log( colorLinkedinLogo );

    return (
        <footer className='bg-black p-5'>
            <img
            className='w-20'
            src={ BBClogoWhite }
            alt='BCC LOGO'/>
            <div className='flex flex-row flex-wrap items-start justify-between w-full'>
                { footerItems.map( ( item, index ) => (

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
                        <img
                        className='linkedin__link'
                        src={`https://icongr.am/entypo/linkedin.svg?size=25&color=ffffff`}
                        alt='linkedin icon'/> 
                    </a> 
                </ul>
            </li>
        </footer>
    );
};

export default Footer;
