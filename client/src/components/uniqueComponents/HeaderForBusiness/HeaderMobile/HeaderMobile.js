import React, { useState } from 'react';
import BCClogo from '../../../../images/bccLogo.png';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { Avatar, Fade, IconButton } from '@material-ui/core';
import LeftMenu from '../../../reusableComponents/LeftMenu';
import { outlineButton } from '../../../../constants/styles';


const HeaderMobile = (props) => {

    const { setChangeSection } = props;
    
    const [state, setState] = React.useState({ left:false });

    const url = new URL( window.location.href );

    const section = url.searchParams.get( 'section' );



    const toggleDrawer = (anchor, open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
   
  
    const list = (anchor) => (
      <LeftMenu 
      // setChangeSection={ setChangeSection }
      width='w-52'/>
    );
  

    return (
      
        <header className='p-5 flex flex-row w-full justify-between items-center sticky top-0 bg-white z-30'>
                <IconButton
                onClick={toggleDrawer('left', true)}
                style={{ outline:'none' }}
                >
                    <MenuRoundedIcon
                    className='text-black'
                    />
                </IconButton>
                <SwipeableDrawer
                className='w-36'
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
                >
                {list('left')}
                </SwipeableDrawer>
                <img 
                className='w-20'
                alt=''
                src={ BCClogo }
                />

                <IconButton
                disabled
                className='ghost__filler'
                style={{ outline:'none', opacity:0, cursor:'none' }}
                >
                  <MenuRoundedIcon
                  style={{ color:'black' }}
                  />
                </IconButton>
            </header>
    );
};

export default HeaderMobile;
