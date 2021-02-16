import React from 'react';
// import { defaultTransiton } from '../../../../../constants';
import { defaultTransiton } from '../../../../../constants/styles';
import OutlineButtonCircle from '../../../../reusableComponents/OutlineButtonCircle';
import logoBBC from '../../../../../images/bccLogo.png';
import { Link } from 'react-router-dom';

const HeaderDesktop = () => {
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

export default HeaderDesktop;
