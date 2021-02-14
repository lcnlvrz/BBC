import React, { useEffect, useState } from 'react';
import HeaderForClient from '../HeaderForClient';
import BCClogo from '../../../images/bccLogo.png';
import LeftMenu from '../../reusableComponents/LeftMenu';
import { outlineButton } from '../../../constants/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HeaderForBusiness = ( props ) => {

    const { sectionToRender, children } = props;

    const user = useSelector(state => state.user);

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
                <Link to={ `/search/business/?username=${ user.username }` }>
                    <button
                    className={ outlineButton }
                    >
                        SEE MY PROFILE AS CLIENT
                    </button>
                </Link>
                }
            </header> }
            { children }
            </div>
        </div>
        
    );
};

export default HeaderForBusiness;
