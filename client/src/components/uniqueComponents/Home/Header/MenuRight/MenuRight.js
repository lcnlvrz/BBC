import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { defaultTransiton } from '../../../../../constants/styles';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';


const MenuRight = ( props ) => {

    const { state, setState } = props;

    const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    setState({ ...state, [anchor]: open });
    };

    const options = [ { title:'Search Engine', route:'/search-engine' }, { title:'Real Time Data', route:'/real-time-data' }, { title:'About Us', route:'/about-us' }, { title:'Sign In', route:'/sign-in' } ];


  return (
        <Drawer 
        anchor='right' 
        open={state[ 'right' ]} 
        onClose={toggleDrawer('right', false)}>
            <div className='w-full py-10 px-10 space-y-10 flex flex-col items-center justify-center'>
                { options.map( ( option, index ) => (

                    <Link to={ option.route } key={ index }>
                        <h1 
                        style={ defaultTransiton }
                        className='font-semibold cursor-pointer text-gray-400 hover:text-gray-700 text-2xl capitalize'> 
                            { option.title } 
                        </h1>
                    </Link>

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