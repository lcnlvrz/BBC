import React, { useEffect, useState } from 'react';
import HeaderForClient from '../HeaderForClient';
import BCClogo from '../../../images/bccLogo.png';
import LeftMenu from '../../reusableComponents/LeftMenu';
import { outlineButton } from '../../../constants/styles';

const HeaderForBusiness = ( props ) => {

    const { sectionToRender, children } = props;

    return (
        <div className='welcome__page flex flex-row'>
            <LeftMenu 
            width='w-1/5'/>
            <div className='w-4/5 right__part'>
            { sectionToRender !== 'live-chat' && 
            <header className='p-5 flex flex-row justify-between items-center'>
                <img 
                className='w-24'
                alt=''
                src={ BCClogo }
                />
                { sectionToRender === 'business-profile' && 
                <button
                className={ outlineButton }
                >
                    SEE MY PROFILE AS CLIENT
                </button>
                }
            </header> }
            { children }
            </div>
        </div>
        
    );
};

export default HeaderForBusiness;
