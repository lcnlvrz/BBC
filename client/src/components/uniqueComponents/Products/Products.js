import React, { useState } from 'react';
import InputSearcher from '../../reusableComponents/SearcherInput';
import { useMediaQuery } from 'react-responsive';
import Fade from '@material-ui/core/Fade';
import '../OneProductPage/OneProductPage.css';
import ChangeProfilePhoto from '../BusinessProfile/ChangeProfilePhoto/ChangeProfilePhoto';
import { useSelector } from 'react-redux';
import CardProductAdmin from './CardProductAdmin';
import BannerSectionProducts from '../BusinessProfile/BannerSectionProducts';
import { useSearchBusiness } from '../../../hooks/useSearchBusiness';
import AlertAnimation from '../../reusableComponents/AlertAnimation';
import PropagateLoader from "react-spinners/PropagateLoader";
import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react';



const Content = ( props ) => {

    const { products, isSearching } = props;

    const ProductsCard = () => {

       if ( products.length > 0 && !isSearching ) return (

            products.map( ( product, index ) => {

                const props = { index, key:product._id, product };

                return <CardProductAdmin {...props}/>

            }) 

       );

    };

    const WarningNoProducts = () => {

        return (

            <div 
            style={{ height:'70vh' }}
            className='flex items-center justify-center px-5'>
                <h1 className='font-semibold text-3xl text-center text-green-400'> 
                Nothing here, add one product to see something 😊 
                </h1> 
            </div>

        );

    };

    const SpinerLoader = () => {

        return (

            <div className='w-full text-center'>
                <PropagateLoader/>
            </div>

        );

    };

    return (

        <Fragment>

            { products.length > 0 && !isSearching && <ProductsCard/> }
            
            { products.length === 0 && !isSearching && <WarningNoProducts/> }
            
            { isSearching && <SpinerLoader/> }
            
        </Fragment>

    );

};

const ProductsSearcher = ( props ) => {

    const { setQuery, setAnotherEndPoint, user } = props;

    return (

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

    );

};


const Products = () => {

    const user = useSelector(state => state.user);

    const { bannerSectionProductsText, bannerSectionProducts } = user;

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const [isChangePhoto, setIsChangePhoto] = useState( false );

    const { setQuery, notFound, setNotFound, isSearching, setAnotherEndPoint, products } = useSearchBusiness();

    const propsProductSearcher = { setQuery, setAnotherEndPoint, user };

    const propsContent = { products, isSearching };

    const propsBannerProducts = { bannerSectionProductsText, bannerSectionProducts, setIsChangePhoto };

    const propsChangePhoto = { setCloseModal:setIsChangePhoto, ...isChangePhoto };

    const classesParentDiv = `flex flex-col space-y-10 my-5 ${ mobileResolution && 'pt-28' }`;

    return (
        <Fade in>
            <div className={ classesParentDiv }>
                <Helmet>
                    <title> Business Client Connection - Products </title>
                </Helmet>
                <ProductsSearcher { ...propsProductSearcher }/>
                <BannerSectionProducts { ...propsBannerProducts }/>
                <h1 className='font-semibold text-center'> 
                    *Click Over Text to Change Information* 
                </h1>

                <Content {...propsContent}/>

                { isChangePhoto && <ChangeProfilePhoto {...propsChangePhoto}/> }

                { notFound.type && <AlertAnimation setCloseAlert={ setNotFound } { ...notFound }/>  }
                
            </div>
        </Fade>
    );
};

export default Products;
