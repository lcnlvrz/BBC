import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { defaultTransiton } from '../../../constants/styles';
import { Link } from 'react-router-dom';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

const LeftMenu = ( props ) => {

    const { width, setChangeSection } = props;

    const options = [ { title:'Home', Icon:HomeRoundedIcon, route:'/business/?section=panel' }, { title:'Real-Time Data', Icon:TimelineRoundedIcon, route:'/business/?section=real-time-data' },{ title:'Business Profile', Icon:BusinessRoundedIcon, route:'/business/?section=business-profile' }, { title:'Products', Icon:ShoppingBasketRoundedIcon, route:'/business/?section=products' }, { title:'Add Product', Icon:AddCircleRoundedIcon, route:'/business/?section=add-product' } ];

    const url = new URL( window.location.href );

    const currentSection = url.searchParams.get( 'section' );

    const [currentOption, setCurrentOption] = useState( 0 );

    useEffect(() => {

        if ( currentSection === 'panel' ) return setCurrentOption( 0 );

        if ( currentSection === 'real-time-data' ) return setCurrentOption( 1 );

        if ( currentSection === 'business-profile' ) return setCurrentOption( 2 );

        if ( currentSection === 'products' ) return setCurrentOption( 3 );

        if ( currentSection === 'add-product' ) return setCurrentOption( 4 );
        
    }, []);

    const useStyles = makeStyles((theme) => ({
        large: {
          width: theme.spacing(10),
          height: theme.spacing(10)
        },
      }));
    
      const classes = useStyles();

    return (
        <div className={ `left__part bg-green-400 p-5 flex h-screen justify-start flex-col space-y-5 ${ width } sticky top-0 z-30` }>
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

                        <Link 
                        key={ index }
                        onClick={ () => {

                            setChangeSection( [ true ] );

                        } }
                        to={ option.route }>
                            <div 
                            onClick={ () => setCurrentOption( index ) }
                            style={ defaultTransiton }
                            className={ `one__option flex flex-row w-full space-x-2 ${ currentOption === index ? 'text-white' : 'text-blue-900' } hover:text-white cursor-pointer` }>
                                { currentOption === index && 
                                <h3> | </h3> }
                                <option.Icon
                                />
                                <h3 
                                className={ `text-sm ${ index === currentOption ? 'font-semibold' : 'font-light' }` }> 
                                    { option.title }
                                </h3>
                            </div>
                        </Link>

                    ) ) } 

                </div>

            </div>

    </div>
    );
};

export default LeftMenu;
