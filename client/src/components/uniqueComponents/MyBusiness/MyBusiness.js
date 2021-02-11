import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Fade } from '@material-ui/core';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import { defaultTransiton, fillButton, outlineButton } from '../../../constants/styles';
import './MyBusiness.css';
import SearcherInput from '../../reusableComponents/SearcherInput/SearcherInput';
import HeaderForClient from '../HeaderForClient';
import Banner from './Banner';
import Questions from './Advantages/Questions';
import RealTimeSection from './RealTimeSection/RealTimeSection';
import SeparatorBanner from '../../reusableComponents/SeparatorBanner';
import Products from './Products/Products';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import LoadingAnimation from '../../reusableComponents/LoadingAnimation/LoadingAnimation';
import { useSearchBusiness } from '../../../hooks/useSearchBusiness';
import AlertAnimation from '../../reusableComponents/AlertAnimation';

const MyBusiness = () => {

    const currentSearch = useSelector(state => state.currentSearch); 

    const [products, setProducts] = useState( [] );

    const { setQuery, cancelToken, notFound, setNotFound, isSearching, setAnotherEndPoint, response } = useSearchBusiness();

    useEffect(() => {

        return () => {

            if ( cancelToken ) cancelToken.cancel();

        };
       
    }, [ cancelToken ]);

    useEffect(() => {

        if ( response.length > 0 ) setProducts( response );
        
    }, [ response ]);

    useEffect(() => {

        if ( !currentSearch.isLoading ) {

            setProducts( currentSearch.products );

        };
        
    }, [ currentSearch ]);

    if ( currentSearch.isLoading ) return <LoadingAnimation/>

    return (
        <Fade in={ currentSearch.business }>
            <Fragment>
                <HeaderForClient/>
                <Banner
                isOpenBusiness={ currentSearch.isOpenBusiness }
                businessCategory={ currentSearch.businessCategory }
                nameBusiness={ currentSearch.businessName }
                bannerPhoto={ currentSearch.banner }
                profilePhoto={ currentSearch.profilePhoto }
                />
                <Questions
                questionsAndAnswers={ currentSearch }
                />
                <RealTimeSection
                lastUpdateClientsInTheShop={ currentSearch.lastUpdateClientsInTheShop }
                lastUpdatePersonalWorking={ currentSearch.lastUpdatePersonalWorking }
                clientsInTheShop={ currentSearch.clientsInTheShop }
                personalWorking={ currentSearch.personalWorking }
                location={ currentSearch.location }
                since={ currentSearch.since }
                until={ currentSearch.until }
                />
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
                <Footer
                facebookLink={ currentSearch.facebookLink }
                instagramLink={ currentSearch.instagramLink }
                twitterLink={ currentSearch.twitterLink }
                footerSectionOne={ currentSearch.footerSectionOne }
                footerSectionTwo={ currentSearch.footerSectionTwo }
                footerTitle={ currentSearch.footerTitle }
                footerLastLine={ currentSearch.footerLastLine }
                />
                { 
                    notFound.type 
                    && 
                    <AlertAnimation setCloseAlert={ setNotFound } message={ notFound.message } severity={ notFound.severity }/> 
                }
            </Fragment>
        </Fade>
    );
};

export default MyBusiness;
