import React, { useState, useRef } from 'react'
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import { defaultTransiton, fillButton } from '../../../constants/styles';
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
import { Fade, InputAdornment } from '@material-ui/core';

const AddProduct = () => {


    const [input, setInput] = useState( { title:'', subtitle:'', price:'', description:'', details:'', category:'', stock:'' } );

    
    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const productRef = useRef( null );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const ButtonPublishProduct = () => {

        return (

            <button
            className={ `${ fillButton } w-full` }
            >
                PUBLISH PRODUCT
            </button>

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

    return (
        <Fade in={ true }>
            <div className={ `container__add__product flex ${ mobileResolution ? 'flex-col space-y-5 items-center justify-center' : 'flex-row flex-wrap items-start justify-evenly space-x-5' } px-5 py-5` }>
                <div className={ `one__part ${ mobileResolution ? 'w-full' : 'w-56 sticky top-20' } ` }>
                        <input
                        onChange={ (e) => {

                            setFile( e.target.files[0] );

                            const imagePreview = URL.createObjectURL( e.target.files[0] );


                            setImagePreview( imagePreview );


                        } }
                        accept="image/*"
                        className='hidden'
                        id="product-image"
                        multiple
                        type="file"
                        />
                    <div 
                    className='flex flex-col items-center justify-center w-full space-y-5 my-10'>
                        { !imagePreview ?  
                        <label 
                        className='w-full'
                        htmlFor='product-image'>
                            <div 
                            style={ defaultTransiton }
                            className='py-10 px-5 border border-dashed rounded border-green-400 bg-green-50 flex flex-col items-center justify-center hover:bg-green-100 hover:border-green-400 cursor-pointer space-y-5 w-full'>

                                <AddPhotoAlternateIcon
                                style={{ fontSize:'40px' }}
                                className='text-green-400'
                                />
                                <h3 className='text-md font-semibold text-green-400'> 
                                    Click me to add product Photo
                                </h3>
                            
                            </div>
                        </label> 
                        :
                        <img 
                        className='w-full max-h-full rounded'
                        src={ imagePreview } 
                        alt=''/>}
                        { !mobileResolution &&  <ButtonPublishProduct/> }
                    </div>

                </div>
                <form 
                onChange={ (e) => setInput( { ...input, [ e.target.name ]:e.target.value } ) }
                onSubmit={ (e) => {

                    e.preventDefault();

                    console.log( input );

                } }
                className={ `second__part flex flex-col ${ mobileResolution ? 'w-full' : 'w-80' } space-y-5` }>
                    <Input
                    maxLength={ 500 }
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
                    maxLength={ 500 }
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
                    maxLength={ 500 }
                    value={ input.price }
                    isFullWidth={ true }
                    StartIcon={ AttachMoneyRoundedIcon }
                    refInput={ productRef }
                    alert={ alert }
                    type='text'
                    color='#000000'
                    name='price'
                    label='Price'
                    placeholder='Float and integer numbers'
                    variant='outlined'
                    />
                    <FormControl 
                    style={{ width:'100%' }}
                    variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
                        <Select
                        startAdornment={ <InputAdornment>
                            <MoneyRoundedIcon
                            className='mr-2'
                            />
                        </InputAdornment> }
                        fullWidth
                        maxLength={ 500 }
                        labelId="currency__money"
                        id="currency__select"
                        value={currency}
                        onChange={handleChange}
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
                    <Input
                    maxLength={ 500 }
                    value={ input.description }
                    isFullWidth={ true }
                    StartIcon={ DescriptionRoundedIcon }
                    refInput={ productRef }
                    alert={ alert }
                    type='text'
                    color='#000000'
                    name='description'
                    label='Description'
                    variant='outlined'
                    />
                    <Input
                    maxLength={ 500 }
                    value={ input.details }
                    isFullWidth={ true }
                    StartIcon={ InfoRoundedIcon }
                    refInput={ productRef }
                    alert={ alert }
                    type='text'
                    color='#000000'
                    name='details'
                    label='Details'
                    variant='outlined'
                    />
                    <Input
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
                    
                    { mobileResolution &&  <ButtonPublishProduct/> }
                </form>
            </div>
        </Fade>

    );
};

export default AddProduct;
