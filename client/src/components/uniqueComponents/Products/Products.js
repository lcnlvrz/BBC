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


const Products = () => {

    const [currentItemMenu, setCurrentItemMenu ] = useState( 0 );

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const products = [ { title:'Air Max White 95', image:'https://content.nike.com/content/dam/one-nike/en_lu/SP17/Homepage/0326-HP-Vapormax/0321_DESIGN_LDZERO_CROP_1600x600_.jpg.transform/full-screen/0321_DESIGN_LDZERO_CROP_1600x600_.jpg' }, { title:'VaiporMax Triple', image:'https://d2h1pu99sxkfvn.cloudfront.net/b0/7372421/493684995_dePF3mM29u/P0.jpg' }, { title:'Shirt Nike Retro', image:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/15a721d0-9e77-44ee-b406-d9fc9950b1f4/dri-fit-giannis-freak-mens-basketball-t-shirt-T9KgK1.jpg' } ];


    const descriptionItemRef = useRef( null );
    const detailItemRef = useRef( null );
    const liveTimeRef = useRef( null );

    
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

    const itemsMenu = [ { title:'DESCRIPTION', ref:descriptionItemRef }, { title:'DETAILS', ref:detailItemRef }, { title:'REAL-TIME', ref:liveTimeRef } ];


    const itemsText = [ "The Nike Air VaporMax Flyknit is a running shoe that's meant for those who have a neutral gait. Its design is based on years of evolution from the brand. It has modern aesthetics, a sock-like design, and a bevy of colorways to sate the stylistic flair of consumers.", "The Nike Air VaporMax is a new running shoe from Nike. It features sock-like construction with a mix of Flyknit and a brand new Air Max sole. A very limited amount of the COMME des Garcons collaboration released on February 8th, 2017. A wide release with more colorways are releasing on March 25th, 2017 for $190.", "DATAA" ];

    const [isOpenChangePhoto, setIsOpenChangePhoto] = useState( false );

    return (
        <Fade in={ true }>
            <div className='flex flex-col'>
                <div className='px-5'>
                    <InputSearcher
                    placeholder='Search products here!'
                    />
                </div>
                <div className='my-10'>
                    <div 
                    className={ `${ !mobileResolution && 'flex items-center justify-center' }` }>
                        <div 
                        className={ `w-full flex flex-row p-5 justify-evenly ${ mobileResolution ? 'space-y-5 flex-wrap' : 'space-x-5' }` }>
                            <div className={ `flex flex-row  ${ mobileResolution ? 'space-y-5 flex-wrap' : 'space-x-5' } rounded-3xl shadow-2xl h-full` }>
                                <div className={ `${ mobileResolution ? 'w-full' : 'w-80' } one__product__image__container` }>
                                    <div className={ `h-96 absolute flex items-end justify-center ${ mobileResolution ? 'w-full padding-inner' : 'w-80' }` }>
                                        <div 
                                        className={ `w-full h-96 flex items-end background ${ !mobileResolution && 'rounded-bl-3xl' }` }>
                                            <input
                                            defaultValue='$750 ars'
                                            className='outline-none bg-transparent text-white text-4xl text-center w-full font-bold p-2'
                                            />
                                        </div>
                                    </div>
                                    <img 
                                    className={ `h-96 w-full object-cover rounded-tl-3xl ${ mobileResolution ? 'rounded-tr-3xl' : 'rounded-bl-3xl' }` }
                                    alt=''
                                    src='https://d2h1pu99sxkfvn.cloudfront.net/b0/7372421/493684995_dePF3mM29u/P0.jpg'
                                    />
                                </div>
                                <div className={ `${ mobileResolution ? 'w-full' : 'w-80' } second__part flex flex-col space-y-5 h-96<` }>
                                    <div className={ `${ mobileResolution && 'px-5' } flex flex-col` }>
                                        <input
                                        type='text'
                                        className='outline-none bg-transparent uppercase font-bold text-lg'
                                        defaultValue='NIKE VAPOR MAX ULTRA zero '
                                        />
                                        <input
                                        type='text'
                                        className='outline-none bg-transparent text-gray-300 font-semibold uppercase'
                                        defaultValue='LIMIT EDITION'
                                        />

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
                                                    className={ `${ index === 0 ? 'border-b-4 border-green-400' : 'text-green-200' } cursor-pointer text-sm` }> 
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
                                                    <>
                                                    <TextareaAutosize
                                                    rowsMax={ 8 }
                                                    rowsMin={ 8 }
                                                    defaultValue={ itemsText[ index ] }
                                                    className='resize-none bg-transparent outline-none w-full font-light'
                                                    />
                                                    <div className='w-full flex justify-end'>
                                                        <IconButton
                                                        style={{ outline:'none' }}
                                                        >
                                                            
                                                            <RemoveCircleRoundedIcon
                                                            className='text-red-500'
                                                            />

                                                        </IconButton>
                                                        <IconButton
                                                        onClick={ () => setIsOpenChangePhoto( true ) }
                                                        style={{ outline:'none' }}
                                                        >
                                                            
                                                            <ImageRoundedIcon
                                                            className='text-green-400'
                                                            />

                                                        </IconButton>
                                                    </div>
                                                    </>

                                                </Fade> 
                                                :
                                                currentItemMenu === index 
                                                &&
                                                <Fade in={ true }>
                                                    <div className='all__realTime__data flex flex-col space-y-3'>
                                                        <div className='flex flex-row space-x-2'>
                                                            <h3 className='font-light'> Stock: 
                                                            {/* <span className='font-semibold'> 50 </span>  */}
                                                            </h3>
                                                            <input
                                                            defaultValue={ 50 }
                                                            className='bg-transparent outline-none font-semibold'
                                                            />
                                                        </div>
                                                        <div className='flex flex-row space-x-2'>
                                                            <h3 className='font-light'>Colors: </h3>
                                                            <FiberManualRecordRoundedIcon className='text-red-500'/>
                                                            <FiberManualRecordRoundedIcon
                                                            className='text-green-500'
                                                            />
                                                            <FiberManualRecordRoundedIcon
                                                            className='text-blue-500'
                                                            />
                                                        </div>
                                                        <div className='flex flex-row space-x-2 items-center'>
                                                            <h3 className='font-light'>
                                                                Sizes:    
                                                            </h3>
                                                            <p 
                                                            style={ defaultTransiton }
                                                            className='border rounded-full p-2 hover:bg-gray-400 hover:text-white cursor-pointer'> 
                                                                45 
                                                            </p>
                                                            <p 
                                                            style={ defaultTransiton }
                                                            className='border rounded-full p-2 hover:bg-gray-400 hover:text-white cursor-pointer'> 
                                                                46 
                                                            </p>
                                                            <p 
                                                            style={ defaultTransiton }
                                                            className='border rounded-full p-2 hover:bg-gray-400 hover:text-white cursor-pointer'> 
                                                                48
                                                            </p>
                                                        </div>
                                                        <div className='flex flex-row space-x-2 items-center'>
                                                            <h3 className='font-light'>
                                                                Last update:    
                                                            </h3>
                                                            <p className='font-semibold'> 
                                                                45 minutes ago
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
                { isOpenChangePhoto && <ChangeProfilePhoto setCloseModal={ setIsOpenChangePhoto }/> }
            </div>
        </Fade>
    );
};

export default Products;
