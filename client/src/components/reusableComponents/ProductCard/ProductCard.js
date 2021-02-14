import React from 'react';
import { defaultTransiton } from '../../../constants/styles';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
import moment from 'moment';
import Fade from '@material-ui/core/Fade';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../../../actions/currentProduct';
import { useSelector } from 'react-redux';
import TimeAgoInterval from '../TimeAgoInterval';

const ProductCard = ( props ) => {

    const { product } = props;

    const timeParse = moment.unix( product.lastUpdate ).format();

    const { profilePhoto, businessName, businessCategory, username } = useSelector(state => state.currentSearch);


    const [ref, inView] = useInView({
        triggerOnce: true
    });

    const dispatch = useDispatch();

    return (
        <Fade 
        ref={ ref }
        in={ inView }>
            <Link 
            onClick={ () => dispatch( setCurrentProduct( { ...product, userID:{ profilePhoto, businessName, businessCategory, username } } ) ) }
            to={ `/product/?published=${ product.userID }&product=${ product._id }` }>
                <div 
                style={ defaultTransiton }
                className='one__product h-96 w-60 hover:shadow-2xl rounded-2xl m-5 cursor-pointer'>
                    <div className='h-64 w-60'>
                        <div className='absolute flex items-end justify-center h-64 w-60 container__title__card'>
                            <h1 className='text-white text-lg z-30 font-semibold truncate'> 
                                { product.title }
                            </h1>
                        </div>
                        <img 
                        className='w-full object-cover rounded h-full'
                        src={ product.image }
                        alt='/'
                        />
                    </div>
                    <div className='p-5 space-y-2'>
                        <div className='flex flex-row items-center space-x-1'>
                            <FiberManualRecordRoundedIcon 
                            style={{ fontSize:'20px' }}
                            className='text-green-400'/>
                            <h3 className='font-light text-gray-600 text-sm'> 
                                Stock Available: <span className='text-black font-semibold'> { product.stock } </span> 
                            </h3>
                        </div>
                        <div className='flex flex-row items-center space-x-1'>
                            <WatchLaterRoundedIcon 
                            style={{ fontSize:'20px' }}
                            className='text-black'/>
                            <span className='font-light text-gray-600 text-sm'>Last update:</span>
                            <TimeAgoInterval 
                            classes='text-black font-semibold'
                            date={ timeParse }/>
                        </div>
                        <div className='text-2xl flex items-center justify-center'>
                            <h1 className='font-bold truncate'> 
                                ${ product.price } <span className='font-light'> { product.currency } </span> 
                            </h1>
                        </div>
                    </div>
                </div>
            </Link>
        </Fade>
    );
};

export default ProductCard;
