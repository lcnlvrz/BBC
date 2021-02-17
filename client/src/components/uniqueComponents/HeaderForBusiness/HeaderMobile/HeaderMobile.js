import React from 'react';
import BCClogo from '../../../../images/bccLogo.png';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { IconButton } from '@material-ui/core';
import LeftMenu from '../../../reusableComponents/LeftMenu';
import { Fragment } from 'react';

const HeaderMobile = (props) => {

    const { isOnlyButton, color } = props;
    
    const [state, setState] = React.useState({ left:false });

    const toggleDrawer = (anchor, open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };

    const ButtonDrawer = () => {
      return (
        <Fragment>
            <IconButton
            onClick={toggleDrawer('left', true)}
            style={{ outline:'none', color: isOnlyButton ? color : 'black' }}
            >
                <MenuRoundedIcon />
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
        </Fragment>
      );
    };
  
    const list = (anchor) => (
      <LeftMenu 
      width='w-52'/>
    );
  
    if ( isOnlyButton ) return <ButtonDrawer/>

    return (
      <header className='p-5 flex flex-row overflow-hidden w-full justify-between items-center fixed top-0 bg-white z-30'>
        <ButtonDrawer/>
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
