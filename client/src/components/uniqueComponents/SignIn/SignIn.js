import React, { useEffect, useRef, useState } from 'react'
import BCClogo from '../../../images/bccLogo.png';
import Input from '../../reusableComponents/Input';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import { defaultTransiton } from '../../../constants/styles';
import { Link } from 'react-router-dom';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useMediaQuery } from 'react-responsive';
import BackGroundImage from '../../../images/background.jpg';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import { Fade } from '@material-ui/core';
import { signUpLink } from '../../../constants/pathsRouter';
import { useSignIn } from '../../../hooks/useSignIn';
import { useDelayComponent } from '../../../hooks/useDelayComponent';
import LoadingAnimation from '../../reusableComponents/LoadingAnimation';

const SignIn = () => {

    const { isLoading, cancelToken, alertFetch, setData } = useSignIn();

    const { setIsStartDelay, isLoadingComponent } = useDelayComponent();

    useEffect(() => {

        return () => {

            if ( cancelToken ) cancelToken.cancel();

        };
        
    }, [ cancelToken ]);

    useEffect(() => setIsStartDelay( true ), [ setIsStartDelay ]);

    const [input, setInput] = useState( { emailOrUsername:'', password:'' } );

    const url = new URL( window.location.href );

    const accountCreated = url.searchParams.get( 'account__created' );

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const passwordRef = useRef( null );

    return (
        <>
        { isLoadingComponent && <LoadingAnimation/> }
            <Fade in={ isLoadingComponent === false }>
                <div className='flex flex-col items-center justify-center h-screen'>
                    <img
                    className='h-screen w-screen object-cover backgroundSignUp'
                    alt=''
                    src={BackGroundImage}/>
                    <div 
                    style={{ overflow:'hidden' }}
                    className='text-center flex flex-col items-center justify-center w-3/4 bg-white rounded p-5 space-y-10 absolute'>
                        <Link to='/'>
                            <img 
                            className='w-28'
                            alt=''
                            src={BCClogo}
                            />
                        </Link>
                        <p className={ `font-semibold text-center ${ mobileResolution ? 'text-sm' : 'text-lg' }` }> 
                            { accountCreated === 'true' ? 'Account created successfully. You can sign-in now!' : 'Sign in as soon as possible, the clients are waiting information about your business' }
                        </p>
                        <form 
                        onChange={ (e) => setInput({...input, [ e.target.name ]:e.target.value }) }
                        onSubmit={ (e) => {
                            e.preventDefault();
                            setData( input );
                        } }
                        className='space-y-4 w-full flex flex-col'>
                            <Input
                            alert={ alert }
                            StartIcon={ PersonRoundedIcon }
                            type='text'
                            required={ true }
                            label='Email or Username'
                            value={ input.emailOrUsername }
                            name='emailOrUsername'
                            color='#000000'
                            isFullWidth={ true }
                            variant='outlined'
                            />
                            <Input
                            refInput={ passwordRef }
                            alert={ alert }
                            StartIcon={ VpnKeyRoundedIcon }
                            isPassword={ true }
                            type='password'
                            required={ true }
                            label='Password'
                            value={ input.password }
                            name='password'
                            color='#000000'
                            isFullWidth={ true }
                            variant='outlined'
                            />
                            { alertFetch.type && 
                            <div className='flex flex-row text-left space-x-2'>
                                <ErrorRoundedIcon className='text-red-500'/>
                                <h1 className='text-red-500 font-semibold'> 
                                    { alertFetch.message }
                                </h1> 
                            </div> }
                            { isLoading ?
                            <div className='py-5'>
                                <PropagateLoader/> 
                            </div> 
                            : 
                            <button 
                            style={ defaultTransiton }
                            type='submit'
                            className='text-gray-500 bg-transparent border border-solid border-gray-400 hover:bg-black hover:text-white active:bg-gray-600 font-bold uppercase px-8 py-2 rounded outline-none focus:outline-none w-full'>
                                LOGIN
                            </button> }
                        </form>
                        <h3 className='text-md font-light flex flex-row flex-wrap items-center justify-center'> 
                            Not have an account?
                            <Link className='break-words' to={ signUpLink }>
                                <span 
                                style={ defaultTransiton }
                                className='text-red-400 font-semibold hover:text-red-600 cursor-pointer ml-1'> 
                                    SIGN UP
                                </span>
                            </Link>  
                        </h3>
                    </div>
                </div>
            </Fade>
        </>
    );
};

export default SignIn;
