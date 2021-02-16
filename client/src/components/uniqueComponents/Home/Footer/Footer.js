import React, { useState } from 'react';
import BBClogoWhite from '../../../../images/bbc-logo-white.png';
import GitHubIcon from '@material-ui/icons/GitHub';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import './Footer.css';

const Footer = () => {

    const footerItems = [ 
        { title:'About Us', text:'Business Client Connection is a free web application useful to service as landing page or presentation letter to business. With our platform you can create a business profile, showing to the clients/potential clients what does your business do, presentation, advantages, location, schedule, products/services and more essential information. Besides, we have our major feature which is live chat. ' }, 
        { title:'Our Mision', text:'This application was created with the only purpose to help small - medium business to improve their conversion ratio offering a business profile where clients can arrive and interact.'}, { title:'Origin', text:"BCC was created mainly for two reasons. First because most of the small-medium business don't have enough money to develop an web application. Second reason because usually social media like  instagram is a little limited and don't allow business to presentate their business well. This application was made only for business and more focus on retail." },
        { title:'The creator', text:'This application was programmed by Luciano Alvarez, a young argentinian programmer who lives in Tucuman, Argentina and loves develop solutions.' } ];

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
