import React, { useEffect, useState } from 'react';
import { Fade } from '@material-ui/core';
import './MyBusiness.css';
import SearcherInput from '../../reusableComponents/SearcherInput/SearcherInput';
import HeaderForClient from '../HeaderForClient';
import Banner from './Banner';
import Questions from './Advantages/Questions';
import RealTimeSection from './RealTimeSection/RealTimeSection';
import SeparatorBanner from '../../reusableComponents/SeparatorBanner';
import Products from './Products/Products';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchBusiness } from '../../../hooks/useSearchBusiness';
import AlertAnimation from '../../reusableComponents/AlertAnimation';
import NotFoundPage from '../../reusableComponents/NotFoundPage';
import { setTitle } from '../../../actions/helmetTitle';

const MyBusiness = () => {

    const currentSearch = useSelector(state => state.currentSearch); 

    const { 
    isOpenBusiness, 
    businessCategory,  
    banner, 
    profilePhoto, 
    username,
    businessName,
    lastUpdateClientsInTheShop,
    lastUpdatePersonalWorking,
    clientsInTheShop,
    personalWorking,
    location,
    since,
    until,
    facebookLink,
    instagramLink,
    twitterLink,
    footerSectionOne,
    footerSectionTwo,
    footerTitle,
    footerLastLine } = currentSearch;

    const dispatch = useDispatch();

    const [products, setProducts] = useState( currentSearch.products );

    const { setQuery, notFound, setNotFound, isSearching, setAnotherEndPoint, response } = useSearchBusiness();

    useEffect(() => {

        const url = new URL( window.location.href );

        const scroll = url.searchParams.get( 'scroll' );

        if ( scroll === 'top' ) window.scroll( 0, 0 );

        dispatch( setTitle( `Business Client Connection - ${ currentSearch.businessName }` ) );
        
    }, [ dispatch, currentSearch.businessName ]);

    useEffect(() => {

        if ( response.length > 0 ) setProducts( response );
        
    }, [ response ]);

    const propsBanner = {

        isOpenBusiness, 
        businessCategory, 
        nameBusiness:businessName, 
        bannerPhoto:banner, 
        profilePhoto

    };

    const propsRealTime = {

        username,
        businessName,
        lastUpdateClientsInTheShop,
        lastUpdatePersonalWorking,
        clientsInTheShop,
        personalWorking,
        location,
        since,
        until

    };

    const propsFooter = {

        facebookLink,
        instagramLink,
        twitterLink,
        footerSectionOne,
        footerSectionTwo,
        footerTitle,
        footerLastLine

    };

    if ( !currentSearch.business ) return <NotFoundPage/>;

    return (
        <Fade in={ currentSearch.business }>
            <div className='pt-10'>
                <HeaderForClient/>
                <Banner { ...propsBanner }/>
                <Questions questionsAndAnswers={ currentSearch }/>
                <RealTimeSection { ...propsRealTime }/>
                <SeparatorBanner
                title={ currentSearch.bannerSectionProductsText }
                bannerPhoto={ currentSearch.bannerSectionProducts }
                />
                <form 
                onChange={ (e) => {

                    setQuery( e.target.value );
                    setAnotherEndPoint( { route:'/one-product', userID:currentSearch._id } );

                } }
                className='m-10'>
                    
                    <SearcherInput
                    name='query' 
                    placeholder='Search any product'/>
                    
                    <Products 
                    isSearching={ isSearching }
                    products={ products }/>
                    
                </form>
                <Footer {...propsFooter}/>
                { notFound.type && 
                <AlertAnimation setCloseAlert={ setNotFound } message={ notFound.message } severity={ notFound.severity }/> 
                }
            </div>
        </Fade>
    );
};

export default MyBusiness;
