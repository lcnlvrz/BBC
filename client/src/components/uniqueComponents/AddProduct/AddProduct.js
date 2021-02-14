import React, { useState, useRef, useEffect } from 'react'
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import { defaultTransiton, fillButton, textAreaDefaultProps } from '../../../constants/styles';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Input from '../../reusableComponents/Input';
import TitleRoundedIcon from '@material-ui/icons/TitleRounded';
import SubtitlesRoundedIcon from '@material-ui/icons/SubtitlesRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import { useMediaQuery } from 'react-responsive';
import DetailsRoundedIcon from '@material-ui/icons/DetailsRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import allCurrencyJSON from '../../../helpers/currencyJSON';
import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded';
import { Fade, IconButton, InputAdornment, TextareaAutosize } from '@material-ui/core';
import { preSubmitPublishProduct } from '../../../helpers/preSubmit';
import { useUploadProduct } from '../../../hooks/useUploadProduct';
import AlertAnimation from '../../reusableComponents/AlertAnimation/AlertAnimation';
import FindReplaceRoundedIcon from '@material-ui/icons/FindReplaceRounded';
import PropagateLoader from "react-spinners/PropagateLoader";
import { initialStateInputAddProduct } from '../../../constants/content';

const AddProduct = () => {


    const [input, setInput] = useState( initialStateInputAddProduct );

    const { alert, cancelToken, setData, setAlert, isLoading, cancelTokenCloudinary } = useUploadProduct(); 
    
    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const productRef = useRef( null );

    const imageRef = useRef( null );

    const formRef = useRef( null );

    const ButtonPublishProduct = () => {

        return (

            <>
            { isLoading 
            ?
            <div className='py-5'>
                <PropagateLoader/>
            </div>  
            :  
            <button
            type='submit'
            className={ `${ fillButton } w-full` }
            >
                PUBLISH PRODUCT
            </button> 
            }
            </>

        );

    };

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    const [file, setFile] = useState( {} );

    const [imagePreview, setImagePreview] = useState( '' );

    const [currency, setCurrency] = useState( '' );

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const [focusCurrency, setFocusCurrency] = useState( false );

    useEffect(() => {

        return () => {

            if ( cancelToken ) cancelToken.cancel();

            if ( cancelTokenCloudinary ) cancelTokenCloudinary.cancel();

        }
        
    }, [ cancelToken, cancelTokenCloudinary ]);

    return (
        <Fade in={ true }>
            <div 
            className={ mobileResolution && 'pt-28' }>
                <form 
                onChange={ (e) => {

                    if ( e.target.name === 'image' ) return setInput( { ...input, image:e.target.files[ 0 ] } );

                    setInput( { ...input, [ e.target.name ]:e.target.value } );

                } }
                onSubmit={ (e) => {

                    e.preventDefault();

                    setData( input );

                } }
                className={ `container__add__product flex ${ mobileResolution ? 'flex-col space-y-5 items-center justify-center' : 'flex-row flex-wrap items-start justify-evenly space-x-5' } px-5 py-5` }>
                    <div className={ `one__part ${ mobileResolution ? 'w-full' : 'w-56 sticky top-24' } ` }>
                        <div
                        className={ `flex flex-col items-center justify-center w-full space-y-5 ${ mobileResolution && 'my-10'}` }>
                            { !input.image ?  
                            <label 
                            className='w-full'
                            htmlFor='product-image'>
                                <div 
                                style={ defaultTransiton }
                                className={ `py-10 px-5 border border-dashed rounded  flex flex-col items-center justify-center hover:bg-green-100 hover:border-green-400 cursor-pointer space-y-5 w-full ${ alert.type !== 'image' ? 'border-green-300 text-green-400 bg-green-50' : 'border-red-500 text-red-500 bg-red-50' }` }>
                                    <AddPhotoAlternateIcon
                                    style={{ fontSize:'40px' }}
                                    className='text-green-400'
                                    />
                                    <h3 className='text-md font-semibold text-center'> 
                                        Click me to add product Photo
                                    </h3>
                                </div>
                            </label> 
                            :
                            <Fade in={ true }>
                                <div className='flex flex-col items-center justify-center'>
                                    <img 
                                    className='w-full rounded object-contain'
                                    src={ imagePreview } 
                                    alt=''/>
                                    <IconButton
                                    onClick={ () => setInput( { ...input, image:null } ) }
                                    style={{ color:'black' }}
                                    >
                                        <FindReplaceRoundedIcon/>
                                    </IconButton>
                                </div>
                            </Fade>
                            }
                            { !mobileResolution &&  <ButtonPublishProduct formRef={ formRef }/> }
                        </div>
                    </div>
                    <div className={ `flex flex-col space-y-5 ${ mobileResolution ? 'w-full' : 'w-auto' }` }>
                        <input
                        key={ Date.now() }
                        ref={ imageRef }
                        name='image'
                        onChange={ (e) => {


                            setFile( e.target.files[0] );

                            const imagePreview = URL.createObjectURL( e.target.files[0] );

                            setImagePreview( imagePreview );


                        } }
                        accept="image/*"
                        className='hidden'
                        id="product-image"
                        type="file"
                        />
                        <Input
                        required={ true }
                        maxLength={ 200 }
                        value={ input.title }
                        isFullWidth={ true }
                        StartIcon={ TitleRoundedIcon }
                        refInput={ productRef }
                        alert={ alert }
                        type='text'
                        color='#000000'
                        name='title'
                        label='Title'
                        variant='outlined'
                        />
                        <Input
                        required={ true }
                        maxLength={ 200 }
                        value={ input.subtitle }
                        isFullWidth={ true }
                        StartIcon={ SubtitlesRoundedIcon }
                        refInput={ productRef }
                        alert={ alert }
                        type='text'
                        color='#000000'
                        name='subtitle'
                        label='Subtitle'
                        variant='outlined'
                        />
                        <Input
                        required={ true }
                        maxLength={ 100 }
                        value={ input.price }
                        isFullWidth={ true }
                        StartIcon={ AttachMoneyRoundedIcon }
                        refInput={ productRef }
                        alert={ alert }
                        type='text'
                        color='#000000'
                        name='price'
                        label='Price'
                        placeholder='Float numbers use . as separator'
                        variant='outlined'
                        />
                        <FormControl 
                        onBlur={ () => setFocusCurrency( false ) }
                        onFocus={ () => setFocusCurrency( true ) }
                        style={{ width:'100%' }}
                        variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
                            <Select
                            startAdornment={ <InputAdornment>
                                <MoneyRoundedIcon
                                className={ `mr-2 ${ !focusCurrency ? 'text-gray-300' : 'text-black' }` }
                                />
                            </InputAdornment> }
                            fullWidth
                            required
                            name="currency"
                            maxLength={ 3 }
                            labelId="currency__money"
                            id="currency__select"
                            value={ input.currency }
                            onChange={ (e) => setInput( { ...input, [ e.target.name ]:e.target.value } ) }
                            label="Currency"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            { allCurrencyJSON.map( ( code, index ) => (

                                <MenuItem 
                                key={ code.code }
                                value={ code.code }>
                                    <span> { code.code } </span>
                                </MenuItem>

                            ) )  }
                            </Select>
                        </FormControl>
                        <TextareaAutosize
                        required
                        value={ input.description }
                        name='description'
                        maxLength={ 1000 }
                        placeholder='Description about the product'
                        style={ defaultTransiton }
                        className='outline-none rounded border-gray-300 border focus:border-black p-2 focus:border-8 resize-none'
                        { ...textAreaDefaultProps }
                        />
                        <TextareaAutosize
                        name='details'
                        required
                        value={ input.details }
                        placeholder='Details about the product'
                        style={ defaultTransiton }
                        className='outline-none rounded border-gray-300 border focus:border-black p-2 focus:border-8 resize-none'
                        { ...textAreaDefaultProps }
                        />
                        <Input
                        required
                        maxLength={ 500 }
                        value={ input.category }
                        isFullWidth={ true }
                        StartIcon={ CategoryRoundedIcon }
                        refInput={ productRef }
                        alert={ alert }
                        type='text'
                        color='#000000'
                        name='category'
                        label='Category'
                        variant='outlined'
                        />
                        <Input
                        required
                        maxLength={ 500 }
                        value={ input.stock }
                        isFullWidth={ true }
                        StartIcon={ FormatListNumberedRoundedIcon }
                        refInput={ productRef }
                        alert={ alert }
                        type='text'
                        color='#000000'
                        name='stock'
                        placeholder='Only integer numbers'
                        label='Stock'
                        variant='outlined'
                        />
                    </div>
                    { mobileResolution &&  <ButtonPublishProduct/> }
                </form>
                { alert.type && <AlertAnimation setCloseAlert={ setAlert } severity={ alert.severity } message={ alert.message }/> }
            </div>
        </Fade>

    );
};

export default AddProduct;
