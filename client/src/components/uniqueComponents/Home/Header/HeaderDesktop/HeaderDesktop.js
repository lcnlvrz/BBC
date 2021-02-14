import React from 'react';
// import { defaultTransiton } from '../../../../../constants';
import { defaultTransiton } from '../../../../../constants/styles';
import OutlineButtonCircle from '../../../../reusableComponents/OutlineButtonCircle';
import logoBBC from '../../../../../images/bccLogo.png';
import { Link } from 'react-router-dom';

const HeaderDesktop = () => {
    return (
        <header className='p-4 sticky top-0 z-40 bg-white'>
            <div className='flex flex-row items-center justify-between'>
                <img 
                className='w-32'
                src={ logoBBC }
                alt='BBC logo'/>
                <div className='flex flex-row justify-evenly space-x-5 items-center'>
                    <h3 
                    style={ defaultTransiton }
                    className='cursor-pointer text-gray-300 hover:text-gray-500 hover:font-semibold'>     
                       SEARCH ENGINE
                    </h3> 
                    <h3 
                    style={ defaultTransiton }
                    className='cursor-pointer text-gray-300 hover:text-gray-500'>     
                        REAL TIME
                    </h3>
                    <h3 
                    style={ defaultTransiton }
                    className='cursor-pointer text-gray-300 hover:text-gray-500 hover:font-semibold'>     
                       ABOUT US
                    </h3>
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
