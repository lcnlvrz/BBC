import React from 'react'
import logoBBC from '../../../../../images/bccLogo.png';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { IconButton } from '@material-ui/core';
import MenuRight from '../MenuRight';

const HeaderMobile = () => {

    const [state, setState] = React.useState({
        right:false
    });

    return (
        <header className='p-4 sticky top-0 z-40 bg-white'>
            <div className='flex flex-row items-center justify-between'>
                <img 
                className='w-32'
                src={ logoBBC }
                alt='BBC logo'/>
                <div className='flex flex-col justify-evenly space-x-5 items-center'>
                    <IconButton
                    onClick={ () => setState( { right:true } ) }
                    style={{ color:'black', outline:'none' }}
                    >
                        <MenuRoundedIcon/>
                    </IconButton>
                </div>
                <MenuRight
                state={ state }
                setState={ setState }
                />
            </div>
        </header>
    );
};

export default HeaderMobile;
