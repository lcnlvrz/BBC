import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { defaultTransiton } from '../../../../../constants';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { IconButton } from '@material-ui/core';


const MenuRight = ( props ) => {

    const { state, setState } = props;

    const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    setState({ ...state, [anchor]: open });
    };

    const options = [ 'search engine', 'real time data', 'about us', 'sign in' ];

  return (
        <Drawer 
        anchor='right' 
        open={state[ 'right' ]} 
        onClose={toggleDrawer('right', false)}>
            <div className='w-full py-10 px-10 space-y-10 flex flex-col items-center justify-center'>
                { options.map( ( option, index ) => (

                    <h1 
                    style={ defaultTransiton }
                    className='font-semibold cursor-pointer text-gray-400 hover:text-gray-700 text-2xl capitalize'
                    key={ index }> 
                        { option } 
                    </h1>

                ) ) }
                <IconButton
                onClick={ () => setState( { right:false } ) }
                style={{ outline:'none' }}
                >
                    <CloseRoundedIcon/>
                </IconButton>
            </div>
        </Drawer>
  );
};

export default MenuRight;