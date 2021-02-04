import React from 'react';
import HeaderForClient from '../HeaderForClient';
import BCClogo from '../../../images/bccLogo.png';

const HeaderForBusiness = () => {
    return (
        <header className='p-5'>
            <img 
            className='w-24'
            alt=''
            src={ BCClogo }
            />
        </header>
    );
};

export default HeaderForBusiness;
