import React,{ useState } from 'react';
import { IconButton } from '@material-ui/core';
import AddPhotoAlternateRoundedIcon from '@material-ui/icons/AddPhotoAlternateRounded';
import { defaultTransiton } from '../../../../constants/styles';
import ButtonSaveChanges from '../../../reusableComponents/ButtonSaveChanges';
import { useUpdateSectionText } from '../../../../hooks/useUpdateSectionText';
import AlertAnimation from '../../../reusableComponents/AlertAnimation';

const BannerSectionProducts = ( props ) => {

    const { bannerSectionProducts, setIsChangePhoto, bannerSectionProductsText } = props;

    const [input, setInput] = useState( bannerSectionProductsText );

    const { update, isLoading, alert, setAlert, isNewChange, setIsNewChange } = useUpdateSectionText();

    if ( bannerSectionProducts ) return (

        <div                     
        className='w-full h-60 object-cover object-center relative'>
            <div className='absolute h-60 flex items-center max-w-full justify-between z-10 p-2 right-0 left-0'>
                <IconButton
                style={{ opacity:0 }} 
                >
                <AddPhotoAlternateRoundedIcon 
                className='text-green-500'
                style={{ fontSize:'50px' }}/>
                </IconButton>
                <form
                onSubmit={ (e) => update( input, e ) }
                onChange={ (e) => {

                    setInput( e.target.value );
                    setIsNewChange( true );

                } }
                >
                    <input 
                    required
                    placeholder='Title Section Products'
                    defaultValue={ input }
                    name='bannerSectionProductsText'
                    maxLength={ 100 }
                    className='text-white text-3xl bg-transparent w-full outline-none text-center font-semibold'/>
                    <ButtonSaveChanges 
                    isLoading={ isLoading }
                    isNewChange={ isNewChange }/>
                </form> 
                <IconButton
                style={{ outline:'none' }}
                onClick={ () => setIsChangePhoto( { endPoint:'/banner-section', endPointDelete:'/delete-bannerSection' } ) }
                >
                    <AddPhotoAlternateRoundedIcon 
                    className='text-green-300 hover:text-green-500'
                    style={{ fontSize:'50px', transition: "all .15s ease" }}/>
                </IconButton> 
            </div> 
            <img
            style={{ filter:'brightness(0.5)' }}
            className='w-full max-h-full object-cover h-60' 
            src={ bannerSectionProducts }
            alt=''/>
            { alert.type && <AlertAnimation setCloseAlert={ setAlert } { ...alert }/> }
        </div>
    );

    return (
        <div 
        className='h-60 bg-green-400 w-full flex items-center justify-center bg-opacity'>
            <label 
            style={ defaultTransiton }
            onClick={ () => setIsChangePhoto( { endPoint:'/banner-section', endPointDelete:'/delete-bannerSection' } ) }
            className='flex flex-row space-x-2 items-center cursor-pointer text-gray-500 hover:text-black'>
                <AddPhotoAlternateRoundedIcon style={{ fontSize:'50px' }}/>
                <h1 className='text-3xl font-semibold'> 
                Banner Section Products
                </h1>
            </label>
        </div>
    );
};

export default BannerSectionProducts;
