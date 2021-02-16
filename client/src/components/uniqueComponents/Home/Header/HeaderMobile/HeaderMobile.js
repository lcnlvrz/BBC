import React from 'react'
import logoBBC from '../../../../../images/bccLogo.png';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { IconButton } from '@material-ui/core';
import MenuRight from '../MenuRight';
import { Link } from 'react-router-dom';
import OutlineButtonCircle from '../../../../reusableComponents/OutlineButtonCircle';

const HeaderMobile = () => {

    return (
        <header className='p-4 fixed w-full top-0 z-40 bg-white'>
            <div className='flex flex-row items-center justify-between'>
                <img 
                className='w-32'
                src={ logoBBC }
                alt='BBC logo'/>
                <div className='flex flex-row justify-evenly space-x-5 items-center'>
                    <Link to='/sign-in'>
                        <OutlineButtonCircle
                        textButton='SIGN IN'
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default HeaderMobile;
