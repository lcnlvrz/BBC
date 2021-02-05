import React from 'react';
import HeaderForClient from '../HeaderForClient';
import BCClogo from '../../../images/bccLogo.png';
import LeftMenu from '../../reusableComponents/LeftMenu';
import WelcomeMessage from '../../reusableComponents/WelcomeMessage';

const HeaderForBusiness = ( props ) => {

    const { HtmlData, setChangeSection } = props;

    return (
        <div className='welcome__page flex flex-row'>
            <LeftMenu 
            setChangeSection={ setChangeSection }
            width='w-1/5'/>
            <div className='w-4/5 right__part'>
            <header className='p-5'>
                <img 
                className='w-24'
                alt=''
                src={ BCClogo }
                />
            </header>
            <HtmlData/>
            </div>
        </div>
        
    );
};

export default HeaderForBusiness;
