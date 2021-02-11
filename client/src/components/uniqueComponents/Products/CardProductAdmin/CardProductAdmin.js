import React, { useRef, useState, useEffect } from 'react';
import { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import { defaultTransiton } from '../../../../constants/styles';
import Fade from '@material-ui/core/Fade';
import { IconButton, TextareaAutosize } from '@material-ui/core';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import moment from 'moment';
import { useUpdateProduct } from '../../../../hooks/useUpdateProduct';
import AlertAnimation from '../../../reusableComponents/AlertAnimation';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useInView } from 'react-intersection-observer';

const CardProductAdmin = ( props ) => {

    const [ref, inView] = useInView({
        triggerOnce: true
    });

    const [isNewChange, setIsNewChange ] = useState( false );

    const { product, index } = props;

    console.log( index );

    const { alert, setAlert, setData, setProductID, isLoading, cancelToken, setIndexProduct, setAction } = useUpdateProduct();

    useEffect(() => {

        return () => {

            if ( cancelToken ) cancelToken.cancel();

        };
        
    }, [ cancelToken ]);

    const parseLastUpdate = moment.unix( product.lastUpdate ).format();

    const lastUpdate = moment( parseLastUpdate ).fromNow();


    const [currentItemMenu, setCurrentItemMenu ] = useState( 0 );
    const [isOpenChangePhoto, setIsOpenChangePhoto] = useState( false );

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const descriptionItemRef = useRef( null );
    const detailItemRef = useRef( null );
    const specsRef = useRef( null );

    const itemsMenu = [ { title:'DESCRIPTION', ref:descriptionItemRef }, { title:'DETAILS', ref:detailItemRef }, { title:'SPECS', ref:specsRef } ];

    const itemsText = [ product.description, product.details, product.lastUpdate ];
     
    const textItemRef = useRef( null );

    const initialStateInputAddProduct = { title:product.title, subtitle:product.subtitle, price:product.price, description:product.description, details:product.details, category:product.category, stock:product.stock, currency:product.currency, image:product.image };

    const [input, setInput] = useState( initialStateInputAddProduct );

    const seStatesActionProducts = ( action ) => {

        setAction( action );
        setData( input );
        setProductID( product._id );
        setIndexProduct( index );


    };

    const ButtonsActions = () => {

        return (
            <div className='w-full flex justify-end flex-row'>
                { 
                    !isLoading 
                    ?
                    <>
                        <IconButton
                        onClick={ () => seStatesActionProducts( 'delete' ) }
                        style={{ outline:'none' }}
                        >
                            
                            <RemoveCircleRoundedIcon
                            className='text-red-500'
                            />

                        </IconButton>
                        <IconButton
                        type='submit'
                        style={{ outline:'none' }}
                        >
                            <CheckCircleRoundedIcon
                            className='text-green-400'
                            />
                        </IconButton> 
                    </>
                    :
                    <div className='w-full flex items-center justify-center'>
                        <PropagateLoader/> 
                    </div> 
                }
            </div>
        );

    };

    const handleSelectItem = async ( e ) => {

        const itemName = e.target.outerText;

        if ( itemName === 'DESCRIPTION' ) {

           await setCurrentItemMenu( 0 );

            descriptionItemRef.current.classList.add( 'border-b-4', 'border-green-400', 'text-green-400' );
            descriptionItemRef.current.classList.remove( 'text-green-200' );

            detailItemRef.current.classList.add( 'text-green-200' );
            detailItemRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );
            

            specsRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );
            specsRef.current.classList.add( 'text-green-200' );

        } else if ( itemName === 'DETAILS' ) {

           await setCurrentItemMenu( 1 );

            detailItemRef.current.classList.add( 'border-b-4', 'border-green-400', 'text-green-400' );

            descriptionItemRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );
            descriptionItemRef.current.classList.add( 'text-green-200' );

            specsRef.current.classList.add( 'text-green-200' );
            specsRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );
            
            
        } else {

           await setCurrentItemMenu( 2 );

            specsRef.current.classList.add( 'border-b-4', 'border-green-400', 'text-green-400' );
            specsRef.current.classList.remove( 'text-green-200' );

            detailItemRef.current.classList.add( 'text-green-200' );
            detailItemRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );
            

            descriptionItemRef.current.classList.add( 'text-green-200' ); 
            descriptionItemRef.current.classList.remove( 'border-b-4', 'border-green-400', 'text-green-400' );
              

        };

        

    };

    return (
        <Fade
        ref={ ref } 
        in={ inView }>
            <div className='my-10'>
                <div 
                className={ `${ !mobileResolution && 'flex items-center justify-center' }` }>
                    <div 
                    className={ `w-full flex flex-row p-5 justify-evenly ${ mobileResolution ? 'space-y-5 flex-wrap' : 'space-x-5' }` }>
                        <form 
                        onSubmit={ (e) => {

                            console.log( 'xd' );
                            e.preventDefault();
                            seStatesActionProducts( 'update' );
                        

                        } }
                        onChange={ (e) => {

                            setIsNewChange( true );
                            setInput({ ...input, [ e.target.name ]:e.target.value });

                        } }
                        className={ `flex flex-row  ${ mobileResolution ? 'space-y-5 flex-wrap' : 'space-x-5' } rounded-3xl shadow-2xl h-full` }>
                            <div className={ `${ mobileResolution ? 'w-full' : 'w-80' } one__product__image__container` }>
                                <div className={ `h-96 absolute flex items-end justify-center ${ mobileResolution ? 'w-full padding-inner' : 'w-80' }` }>
                                    <div 
                                    className={ `w-full h-96 flex items-end background ${ !mobileResolution && 'rounded-bl-3xl' } flex-col justify-end leading-3` }>
                                        <input
                                        required
                                        maxLength={ 100 }
                                        name='price'
                                        defaultValue={ input.price }
                                        className='outline-none bg-transparent text-white text-4xl text-center w-full font-bold p-2'
                                        />
                                        <input
                                        required
                                        name='currency'
                                        maxLength={ 3 }
                                        defaultValue={ input.currency }
                                        className='outline-none bg-transparent text-white text-4xl text-center w-full font-bold p-2'
                                        />
                                    </div>
                                </div>
                                <img 
                                className={ `h-96 w-full object-cover rounded-tl-3xl ${ mobileResolution ? 'rounded-tr-3xl' : 'rounded-bl-3xl' }` }
                                alt=''
                                src={ input.image }
                                />
                            </div>
                            <div className={ `${ mobileResolution ? 'w-full' : 'w-80' } second__part flex flex-col space-y-5 h-96<` }>
                                <div className={ `${ mobileResolution && 'px-5' } flex flex-col` }>
                                    <input
                                    maxLength={ 500 }
                                    required
                                    type='text'
                                    name='title'
                                    className='outline-none bg-transparent uppercase font-bold text-lg'
                                    defaultValue={ input.title }
                                    />
                                    <input
                                    type='text'
                                    required
                                    maxLength={ 500 }
                                    name='subtitle'
                                    className='outline-none bg-transparent text-gray-300 font-semibold uppercase'
                                    defaultValue={ input.subtitle }
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
                                                    required
                                                    rowsMin={ 8 }
                                                    name={ index === 0 ? 'description' :  'details' }
                                                    defaultValue={ itemsText[ index ] }
                                                    className='resize-none bg-transparent outline-none w-full font-light'
                                                    />
                                                    <ButtonsActions/>
                                                </>
                                            </Fade> 
                                            :
                                            currentItemMenu === index 
                                            &&
                                            <Fade in={ true }>
                                                <div className='all__realTime__data flex flex-col space-y-3 h-full'>
                                                    <div className='flex flex-row space-x-2'>
                                                        <h3 className='font-light'> Stock: 
                                                        </h3>
                                                        <input
                                                        name='stock'
                                                        defaultValue={ input.stock }
                                                        className='bg-transparent outline-none font-semibold'
                                                        />
                                                    </div>
                                                    <div className='flex flex-row space-x-2 items-center'>
                                                        <h3 className='font-light'>
                                                            Last update:    
                                                        </h3>
                                                        <p className='font-semibold'> 
                                                        { lastUpdate }
                                                        </p>
                                                    </div>
                                                    <ButtonsActions/>
                                                </div>
                                            </Fade> 
                                        }
                                        <div ref={ textItemRef }></div>
                                        </Fragment>
                                    ) ) }
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                { alert.type && <AlertAnimation setCloseAlert={ setAlert } message={ alert.message } severity={ alert.severity }/> }
            </div>
        </Fade>
    );
};

export default CardProductAdmin;
