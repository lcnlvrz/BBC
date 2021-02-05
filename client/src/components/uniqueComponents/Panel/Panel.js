import React from 'react';
import { useMediaQuery } from 'react-responsive';
import HeaderForBusiness from '../HeaderForBusiness';
import HeaderMobile from '../HeaderForBusiness/HeaderMobile/HeaderMobile';
import HeaderDesktop from '../Home/Header/HeaderDesktop';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import BorderBottomRoundedIcon from '@material-ui/icons/BorderBottomRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import HourglassFullRoundedIcon from '@material-ui/icons/HourglassFullRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import { defaultTransiton } from '../../../constants/styles';
import { Link } from 'react-router-dom';

const Panel = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const sections = [ { title:'Real-Time Data', items:[ { title:'Personal Working now', value:52, icon:WorkRoundedIcon }, { title:'Clients in the shop', value:25, icon:PeopleAltRoundedIcon }, { title:'Last update', value:'45 minutes ago', icon:TimerRoundedIcon } ], icon:TimelineRoundedIcon, route:'/business/real-time-data' }, { title:'Business Profile', icon:BusinessRoundedIcon, items:[ { title:'Banner', value:true, icon:ImageRoundedIcon }, { title:'Presentation', value:true, icon:ContactSupportRoundedIcon }, { title:'Real-Time Data', icon:TimelineRoundedIcon, value:false }, { title:'Products', value:false, icon:ShoppingBasketRoundedIcon }, { title:'Footer', icon:BorderBottomRoundedIcon , value:true } ], route:'/business/profile' }, { title:'Products', icon:ShoppingBasketRoundedIcon, items:[ { title:'Quantity published', value:150, icon:PublishRoundedIcon }, { title:'Description completed', value:false, icon:DescriptionRoundedIcon }, { title:'Last update', value:'45 minutes ago', icon:TimerRoundedIcon } ], route:'/business/products' } ];

    const numbers = [ 0, 1, 2 ];
    
    const DataPanel = () => {

        return ( 

            <div className='container__all__sections flex flex-col p-2 space-y-10'>
                { sections.map( ( section, index ) => (

                    <Link 
                    to={ section.route }
                    key={ index }>
                        <div
                        style={ defaultTransiton } 
                        key={ section.title }
                        className={ `w-full flex flex-row justify-evenly items-center ${ mobileResolution ? 'space-y-5' : 'space-x-5' } one__section flex-wrap rounded-2xl shadow-lg cursor-pointer p-5 bg-white hover:bg-black hover:text-white` }>
                            <div className='flex flex-col items-center w-40'>
                                <section.icon
                                style={{ fontSize:'120px' }}
                                />
                                <h1 className='font-semibold'> 
                                    { section.title }
                                </h1>
                            </div>
                            <div className='flex flex-col space-y-3 w-60  items-start'>
                                { section.items.map( ( item, index ) => (


                                    <div
                                    key={ index }
                                    className='one__item flex flex-row items-center space-x-2'>

                                        <item.icon/>
                                        <h3 className='font-light'> 
                                            { item.title }: 
                                        </h3>
                                        { item.value === true ? <DoneRoundedIcon className='text-green-400'/> : item.value === false ? <HourglassFullRoundedIcon className='text-red-500'/> : <h2 className='font-semibold'> { item.value } </h2> }
                                        
                                    </div>

                                ) ) }
                            </div>
                        </div>
                    </Link>
                ) ) }
                
            </div>

        );

    };

    return <DataPanel/> ;
};

export default Panel;