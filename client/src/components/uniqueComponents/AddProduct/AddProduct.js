import React, { useRef, useEffect } from 'react'
import { defaultTransiton, fillButton, textAreaDefaultProps } from '../../../constants/styles';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Input from '../../reusableComponents/Input';
import TitleRoundedIcon from '@material-ui/icons/TitleRounded';
import SubtitlesRoundedIcon from '@material-ui/icons/SubtitlesRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import { useMediaQuery } from 'react-responsive';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import allCurrencyJSON from '../../../helpers/currencyJSON';
import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded';
import { Fade, IconButton, InputAdornment, TextareaAutosize } from '@material-ui/core';
import { useUploadProduct } from '../../../hooks/useUploadProduct';
import AlertAnimation from '../../reusableComponents/AlertAnimation/AlertAnimation';
import FindReplaceRoundedIcon from '@material-ui/icons/FindReplaceRounded';
import PropagateLoader from "react-spinners/PropagateLoader";
import Theme from '../../reusableComponents/Theme';
import { useDispatch } from 'react-redux';  
import { setTitle } from '../../../actions/helmetTitle';

const PreviewImage = ( props ) => {

    const { imagePreview, setInput, input } = props;  


    return (

        <Fade in>
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

    );

};

const CurrencyInput = ( props ) => {

    const { input, setInput } = props;

    return ( 

        <Theme color='#000000' >
            <FormControl    
            style={{ width:'100%' }}
            variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
                <Select
                startAdornment={ <InputAdornment>
                    <MoneyRoundedIcon
                    className='mr-2'/>
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
                { allCurrencyJSON.map( ( code ) => (

                    <MenuItem 
                    key={ code.code }
                    value={ code.code }>
                        <span> { code.code } </span>
                    </MenuItem>

                ) )  }
                </Select>
            </FormControl>
        </Theme>

    );

};

const Inputs = ( props ) => {

    const { imageRef, onChangeInputFile, defaultInputProps, input, setInput } = props;

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const propsCurrency = { input, setInput };

    const inputsProps = [ { maxLenght:200 , value:input.title , StartIcon:TitleRoundedIcon, name:'title', label:'Title'}, { maxLenght:200 , value:input.subtitle, StartIcon:SubtitlesRoundedIcon, name:'subtitle', label:'Subtitle'}, { maxLenght:100, value:input.price, StartIcon:AttachMoneyRoundedIcon, name:'price', label:'Price'}, { maxLenght:500, value:input.category, StartIcon:CategoryRoundedIcon, name:'category', label:'Category'}, { maxLenght:500, value:input.stock, StartIcon:FormatListNumberedRoundedIcon, name:'stock', label:'Stock'} ];

    const textAreaProps = [{ value:input.description, name:'description', maxLength:1000, placeholder:'Description about the product', style:defaultTransiton }, { value:input.details, name:'details', maxLength:1000, placeholder:'Details about the product', style:defaultTransiton }];

    return (
        <div className={ `flex flex-col space-y-5 ${ mobileResolution ? 'w-full' : 'w-auto' }` }>
            <input
            key={ Date.now() }
            ref={ imageRef }
            name='image'
            onChange={ (e) => onChangeInputFile(e) }
            accept="image/*"
            className='hidden'
            id="product-image"
            type="file"
            />
            { inputsProps.map( ( input ) => {

                const props = { ...defaultInputProps, ...input, key:input.name };

                return <Input { ...props }/>

            } ) }
            
            <CurrencyInput { ...propsCurrency }/>
            
            { textAreaProps.map( ( textarea ) => {

                const props = { ...textAreaDefaultProps, ...textarea, key:textarea.name, className:'outline-none rounded border-gray-300 border focus:border-black p-2 focus:border-8 resize-none' };

                return <TextareaAutosize { ...props } />

            } ) }
        </div> 
    )
};
  

const ButtonAddImageProduct = ( props ) => {

    const { alert } = props;

    return (

        <label 
        className='w-full'
        htmlFor='product-image'>
            <div 
            style={ defaultTransiton }
            className={ `py-10 px-5 border border-dashed rounded  flex flex-col items-center justify-center hover:bg-green-100 hover:border-green-400 cursor-pointer space-y-5 w-full ${ alert.severity !== 'error' ? 'border-green-300 text-green-400 bg-green-50' : 'border-red-500 text-red-500 bg-red-50' }` }>
                <AddPhotoAlternateIcon
                style={{ fontSize:'40px' }}
                className='text-green-400'
                />
                <h3 className='text-md font-semibold text-center'> 
                    Click me to add product Photo
                </h3>
            </div>
        </label> 

    );

};

const ImagePlaceHolderAndButton = ( props ) => {

    const { input, isLoading, imagePreview, setInput, alert } = props;

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const propsPreviewImage = { imagePreview, setInput, input };

    return (

        <div className={ `one__part ${ mobileResolution ? 'w-full' : 'w-56 sticky top-24' } ` }>
            <div
            className={ `flex flex-col items-center justify-center w-full space-y-5 ${ mobileResolution && 'my-10'}` }>
                { !input.image ? <ButtonAddImageProduct alert={ alert }/> : <PreviewImage {...propsPreviewImage}/> }
                { !mobileResolution && <ButtonPublishProduct isLoading={ isLoading }/> }
            </div>
        </div>

    );

};

const ButtonPublishProduct = ( props ) => {

    const { isLoading } = props;

    if ( isLoading ) return (

        <div className='py-5'>
            <PropagateLoader/>
        </div>  

    );

    return (

        <button
        type='submit'
        className={ `${ fillButton } w-full` }
        >
            PUBLISH PRODUCT
        </button> 

    );

};

const AddProduct = () => {

    const { alert, setAlert, isLoading, uploadProduct, input, setInput, onChangeForm, imagePreview, onChangeInputFile } = useUploadProduct(); 
    
    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const productRef = useRef( null );

    const imageRef = useRef( null );

    const defaultInputProps = {

        required:true,
        isFullWidth:true,
        alert,
        type:'text',
        color:'#000000',
        variant:'outlined',
        refInput:productRef

    };

    const propsInputs = { imageRef, onChangeInputFile, input, setInput, defaultInputProps };

    const propsImagePlaceHolder = { input, isLoading, imagePreview, setInput, alert };

    const classNameForm = `container__add__product flex ${ mobileResolution ? 'flex-col space-y-5 items-center justify-center' : 'flex-row flex-wrap items-start justify-evenly space-x-5' } px-5 py-5`;

    
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch( setTitle( `Business Client Connection - Add Product` ) );
        
    }, [ dispatch ]);
                    
    return (
        <Fade in>
            <div 
            className={ mobileResolution ? 'pt-28' : '' }>
                <form 
                onChange={ (e) => onChangeForm(e) }
                onSubmit={ (e) => uploadProduct( input, e ) }
                className={ classNameForm }>
                    <ImagePlaceHolderAndButton {...propsImagePlaceHolder}/>
                    <Inputs {...propsInputs}/>
                    { mobileResolution &&  <ButtonPublishProduct isLoading={ isLoading }/> }
                </form>
                { alert.type && <AlertAnimation setCloseAlert={ setAlert } {...alert}/> }
            </div>
        </Fade>
    );
};

export default AddProduct;
