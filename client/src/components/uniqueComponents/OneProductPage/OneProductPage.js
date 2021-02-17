import React, { Fragment, useRef, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { defaultTransiton } from '../../../constants/styles';
import HeaderForClient from '../HeaderForClient';
import Fade from '@material-ui/core/Fade';
import './OneProductPage.css';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { setCurrentSearch } from '../../../actions/currentSearch';
import NotFoundPage from '../../reusableComponents/NotFoundPage';
import { Helmet } from 'react-helmet-async';

const OneProductPage = ( props ) => {

    useEffect(() => {

        window.scrollTo( 0, 0 );
        
    }, []);

    const dispatch = useDispatch();

    const [currentItemMenu, setCurrentItemMenu ] = useState( 0 );

    const currentProduct = useSelector(state => state.currentProduct);

    const currentSearch = useSelector(state => state.currentSearch);

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const descriptionItemRef = useRef( null );
    const detailItemRef = useRef( null );
    const liveTimeRef = useRef( null );

    const parseDate = moment.unix( currentProduct.lastUpdate ).format();

    
    const textItemRef = useRef( null );

    const handleSelectItem = async ( e ) => {

        const itemName = e.target.outerText;

        if ( itemName === 'DESCRIPTION' ) {

           await setCurrentItemMenu( 0 );

            descriptionItemRef.current.classList.add( 'border-b-4', 'border-green-400', 'text-green-400' );
            descriptionItemRef.current.classList.remove( 'text-green-200' );

            detailItemRef.current.classList.add( 'text-green-200' );
            detailItemRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );
            

            liveTimeRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );
            liveTimeRef.current.classList.add( 'text-green-200' );

            textItemRef.current.scrollIntoView( { behavior:'smooth' } );

        } else if ( itemName === 'DETAILS' ) {

           await setCurrentItemMenu( 1 );

            detailItemRef.current.classList.add( 'border-b-4', 'border-green-400', 'text-green-400' );

            descriptionItemRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );
            descriptionItemRef.current.classList.add( 'text-green-200' );

            liveTimeRef.current.classList.add( 'text-green-200' );
            liveTimeRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );

            textItemRef.current.scrollIntoView( { behavior:'smooth' } );
            
            
        } else {

           await setCurrentItemMenu( 2 );

            liveTimeRef.current.classList.add( 'border-b-4', 'border-green-400', 'text-green-400' );
            liveTimeRef.current.classList.remove( 'text-green-200' );

            detailItemRef.current.classList.add( 'text-green-200' );
            detailItemRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );
            

            descriptionItemRef.current.classList.add( 'text-green-200' ); 
            descriptionItemRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );

            textItemRef.current.scrollIntoView( { behavior:'smooth' } );
              

        };

        

    };

    const itemsMenu = [ { title:'DESCRIPTION', ref:descriptionItemRef }, { title:'DETAILS', ref:detailItemRef }, { title:'SPECS', ref:liveTimeRef } ];


    const itemsText = [ currentProduct.description, currentProduct.details, "DATAA" ];

    if ( !currentProduct.product ) return <NotFoundPage/>

    return (
        <Fade in={ true }>
            <Fragment>
            <HeaderForClient/>
            <div 
            style={{ height:'100vh' }}
            className={ `${ !mobileResolution ? 'flex items-center justify-center pt-20' : 'pt-10' } ` }>
                <Helmet>
                    <title> Business Client Connection - { currentProduct.product ? currentProduct.title : 'One Product Page' } </title>
                </Helmet>
                <div className={ `w-full flex flex-row flex-wrap p-5 justify-evenly ${ mobileResolution ? 'space-y-5' : 'space-x-5' }` }>
                    <div className={ `flex flex-row flex-wrap ${ mobileResolution ? 'space-y-5' : 'space-x-5' } rounded-3xl shadow-2xl h-full w-full` }>
                        <div className={ `${ mobileResolution ? 'w-full' : 'w-80' } one__product__image__container` }>
                            <div className={ `h-96 absolute flex flex-col justify-between ${ mobileResolution ? 'w-full padding-inner' : 'w-80' }` }>
                                <div 
                                style={{ top:0, height:'100px' }}
                                className={ `w-full busines__information__product flex items-start justify-start ${ mobileResolution && 'rounded-tr-3xl' } truncate rounded-tl-3xl` }>
                                    <Link 
                                    onClick={ () => {

                                        if ( !currentSearch.business ) dispatch( setCurrentSearch( { ...currentProduct.userID, isLoading:false, business:true } ) );
                                        
                                        

                                    }}
                                    to={ `/search/business/?username=${ currentProduct.userID.username }` }>
                                        <div 
                                        style={ defaultTransiton }
                                        className='flex flex-row space-x-2 text-white p-2 items-center cursor-pointer hover:text-green-300'>
                                            <Avatar
                                            className='bg-white'
                                            src={ currentProduct.userID.profilePhoto }
                                            />
                                            <div className='flex flex-col text-left leading-5'>
                                                <h3 className='font-semibold'> 
                                                    { currentProduct.userID.businessName } 
                                                </h3>
                                                <h3 className='font-light'> 
                                                    { currentProduct.userID.businessCategory } 
                                                </h3>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <h1 
                                className={ `w-full background flex items-end justify-end text-white font-bold text-4xl py-2 ${ !mobileResolution && 'rounded-bl-3xl' } truncate text-center` }> 
                                    ${ currentProduct.price } 
                                    <span className='font-light ml-2 uppercase'> { currentProduct.currency } </span>
                                </h1>
                            </div>
                            <img 
                            className={ `h-96 w-full object-cover rounded-tl-3xl ${ mobileResolution ? 'rounded-tr-3xl' : 'rounded-bl-3xl' }` }
                            alt=''
                            src={ currentProduct.image }
                            />
                        </div>
                        <div className={ `${ mobileResolution ? 'w-full' : 'w-80' } second__part flex flex-col space-y-5` }>
                            <div className={ `${ mobileResolution && 'px-5' } flex flex-col` }>
                                <div className='element'>
                                    <h1 
                                    className='uppercase font-bold text-lg truncate'> 
                                        { currentProduct.title } 
                                    </h1>
                                </div>
                                <div className='element'>
                                    <h3 
                                    className='text-gray-300 font-semibold truncate'>
                                        { currentProduct.subtitle }
                                    </h3>
                                </div>
                            </div>
                            <div className={ `flex flex-col space-y-2 ${ mobileResolution ? 'pl-5 pr-5 pb-5' : 'pr-5' }` }>
                                <div className='flex flex-row justify-between font-semibold text-green-400 
                                all__menu__items'>
                                    { itemsMenu.map( ( itemsMenu, index ) => (

                                        <div 
                                        key={ index }
                                        className='one__menu__item'>
                                            <h1
                                            style={ defaultTransiton }
                                            onClick={ (e) => handleSelectItem( e ) }
                                            ref={ itemsMenu.ref }
                                            className={ `${ index === 0 ? 'border-b-4 border-green-400' : 'text-green-200' } cursor-pointer` }> 
                                                { itemsMenu.title }
                                            </h1>
                                        </div>

                                    ) ) }
                                </div>
                                <div>
                                    { itemsText.map( ( item, index ) => (

                                        <Fragment
                                        key={ index }
                                        >
                                        
                                        {
                                            currentItemMenu === index && index !== 2
                                            ?
                                            <Fade in={ true }>
                                                <p 
                                                className='font-light text__item__menu break-words'>
                                                    { itemsText[ index ] } 
                                                </p>
                                            </Fade> 
                                            :
                                            currentItemMenu === index 
                                            &&
                                            <Fade in={ true }>
                                                <div className='all__realTime__data flex flex-col space-y-3'>
                                                    <div className='flex flex-row space-x-2 element'>
                                                        <h3 className='font-light truncate'> Stock: <span className='font-semibold'> { currentProduct.stock } </span> </h3>
                                                    </div>
                                                    <div className='flex flex-row space-x-2 items-center'>
                                                        <h3 className='font-light'>
                                                            Last update:    
                                                        </h3>
                                                        <p className='font-semibold'> 
                                                            { moment(parseDate).fromNow() }
                                                        </p>
                                                    </div>
                                                </div>
                                            </Fade> 
                                        }
                                        
                                        <div ref={ textItemRef }></div>
                                        </Fragment>

                                    ) ) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Fragment>
        </Fade>
    );
};

export default OneProductPage;
