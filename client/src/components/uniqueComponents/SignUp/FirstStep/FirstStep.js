import React, { useEffect, useRef, useState } from 'react'
import BCClogo from '../../../../images/bccLogo.png';
import Input from '../../../reusableComponents/Input';
import emailValidator from 'email-validator';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import { defaultTransiton } from '../../../../constants';
import { Link } from 'react-router-dom';
import PropagateLoader from "react-spinners/PropagateLoader";
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import { useMediaQuery } from 'react-responsive';

const FirstStep = () => {


    const [input, setInput] = useState( { email:'' } );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const [timer, setTimer] = useState('');

    const inputEmailRef = useRef( null );

    const [initialColorInput, setInitialColorInput] = useState( '#000000' );
    
    const [loading, setLoading] = useState( false );

    return (
        <div 
        style={{ overflow:'hidden' }}
        className='text-center flex flex-col items-center justify-center w-3/4 bg-white rounded p-5 space-y-10 absolute'>
            <img 
            className='w-28'
            alt=''
            src={BCClogo}
            />
            <p className={ `font-semibold text-center ${ mobileResolution ? 'text-sm' : 'text-lg' }` }> 
                By having a BCC account, you can create a perfil business and change everything.
            </p>
            <form 
            onChange={ (e) => setInput({ email:e.target.value }) }
            onSubmit={ (e) => { 


                setInitialColorInput( '#000000' );
                setAlert( { type:'', message:'' } );

                e.preventDefault() 

                const isValid = emailValidator.validate( input.email );

                if ( !isValid ){

                    inputEmailRef.current.focus();
                    setInitialColorInput( '#FF0000' );

                    setAlert( { type:'input', message:"The email isn't valid" } );

                    return false;
                };


                
            } }
            className='space-y-4 w-full flex flex-col'>
                <Input
                IconEndAdornment={ EmailRoundedIcon }
                refInput={ inputEmailRef }
                type='text'
                required={ true }
                label='Email'
                value={ input.email }
                name='email'
                color={ initialColorInput }
                isFullWidth={ true }
                variant='outlined'
                />
                { alert.type && 
                <div className='flex flex-row text-left space-x-2'>
                    <ErrorRoundedIcon className='text-red-500'/>
                    <h1 className='text-red-500 font-semibold'> 
                        { alert.message }
                    </h1> 
                </div> }
                { loading ?
                <div className='py-5'>
                    <PropagateLoader/> 
                </div> 
                : 
                <button 
                type='submit'
                className='text-gray-500 bg-transparent border border-solid border-gray-400 hover:bg-black hover:text-white active:bg-gray-600 font-bold uppercase px-8 py-2 rounded outline-none focus:outline-none w-full'>
                    NEXT
                </button> }
            </form>
            <h3 className='text-md font-light flex flex-row flex-wrap items-center justify-center'> 
                Already have an account?
                <Link className='break-words' to='/sign-in'>
                    <span 
                    style={ defaultTransiton }
                    className='text-red-400 font-semibold hover:text-red-600 cursor-pointer ml-1'> 
                        SIGN IN 
                    </span>
                </Link>  
            </h3>
        </div>
    );
};

export default FirstStep;
