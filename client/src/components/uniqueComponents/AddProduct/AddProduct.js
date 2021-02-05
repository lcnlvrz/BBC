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

const AddProduct = () => {
    // return (
    //     <div className='px-5'>
    //         <div 
    //         style={ defaultTransiton }
    //         className='flex flex-row justify-center items-center space-x-5 bg-black text-white rounded-2xl cursor-pointer p-5 hover:bg-white hover:text-black'>
    //             <AddShoppingCartRoundedIcon
    //             style={{ fontSize:'80px' }}
    //             />
    //             <h1 className='text-4xl text-center'> 
    //                 Add Product
    //             </h1>
    //         </div>
    //     </div>
    // );

    
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

    return (

        <div className={ `container__add__product flex ${ mobileResolution ? 'flex-col space-y-5 items-center justify-center' : 'flex-row flex-wrap items-start justify-evenly space-x-5' } px-5 py-5` }>

            <div className={ `one__part ${ mobileResolution ? 'w-full' : 'w-56 sticky top-20' } ` }>

                <div className='flex flex-col items-center justify-center w-full space-y-5 my-10'>
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
                    { !mobileResolution &&  <ButtonPublishProduct/> }
                </div>

            </div>
            <form className={ `second__part flex flex-col ${ mobileResolution ? 'w-full' : 'w-80' } space-y-5` }>
                <Input
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
                isFullWidth={ true }
                StartIcon={ AttachMoneyRoundedIcon }
                refInput={ productRef }
                alert={ alert }
                type='text'
                color='#000000'
                name='price'
                label='Price'
                variant='outlined'
                />
                <Input
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
                isFullWidth={ true }
                StartIcon={ FormatListNumberedRoundedIcon }
                refInput={ productRef }
                alert={ alert }
                type='text'
                color='#000000'
                name='stock'
                label='Stock'
                variant='outlined'
                />
                { mobileResolution &&  <ButtonPublishProduct/> }

            </form>

        </div>

    )
};

export default AddProduct;
