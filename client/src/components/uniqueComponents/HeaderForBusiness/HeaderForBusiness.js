import React from 'react';
import HeaderForClient from '../HeaderForClient';
import BCClogo from '../../../images/bccLogo.png';
import LeftMenu from '../../reusableComponents/LeftMenu';
import WelcomeMessage from '../../reusableComponents/WelcomeMessage';
import { outlineButton } from '../../../constants/styles';

const HeaderForBusiness = ( props ) => {

    const { HtmlData, setChangeSection } = props;

    const url = new URL( window.location.href );

    const section = url.searchParams.get( 'section' );

    return (
        <div className='welcome__page flex flex-row'>
            <LeftMenu 
            setChangeSection={ setChangeSection }
            width='w-1/5'/>
            <div className='w-4/5 right__part'>
            <header className='p-5 flex flex-row justify-between items-center'>
                <img 
                className='w-24'
                alt=''
                src={ BCClogo }
                />
                { section === 'business-profile' && 
                <button
                className={ outlineButton }
                >
                    SEE MY PROFILE AS CLIENT
                </button>
                }
            </header>
            <HtmlData/>
            </div>
        </div>
        
    );
};

export default HeaderForBusiness;
