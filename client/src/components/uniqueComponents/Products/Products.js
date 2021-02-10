import React, { useState, useRef } from 'react';
import InputSearcher from '../../reusableComponents/SearcherInput';
import ProductCard from '../../reusableComponents/ProductCard';
import { useMediaQuery } from 'react-responsive';
import { defaultTransiton } from '../../../constants/styles';
import HeaderForClient from '../HeaderForClient';
import Fade from '@material-ui/core/Fade';
import '../OneProductPage/OneProductPage.css';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import { Fragment } from 'react';
import { IconButton, TextareaAutosize } from '@material-ui/core';
import ChangeProfilePhoto from '../BusinessProfile/ChangeProfilePhoto/ChangeProfilePhoto';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import { useSelector } from 'react-redux';
import CardProductAdmin from './CardProductAdmin';
import ButtonSaveChanges from '../../reusableComponents/ButtonSaveChanges/ButtonSaveChanges';

const Products = () => {

    const { products } = useSelector(state => state.user);

    const [isOpenChangePhoto, setIsOpenChangePhoto] = useState( false );

    return (
        <Fade in={ true }>
            <div className='flex flex-col'>
                <div className='px-5'>
                    <InputSearcher
                    placeholder='Search products here!'
                    />
                </div>
                { products.length > 0 ? products.map( ( product, index ) => (


                    <CardProductAdmin
                    index={ index }
                    key={ product._id } 
                    product={ product }/>

                ) ) 
                :
                <div 
                style={{ height:'70vh' }}
                className='flex items-center justify-center px-5'>
                    <h1 className='font-semibold text-3xl text-center text-green-400'> 
                    Nothing here, add one product to see something 😊 
                    </h1> 
                </div>
                }
                { isOpenChangePhoto && <ChangeProfilePhoto setCloseModal={ setIsOpenChangePhoto }/> }
            </div>
        </Fade>
    );
};

export default Products;
