import React, { useRef, useState, useEffect } from 'react'
import { Fade, IconButton, TextField } from '@material-ui/core';
import AvatarStatus from '../../../reusableComponents/AvatarStatus.js';
import { useSelector } from 'react-redux';
import Theme from '../../../reusableComponents/Theme/Theme.js';
import { validateName } from '../../../../helpers/validations.js';
import { defaultTransiton, fillButton } from '../../../../constants/styles.js';
import AlertAnimation from '../../../reusableComponents/AlertAnimation/index.js';
import { useFixViewPort } from '../../../../hooks/useFixViewport.js';
import FileBase64 from 'react-file-base64';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { useMediaQuery } from 'react-responsive';
import { KeyboardReturn } from '@material-ui/icons';
import AddPhotoAlternateRoundedIcon from '@material-ui/icons/AddPhotoAlternateRounded';
import { Fragment } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Form = ( props ) => {

    const { input, setIsFormFillOut, setInput, setImage, image, setIsContinueWithDataFromLS } = props; 

    useFixViewPort();

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const currentSearch = useSelector(state => state.currentSearch);

    const [alert, setAlert] = useState( { type:'', message:'', severity:'' } );

    const fileBase64ParentRef = useRef( null );

    
    useEffect(() => {

        if ( fileBase64ParentRef.current ) {

            const children = fileBase64ParentRef.current.children[0];

           children.setAttribute( 'id', 'image-client' );
           children.setAttribute( 'name', 'image' );
           children.classList.add( 'hidden' );

        };
        
    }, [ fileBase64ParentRef ]);

    const [checked, setChecked] = useState( false );

    return (
        <Fade in={ true }>
            <div className={ `h-screen flex flex-col items-center justify-center ${ mobileResolution ? 'space-y-3' : 'space-y-5' } mx-5` }>
                <AvatarStatus 
                status={ true } 
                spacingBadge={ mobileResolution ? 3 : 6 } 
                spacingAvatar={ mobileResolution ? 10 : 15 } 
                souceProfilePhoto={ currentSearch.profilePhoto } 
                vertical='bottom'
                horizontal='right'/>
                <h1 className={ `font-semibold ${ mobileResolution ? 'text-md' : 'text-3xl' } text-center` }> 
                    { currentSearch.businessName } is waiting for you! 
                </h1>
                <Theme color='#000000'>
                    <form
                    onSubmit={ (e) => {

                        e.preventDefault();

                        if ( !input.completeName ) return setAlert( { type:'invalidCompleteName', message:"The name can't be empty", severity:'error' } );


                        const validation = validateName( input.completeName );

                        if ( !validation ) return setAlert( { type:'invalidName', message:"The name isn't valid. Only accepts letters", severity:'error' } );
                                                
                        if ( checked ) {

                            localStorage.setItem( 'completeName', input.completeName );
                            localStorage.setItem( 'image', image );
                            setIsContinueWithDataFromLS( true );

                        };

                        setIsFormFillOut( true );
                        

                    } }
                    onChange={ (e) => {

                        if ( e.target.name === 'completeName' ) setInput( { completeName:e.target.value } );

                    } }
                    className='flex flex-col items-center justify-center space-y-5'
                    >
                        <TextField
                        autoComplete='off'
                        fullWidth
                        inputProps={ { maxLength:100 } }
                        placeholder='Only letters accepts' 
                        name='completeName'
                        label="Complete Name" 
                        variant="outlined"
                        />
                        { !image ? 
                        <label 
                        className='w-full'
                        htmlFor='image-client'> 
                           <div 
                           style={ defaultTransiton }
                           className='border border-green-300 border-dashed p-5 bg-green-50 w-full text-center text-gray-400 hover:text-gray-600 hover:border-green-400 hover:bg-green-100 cursor-pointer'>
                                <div className='flex flex-col items-center justify-center'>
                                    <div className='flex flex-row'>
                                        <AddPhotoAlternateIcon/>
                                        <h3 className='font-semibold'> Profile Photo </h3>
                                    </div>
                                    <h5 className='font-light'> *It's not necessary </h5>
                                </div>
                           </div>
                        </label>  
                        :
                        <Fade in={ true }>
                            <div className='relative'>
                                <div className='absolute w-full h-full flex items-end justify-end'>
                                    <label htmlFor='image-client'>
                                        <span
                                        style={ defaultTransiton } 
                                        className='p-2 bg-black rounded-full flex items-center justify-center m-2 outline-none active:outline-none hover:text-green-300 text-white focus:outline-none focus:bg-white focus:text-black cursor-pointer' >
                                        
                                            <AddPhotoAlternateRoundedIcon
                                            />
                                        </span>
                                    </label>
                                </div>
                                <img 
                                className={ `${ mobileResolution ? 'w-full' : 'w-56' } h-48 object-cover rounded` }
                                src={ image } 
                                alt=''/>
                            </div>
                        </Fade>
                        }
                        <div 
                        className='hidden'
                        ref={ fileBase64ParentRef }>
                            <FileBase64
                            multiple={ false }
                            onDone={ ( file ) => {

                                const { base64, file:image } = file;

                                if ( image.size > 100000 ) return setAlert( { type:'heavyImage', message:"The image is so heavy, try with another less 100 KB", severity:'error' } );

                                setImage( base64 );

                            } } />
                        </div>
                        <FormControlLabel
                        className='w-full font-semibold'
                        control={

                            <Checkbox 
                            style={{ color:'#47c746' }}
                            checked={ checked } 
                            onChange={ (e) => setChecked( e.target.checked ) }
                            />

                        }
                        label="Remember me"
                        />
                        <button 
                        type='submit'
                        style={ { transition: "all .15s ease", borderRadius:'5px' } }
                        className={ `${ fillButton } w-full` }>

                            JOIN

                        </button>
                    </form>
                </Theme>
                { alert.type && 
                <AlertAnimation 
                setCloseAlert={ setAlert }
                severity={ alert.severity } 
                message={ alert.message }/> 
                }
            </div>
        </Fade> 
    );
};

export default Form;
