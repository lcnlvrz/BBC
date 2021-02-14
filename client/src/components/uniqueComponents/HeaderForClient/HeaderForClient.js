import React from 'react';
import { Link } from 'react-router-dom';
import BCClogo from '../../../images/bccLogo.png';

const HeaderForClient = () => {
    return (
        <header 
        style={{ zIndex:100 }}
        className='flex items-center  py-2 fixed top-0 
        bg-white justify-center header__bcc w-full'>
            <Link to='/'>
                <img
                className='w-16'
                alt='' 
                src={ BCClogo }/>
            </Link>
        </header>
    );
};

export default HeaderForClient;
