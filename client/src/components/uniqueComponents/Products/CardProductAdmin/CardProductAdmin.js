import React, { useRef, useState } from 'react';
import { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import { defaultTransiton } from '../../../../constants/styles';
import Fade from '@material-ui/core/Fade';
import { IconButton, TextareaAutosize } from '@material-ui/core';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import moment from 'moment';
import { useUpdateProduct } from '../../../../hooks/useUpdateProduct';
import AlertAnimation from '../../../reusableComponents/AlertAnimation';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useInView } from 'react-intersection-observer';
import TimeAgoInterval from '../../../reusableComponents/TimeAgoInterval';


const ButtonsActions = ( props ) => {

    const { isLoading, setStatesActionProducts, isNewChange } = props;

    const NoFetching = () => {

        const SaveChangesButton = () => {

            return (
                <IconButton
                disabled={ isNewChange ? false : true }
                type='submit'
                style={{ outline:'none' }}
                >
                    <CheckCircleRoundedIcon
                    className='text-green-400'
                    />
                </IconButton>
            );
        
        };
        
        return (

            <Fragment>
                <IconButton
                onClick={ () => setStatesActionProducts( 'delete' ) }
                style={{ outline:'none' }}
                >
                    <RemoveCircleRoundedIcon
                    className='text-red-500'
                    />
                </IconButton>
                { isNewChange && <SaveChangesButton/> }
            </Fragment>

        );

    };

    const Loader = () => {

        return (

            <div className='w-full flex items-center justify-center'>
                <PropagateLoader/> 
            </div> 

        );

    };

    return (
        <div className='w-full flex justify-end flex-row'>
            { !isLoading ? <NoFetching/> : <Loader/> }
        </div>
    );

};

const ProductImageZone = ( props ) => {

    const { input } = props;

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    return (

        <div className={ `${ mobileResolution ? 'w-full' : 'w-80' } one__product__image__container` }>
            <div className={ `h-96 absolute flex items-end justify-center ${ mobileResolution ? 'w-full padding-inner' : 'w-80' }` }>
                <div 
                className={ `w-full h-20 flex flex-row items-end background ${ !mobileResolution && 'rounded-bl-3xl' } justify-end leading-3` }>
                    <input
                    required
                    maxLength={ 100 }
                    name='price'
                    defaultValue={ input.price }
                    className='outline-none bg-transparent text-white text-4xl font-bold p-2 w-1/2 text-right'
                    />
                    <input
                    required
                    name='currency'
                    maxLength={ 3 }
                    defaultValue={ input.currency }
                    className='outline-none bg-transparent text-white text-4xl  w-1/2 font-bold p-2 text-left'
                    />
                </div>
            </div>
            <img 
            className={ `h-96 w-full object-cover rounded-tl-3xl ${ mobileResolution ? 'rounded-tr-3xl' : 'rounded-bl-3xl' }` }
            alt=''
            src={ input.image }
            />
        </div>

    );


};

const TitleAndSubtitle = ( props ) => {

    const { input } = props;

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    return (

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

    );

};

const SectionInfoProduct = ( props ) => {

    const { itemsMenu, handleSelectItem } = props;

    return (

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

    )

};

const DescriptionAndDetails = ( props ) => {

    const { index, text } = props;

    return (

        <Fragment>
            <TextareaAutosize
            rowsMax={ 8 }
            required
            rowsMin={ 8 }
            defaultValue={ text }
            name={ index === 0 ? 'description' :  'details' }
            className='resize-none bg-transparent outline-none w-full font-light'
            />
            
        </Fragment>

    );

};

const SpecsSection = ( props ) => {

    const { input, parseLastUpdate } = props;

    return (

        <Fade in>
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
                    <TimeAgoInterval 
                    classes='font-semibold'
                    date={ parseLastUpdate }/>
                </div>
                
            </div>
        </Fade> 

    );

};

const HandleInfoProduct = ( props ) => {

    const { currentItemMenu, itemsText, parseLastUpdate, input } = props;

    if (currentItemMenu === 0 || currentItemMenu === 1) return <DescriptionAndDetails
    index={ currentItemMenu } 
    text={ itemsText[currentItemMenu] }/> 

    return <SpecsSection 
    parseLastUpdate={ parseLastUpdate }
    input={ input }/>

};

 
const CardProductAdmin = ( props ) => {

    const [ref, inView] = useInView({
        triggerOnce: true
    });

    const [isNewChange, setIsNewChange ] = useState( false );

    const { product, index } = props;

    const { alert, setAlert, setData, setProductID, isLoading, setIndexProduct, setAction } = useUpdateProduct();

    const parseLastUpdate = moment.unix( product.lastUpdate ).format();

    const [currentItemMenu, setCurrentItemMenu ] = useState( 0 );

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const descriptionItemRef = useRef( null );
    const detailItemRef = useRef( null );
    const specsRef = useRef( null );

    const itemsMenu = [ { title:'DESCRIPTION', ref:descriptionItemRef }, { title:'DETAILS', ref:detailItemRef }, { title:'SPECS', ref:specsRef } ];

    const itemsText = [ product.description, product.details, product.lastUpdate ];

    const initialStateInputAddProduct = { title:product.title, subtitle:product.subtitle, price:product.price, description:product.description, details:product.details, category:product.category, stock:product.stock, currency:product.currency, image:product.image };

    const [input, setInput] = useState( initialStateInputAddProduct );

    const setStatesActionProducts = ( action, e ) => {

        if ( action !== 'delete' ) e.preventDefault();
        setAction( action );
        setData( input );
        setProductID( product._id );
        setIndexProduct( index );

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

    const submitProduct = (e) => {

        if ( !isNewChange ) setIsNewChange( true );
                            
        setInput({ ...input, [ e.target.name ]:e.target.value });

    };

    const propsHandleInfo = { currentItemMenu, itemsText, parseLastUpdate, input };

    return (
        <Fade
        ref={ ref } 
        in={ inView }>
            <div 
            className={ `${ !mobileResolution && 'flex items-center justify-center' } ` }>
                <div 
                className={ `w-full flex flex-row p-5 justify-evenly ${ mobileResolution ? 'space-y-5 flex-wrap' : 'space-x-5' }` }>
                    <form 
                    onSubmit={ (e) =>  setStatesActionProducts( 'update', e )}
                    onChange={ (e) => submitProduct( e ) }
                    className={ `flex flex-row  ${ mobileResolution ? 'space-y-5 flex-wrap w-full' : 'space-x-5' } rounded-3xl shadow-2xl h-full` }>
                        <ProductImageZone input={ input }/>
                        <div className={ `${ mobileResolution ? 'w-full' : 'w-80' } second__part flex flex-col space-y-5 h-96<` }>
                            <TitleAndSubtitle input={ input }/>
                            <div className={ `flex flex-col space-y-2 ${ mobileResolution ? 'pl-5 pr-5 pb-5' : 'pr-5' }` }>
                                <SectionInfoProduct 
                                itemsMenu={ itemsMenu } 
                                handleSelectItem={ handleSelectItem }/>
                                <HandleInfoProduct {...propsHandleInfo}/>
                                <ButtonsActions 
                                isLoading={ isLoading }
                                setStatesActionProducts={ setStatesActionProducts } 
                                isNewChange={ isNewChange }
                                />
                            </div>
                        </div>
                    </form>
                </div>
                { alert.type && <AlertAnimation setCloseAlert={ setAlert } {...alert}/> }
            </div>
        </Fade>
    );
};

export default CardProductAdmin;
