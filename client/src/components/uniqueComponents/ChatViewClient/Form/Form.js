import React, { useRef, useState, useEffect } from 'react'
import { Fade, TextField } from '@material-ui/core';
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

const Form = ( props ) => {

    const { input, setIsFormFillOut, setInput, setImage, image } = props; 

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

    return (
        <Fade in={ true }>
            <div className='h-screen flex flex-col items-center justify-center space-y-5 mx-5'>
                <AvatarStatus 
                status={ true } 
                spacingBadge={ 5 } 
                spacingAvatar={ 15 } 
                souceProfilePhoto={ currentSearch.profilePhoto } 
                vertical='bottom'
                horizontal='right'/>
                <h1 className='font-semibold text-3xl text-center'> 
                    { currentSearch.businessName } is waiting for you! 
                </h1>
                <Theme color='#000000'>
                    <form
                    onSubmit={ (e) => {

                        e.preventDefault();

                        if ( !input.completeName ) return setAlert( { type:'invalidCompleteName', message:"The name can't be empty", severity:'error' } );

                        const validation = validateName( input.completeName );

                        if ( !validation ) return setAlert( { type:'invalidName', message:"The name isn't valid. Only accepts letters", severity:'error' } );

                        setIsFormFillOut( true );

                    } }
                    onChange={ (e) => {

                        if ( e.target.name !== 'image' ) setInput( { completeName:e.target.value } );

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
                        <img 
                        className={ `${ mobileResolution ? 'w-full' : 'w-56' }` }
                        src={ image } 
                        alt=''/>
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
                        <button 
                        style={{ width:'100%', borderRadius:'5px' }}
                        className={ fillButton }>

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
