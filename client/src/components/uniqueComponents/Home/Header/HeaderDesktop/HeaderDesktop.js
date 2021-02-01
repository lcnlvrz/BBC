import React from 'react';
import { defaultTransiton } from '../../../../../constants';
import OutlineButtonCircle from '../../../../reusableComponents/OutlineButtonCircle';
import logoBBC from '../../../../../images/bccLogo.png';

const HeaderDesktop = () => {
    return (
        <header className='p-4'>
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
                    <OutlineButtonCircle
                    textButton='SIGN IN'
                    />
                </div>
            </div>
        </header>
    );
};

export default HeaderDesktop;
