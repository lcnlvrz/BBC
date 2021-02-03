import { Avatar } from '@material-ui/core';
import React from 'react';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import { defaultTransiton } from '../../../constants/styles';
import './MyBusiness.css';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import Badge from '@material-ui/core/Badge';
import Location from '../../../images/location.jpg';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';

const MyBusiness = () => {

    const useStyles = makeStyles((theme) => ({
        large: {
          width: theme.spacing(15),
          height: theme.spacing(15)
        },
      }));

      const classes = useStyles();

      const StyledBadge = withStyles((theme) => ({
        badge: {
          width:theme.spacing(5),
          height: theme.spacing(5),
          borderRadius:'100px',
          backgroundColor: '#44b700',
          color: '#44b700',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '100%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
      }))(Badge);


      const numbers = [ 0, 1, 2, 3 ];

      const items = [{ title:'What is Nike', text:'Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area.' },{ title:'Description', text:'Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area.' }]
      
    return (
        <div>
            <div className='my__business__container border-solid border-b-8 border-green-400'>
                <div className='h-44 w-full'>
                    <div className='h-44 w-full absolute z-50 top-24 flex items-center justify-end flex-col space-y-5'>
                        <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        variant="dot"
                        >
                            <Avatar
                            className={ `${ classes.large } shadow-lg ` }
                            src='https://i.pinimg.com/originals/4d/96/2d/4d962dee72fa76f023d411e20d30690c.jpg'
                            />
                        </StyledBadge>
                        <h1 className='font-semibold text-3xl'> Nike 
                            <span className='font-light'> - Oficial Business 
                            </span> 
                        </h1>
                    </div>
                    <img
                    style={{ filter:'brightness(0.5)' }}
                    className='h-44 w-full object-cover object-center'
                    src='https://mundogremial.com/wp-content/uploads/2020/02/nike-local-scaled.jpg'
                    alt=''/>

                </div>
            </div>
            <div className='mt-28 flex flex-row flex-wrap justify-evenly m-10'>
                { items.map( ( item, index ) => (

                    <div 
                    key={ index }
                    style={ defaultTransiton }
                    className='description text-center border p-5 bg-white rounded-2xl hover:text-white hover:bg-black cursor-pointer space-y-2 card__myBusiness w-96 my-5'>
                        <h3 className='text-2xl font-semibold title__card'> 
                            { item.title }
                        </h3>
                        <p className='font-light'> 
                            { item.text }
                        </p>
                    </div>
                ) ) }
            </div>
            <div className='flex flex-row items-center flex-wrap justify-center'>
                <div 
                className='flex flex-col items-center text-center m-10'>
                    <LocationOnRoundedIcon 
                    className='text-red-600'
                    style={ { fontSize:'100px' } }/>
                    <h1 className='font-light italic text-lg'> 
                        Lopez y Planes 528, Tucuman, Argentina. 
                    </h1>
                    <h1 className='text-2xl'> 
                        07:00 AM - 18:00 PM 
                    </h1>
                    <h1 className='text-md text-gray-400'> 
                        Updated 25 min ago 
                    </h1>
                </div>
                <div className='flex m-10 flex-col items-center justify-center'>
                    <WorkRoundedIcon
                    className='text-green-500'
                    style={{ fontSize:'100px' }}
                    />
                    <h1 className='font-light text-2xl text-center'> 
                        <span className='font-semibold'>34</span> persons working in the shop now
                    </h1>
                    <h1 className='text-md text-gray-400'> 
                        Updated 45 min ago 
                    </h1>
                </div>
                <div className='flex m-10 flex-col items-center justify-center'>
                    <PeopleAltRoundedIcon
                    className='text-yellow-500'
                    style={{ fontSize:'100px' }}
                    />
                    <h1 className='font-light text-2xl text-center'> 
                        <h1> There are <span className='font-semibold'> 55 </span> clients in the shop now </h1>
                    </h1>
                    <h1 className='text-md text-gray-400'> 
                        Updated 10 min ago 
                    </h1>
                </div>
            </div>
            <div className='border-solid border-b-8 border-green-400 border-t-8'>
               <div className='h-32 w-full absolute flex text-white items-center justify-center z-10'>
                    <h1 className='font-semibold text-5xl'> Products </h1>
               </div>
               <img 
               style={{ filter:'brightness(0.4)' }}
               className='h-32 w-full object-cover object-center'
               alt=''
               src='https://i.pinimg.com/originals/a1/5c/bc/a15cbc46ef421272a227accd9dca6a20.jpg'
               />
            </div>
            <div className='my-10'>
                <div className='all__products flex flex-row flex-wrap justify-evenly items-center'>
                    { numbers.map( ( number, index ) => (

                    <div 
                    key={ index }
                    style={ defaultTransiton }
                    className='one__product h-96 w-60 hover:shadow-2xl rounded-2xl m-5 cursor-pointer'>
                        <div className='h-64 w-full'>
                            <div className='absolute flex items-end justify-center h-64 w-60 container__title__card'>
                                <h1 className='text-white text-lg z-30 font-semibold'> 
                                    Nike Air Max 95 
                                </h1>
                            </div>
                            <img 
                            className='w-full object-cover object-top max-h-full rounded'
                            src='https://www.footasylum.com/images/articles/NikeBrandLP/061020FA_WK41_NIKE_PAGE_UPDATE_JDI_section_M.jpg'
                            alt='/'
                            />
                        </div>
                        <div className='p-5'>
                            <div className='flex flex-row items-center space-x-1'>
                                <FiberManualRecordRoundedIcon 
                                style={{ fontSize:'20px' }}
                                className='text-green-400'/>
                                <h3 className='font-light text-gray-600 text-sm'> 
                                    Stock Available: <span className='text-black font-semibold'> 45 </span> 
                                </h3>
                            </div>
                            <div>
                                <p className='text-center text-black font-light'> 
                                    Nike air Max 95 is an awesome shoe with the last tecnology of the market 
                                </p>
                            </div>
                        </div>
                    </div>

                    ) ) }

                </div>
            </div>
                
        </div>
    );
};

export default MyBusiness;
