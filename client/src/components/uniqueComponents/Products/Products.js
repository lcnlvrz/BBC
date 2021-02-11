import React, { useState, useRef, useEffect } from 'react';
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
import BannerSectionProducts from '../BusinessProfile/BannerSectionProducts';
import { useSearchBusiness } from '../../../hooks/useSearchBusiness';
import AlertAnimation from '../../reusableComponents/AlertAnimation';
import PropagateLoader from "react-spinners/PropagateLoader";

const Products = () => {

    const user = useSelector(state => state.user);

    const [isOpenChangePhoto, setIsOpenChangePhoto] = useState( false );

    const [isChangePhoto, setIsChangePhoto] = useState( false );

    const [products, setProducts] = useState( [] );

    const { setQuery, cancelToken, notFound, setNotFound, isSearching, setAnotherEndPoint, response } = useSearchBusiness();

    useEffect(() => {

        if ( response.length > 0 ) setProducts( response );
        
    }, [ response ]);

    useEffect(() => {
        
        if ( !user.isLoading ) {

            setProducts( user.products );

        };
        
    }, [ user ]);


    useEffect(() => {

        return () => {

            if ( cancelToken ) cancelToken.cancel();

        };
        
    }, [ cancelToken ]);
 
    return (
        <Fade in={ true }>
            <div className='flex flex-col space-y-10 my-5'>
                <form 
                onChange={ (e) => {

                    setQuery( e.target.value );
                    setAnotherEndPoint( { route:'/one-product', userID:user.userID } );

                } }
                className='px-5'>
                    <InputSearcher
                    name='query'
                    placeholder='Search products here!'
                    />
                </form>
                <BannerSectionProducts
                bannerSectionProductsText={ user.bannerSectionProductsText }
                bannerSectionProducts={ user.bannerSectionProducts }
                setIsChangePhoto={ setIsChangePhoto }/>

                { 
                    products.length > 0 && !isSearching ? products.map( ( product, index ) => (


                        <CardProductAdmin
                        index={ index }
                        key={ product._id } 
                        product={ product }/>

                    ) ) 
                    :
                    products.length > 0 && !isSearching ?
                    <div 
                    style={{ height:'70vh' }}
                    className='flex items-center justify-center px-5'>
                        <h1 className='font-semibold text-3xl text-center text-green-400'> 
                        Nothing here, add one product to see something 😊 
                        </h1> 
                    </div>
                    :
                    <div className='w-full text-center'>
                        <PropagateLoader/>
                    </div>
                }

                { isOpenChangePhoto && <ChangeProfilePhoto setCloseModal={ setIsOpenChangePhoto }/> }

                { 
                  isChangePhoto 
                  && 
                  <ChangeProfilePhoto 
                  setCloseModal={ setIsChangePhoto }
                  endPointDelete={ isChangePhoto.endPointDelete }
                  endPoint={ isChangePhoto.endPoint }
                  />  
                }
                { 
                    notFound.type 
                    && 
                    <AlertAnimation setCloseAlert={ setNotFound } message={ notFound.message } severity={ notFound.severity }/> 
                }
            </div>
        </Fade>
    );
};

export default Products;
