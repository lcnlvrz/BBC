import React from 'react';
import { defaultTransiton } from '../../../constants/styles';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';

const ProductCard = ( props ) => {

    const { title, image, stockAvailable, lastUpdate, price, currency } = props;

    return (
        <div 
        style={ defaultTransiton }
        className='one__product h-96 w-60 hover:shadow-2xl rounded-2xl m-5 cursor-pointer'>
            <div className='h-64 w-60'>
                <div className='absolute flex items-end justify-center h-64 w-60 container__title__card'>
                    <h1 className='text-white text-lg z-30 font-semibold'> 
                        { title }
                    </h1>
                </div>
                <img 
                className='w-full object-cover rounded h-full'
                src={ image }
                alt='/'
                />
            </div>
            <div className='p-5 space-y-2'>
                <div className='flex flex-row items-center space-x-1'>
                    <FiberManualRecordRoundedIcon 
                    style={{ fontSize:'20px' }}
                    className='text-green-400'/>
                    <h3 className='font-light text-gray-600 text-sm'> 
                        Stock Available: <span className='text-black font-semibold'> { stockAvailable } </span> 
                    </h3>
                </div>
                <div className='flex flex-row items-center space-x-1'>
                    <WatchLaterRoundedIcon 
                    style={{ fontSize:'20px' }}
                    className='text-black'/>
                    <h3 className='font-light text-gray-600 text-sm'> 
                        Last update: <span className='text-black font-semibold'> { lastUpdate } 
                        </span> 
                    </h3>
                </div>
                <div className='text-2xl'>
                    <h1 className='text-center font-bold'> 
                        ${ price } <span className='font-light '> { currency } </span> 
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
