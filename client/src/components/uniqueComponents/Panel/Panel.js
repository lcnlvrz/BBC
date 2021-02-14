import React, { useEffect, useState } from 'react';
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
import { Fade } from '@material-ui/core';
import { useSelector } from 'react-redux';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import QueryBuilderRoundedIcon from '@material-ui/icons/QueryBuilderRounded';
import InstagramIcon from '@material-ui/icons/Instagram';
import moment from 'moment';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const Panel = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const user = useSelector(state => state.user);

    const [lastUpdateRealTime, setlastUpdateRealTime] = useState(0);

    useEffect(() => {

        if ( !user.isLoading && user.userID ) {

            const lastUpdateWorking = user.lastUpdatePersonalWorking;
            const lastUpdateClientsInTheShop = user.lastUpdateClientsInTheShop;

            if ( lastUpdateWorking > lastUpdateClientsInTheShop ) {

                const isValid = moment( lastUpdateWorking ).isValid();

                if ( !isValid ) return false;
                
                const parse = moment.unix( lastUpdateWorking ).format();
                const timeAgo = moment( parse ).fromNow();
                setlastUpdateRealTime( timeAgo );

            } else {

                const isValid = moment( lastUpdateClientsInTheShop ).isValid();

                if ( !isValid ) return false;

                const parse = moment.unix( lastUpdateClientsInTheShop ).format();
                const timeAgo = moment( parse ).fromNow();
                setlastUpdateRealTime( timeAgo );

            };

        };
       
    }, [ user ]) 

    const sections = [ { title:'Real-Time Data',

    items:[ { title:'Personal Working now', value:user.personalWorking ? user.personalWorking : 0, icon:WorkRoundedIcon }, { title:'Clients in the shop', value:user.clientsInTheShop ? user.clientsInTheShop : 0, icon:PeopleAltRoundedIcon }, 
    { title:'Last update', value:lastUpdateRealTime, icon:TimerRoundedIcon } ], 

    icon:TimelineRoundedIcon, route:'/business/?section=real-time-data' }, 
    { title:'Business Profile', icon:BusinessRoundedIcon, 

    items:[ { title:'Banner', value:user.banner ? true : false, icon:ImageRoundedIcon }, { title:'Presentation', value:user.mainPresentationOne && user.mainPresentationTwo ? true : false, icon:ContactSupportRoundedIcon }, { title:'Profile Photo', value:user.profilePhoto ? true : false, icon:AccountCircleRoundedIcon }, { title:'Presentation', value:user.mainPresentationOne && user.mainPresentationTwo ? true : false, icon:ContactSupportRoundedIcon } ,{ title:'Business Category', value:user.businessCategory ? true : false, icon:CategoryRoundedIcon }, { title:'Location', value:user.location ? true : false, icon:LocationOnRoundedIcon }, { title:'Shedule', value:user.since && user.until ? true : false, icon:QueryBuilderRoundedIcon }, { title:'Footer', icon:BorderBottomRoundedIcon , value:user.footerTitle && user.footerSectionOne && user.footerSectionTwo && user.footerLastLine ? true : false }, { title:'Social Media', icon:InstagramIcon, value:user.facebookLink && user.instagramLink && user.twitterLink ? true : false } ], 

    route:'/business/?section=business-profile' }, { title:'Products', icon:ShoppingBasketRoundedIcon, 

    items:[ { title:'Quantity published', value:user.products && user.products.length && user.products.length < 10 ? user.products.length : '10+', icon:PublishRoundedIcon },{ title:'Last published', value:user.products.length > 0 && moment( moment.unix( user.products[0].createdAt ).format() ).fromNow(), icon:TimerRoundedIcon }, { title:'Banner Products', value:user.bannerSectionProducts ? true : false, icon:ImageRoundedIcon } ],

     route:'/business/?section=products' } ];

    const numbers = [ 0, 1, 2 ];
    
    const DataPanel = () => {

        return ( 
            <Fade in={ true }>
                <div className={ `container__all__sections flex flex-col p-2 space-y-10 ${ mobileResolution && 'pt-28' }` }>
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
            </Fade>

        );

    };

    return <DataPanel/> ;
};

export default Panel;
