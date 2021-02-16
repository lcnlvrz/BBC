import React, { useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { defaultTransiton } from '../../../../../constants/styles';
import OneProductPage from '../../../OneProductPage/OneProductPage';
import { Avatar, Fade } from '@material-ui/core';
import { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';


const Product = () => {

    const [ref, inView] = useInView({
        triggerOnce: true,
        delay:200
    });

    const mobileResolution = useMediaQuery({ query:'( max-width: 750px )' });

    const descriptionItemRef = useRef( null );
    const detailItemRef = useRef( null );
    const liveTimeRef = useRef( null );

    const [currentItemMenu, setCurrentItemMenu ] = useState( 0 );

    const textItemRef = useRef( null );

    const itemsMenu = [ { title:'DESCRIPTION', ref:descriptionItemRef }, { title:'DETAILS', ref:detailItemRef }, { title:'SPECS', ref:liveTimeRef } ];

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

        } else if ( itemName === 'DETAILS' ) {

           await setCurrentItemMenu( 1 );

            detailItemRef.current.classList.add( 'border-b-4', 'border-green-400', 'text-green-400' );

            descriptionItemRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );
            descriptionItemRef.current.classList.add( 'text-green-200' );

            liveTimeRef.current.classList.add( 'text-green-200' );
            liveTimeRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );
            
            
        } else {

           await setCurrentItemMenu( 2 );

            liveTimeRef.current.classList.add( 'border-b-4', 'border-green-400', 'text-green-400' );
            liveTimeRef.current.classList.remove( 'text-green-200' );

            detailItemRef.current.classList.add( 'text-green-200' );
            detailItemRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );
            

            descriptionItemRef.current.classList.add( 'text-green-200' ); 
            descriptionItemRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );

        };

        

    };

    const itemsText = [ "In 2016, Nike released a new and improved version of the famous “Back to the Future” shoe. Each pair advanced Adaptive Fit technology, also known as “power laces,” which can sense the wearer's motion and loosen or tighten accordingly.", "In 2016, Nike released a new and improved version of the famous “Back to the Future” shoe. Each pair advanced Adaptive Fit technology, also known as “power laces,” which can sense the wearer's motion and loosen or tighten accordingly.", "DATAA" ];


    return (
        <Fade in={ inView }>
            <div 
            ref={ ref }
            className={ `w-full ${ mobileResolution ? 'flex-col space-y-10' : 'flex-row' } items-center justify-evenly flex flex-wrap pt-0 px-5 ` }>
                <div className={ `left_part text-center space-y-5 ${ mobileResolution ? 'w-full' : 'w-2/4' }` }>
                    <h1 className='font-semibold text-4xl text-green-400'> 
                        PRETTY, UNLIMITED AND FRIENDLY SHOWCASE
                    </h1>
                    <p className={ `${ !mobileResolution ? 'mx-10' : ''  } font-light text-2xl ` }>
                    Show to the users what does your business have or do to solve/satisfy their needs. Product, price, description, and stock. All these information in one card.
                    </p>
                </div>
                <div className={ `right_part ${ mobileResolution ? 'w-full' : 'w-2/4' }` }>
                    <div 
                    className={ `${ !mobileResolution && 'flex items-center justify-center' }` }>
                        <div className={ `w-full flex flex-row flex-wrap justify-evenly` }>
                            <div className={ `flex flex-row flex-wrap ${ mobileResolution ? 'space-y-5' : 'space-x-5' } rounded-3xl shadow-2xl h-full w-full` }>
                                <div className={ `w-full one__product__image__container relative` }>
                                    <div className={ `h-96 absolute flex flex-col justify-between ${ mobileResolution ? 'w-full padding-inner' : 'w-full' }` }>
                                        <div 
                                        style={{ top:0, height:'100px' }}
                                        className={ `w-full busines__information__product flex items-start justify-start rounded-tr-3xl truncate rounded-tl-3xl` }>
                                            <div 
                                            style={ defaultTransiton }
                                            className='flex flex-row space-x-2 text-white p-2 items-center cursor-pointer hover:text-green-300'>
                                                <Avatar
                                                className='bg-white'
                                                src='https://i.pinimg.com/originals/4d/96/2d/4d962dee72fa76f023d411e20d30690c.jpg'
                                                />
                                                <div className='flex flex-col text-left leading-5'>
                                                    <h3 className='font-semibold'> 
                                                        Nike
                                                    </h3>
                                                    <h3 className='font-light'> 
                                                        Shoes and StreetWear
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <h1 
                                        style={{ height:'100px' }}
                                        className={ `w-full background flex items-end justify-center text-white font-bold text-4xl py-2 ${ !mobileResolution && 'rounded-bl-3xl' }` }> 
                                        $7000 
                                            <span className='font-light ml-2 uppercase'> USD </span>
                                        </h1>
                                    </div>
                                    <img 
                                    className={ `h-96 w-full object-cover rounded-tl-3xl rounded-tr-3xl` }
                                    alt=''
                                    src='https://api.time.com/wp-content/uploads/2015/01/back-to-the-future-nikes.jpg'
                                    />
                                </div>
                                <div className={ `${ mobileResolution ? 'w-full' : 'w-full' } second__part flex flex-col space-y-5 my-5` }>
                                    <div className={ `${ mobileResolution && 'px-5' }` }>
                                        <h1 
                                        className='uppercase font-bold text-lg'> 
                                            MAG BACK TO THE FUTURE
                                        </h1>
                                        <h3 
                                        className='text-gray-300 font-semibold'>
                                        UNLIMITED EDITION
                                        </h3>
                                    </div>
                                    <div className={ `flex flex-col space-y-2 ${ mobileResolution ? 'pl-5 pr-5 pb-5' : 'pr-5' }` }>
                                        <div className='flex flex-row justify-between font-semibold text-green-400 
                                        all__menu__items'>
                                            { itemsMenu.map( ( itemsMenu, index ) => (

                                                <div 
                                                key={ index }
                                                className='one__menu__item '>
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
                                                        className='font-light text__item__menu'>
                                                            { itemsText[ index ] } 
                                                        </p>
                                                    </Fade> 
                                                    :
                                                    currentItemMenu === index 
                                                    &&
                                                    <Fade in={ true }>
                                                        <div className='all__realTime__data flex flex-col space-y-3'>
                                                            <div className='flex flex-row space-x-2'>
                                                                <h3 className='font-light'> Stock: <span className='font-semibold'> 5 </span> </h3>
                                                            </div>
                                                            <div className='flex flex-row space-x-2 items-center'>
                                                                <h3 className='font-light'>
                                                                    Last update:    
                                                                </h3>
                                                                <p className='font-semibold'> 
                                                                    an hour ago
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
                </div>
            </div>
        </Fade>
    );    
};

export default Product;
