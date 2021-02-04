import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { defaultTransiton } from '../../../constants/styles';

const LeftMenu = ( props ) => {

    const { width } = props;

    const options = [ { title:'Home', Icon:HomeRoundedIcon }, { title:'Real-Time Data', Icon:TimelineRoundedIcon },{ title:'Business Profile', Icon:BusinessRoundedIcon }, { title:'Real-Time Data', Icon:TimelineRoundedIcon }, { title:'Products', Icon:ShoppingBasketRoundedIcon }, { title:'Business Profile', Icon:BusinessRoundedIcon }, { title:'Real-Time Data', Icon:TimelineRoundedIcon }, { title:'Products', Icon:ShoppingBasketRoundedIcon } ];

    
    const [currentOption, setCurrentOption] = useState( 0 );

    const useStyles = makeStyles((theme) => ({
        large: {
          width: theme.spacing(10),
          height: theme.spacing(10)
        },
      }));
    
      const classes = useStyles();

    return (
        <div className={ `left__part bg-green-400 p-5 flex h-screen justify-start flex-col space-y-5 ${ width }` }>
        <div className='flex flex-col items-center space-y-2'>
            <Avatar
            src='https://i.pinimg.com/originals/4d/96/2d/4d962dee72fa76f023d411e20d30690c.jpg'
            className={ classes.large }
            />
            <h3 className='font-semibold text-white text-lg'> 
                Nike 
            </h3>
        </div>
        <div className='all__options flex flex-col'>
            <div className='group__one flex-col flex space-y-5'>
                { options.map( ( option, index ) => (

                    <div 
                    style={ defaultTransiton }
                    key={ index }
                    className={ `one__option flex flex-row w-full space-x-2 ${ currentOption === index ? 'text-white' : 'text-gray-300' } hover:text-white cursor-pointer` }>
                        { currentOption === index && 
                        <h3> | </h3> }
                        <option.Icon/>
                        <h3 
                        onClick={ () => setCurrentOption( index ) }
                        className={ `text-sm ${ index === currentOption ? 'font-semibold' : 'font-light' }` }> 
                            { option.title }
                        </h3>
                    </div>

                ) ) } 

            </div>

        </div>

    </div>
    );
};

export default LeftMenu;
