import React, { useEffect, useRef, useState } from 'react'
import BCClogo from '../../../images/bccLogo.png';
import Input from '../../reusableComponents/Input';
import emailValidator from 'email-validator';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import { defaultTransiton } from '../../../constants/styles';
import { Link, useHistory } from 'react-router-dom';
import PropagateLoader from "react-spinners/PropagateLoader";
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import { useMediaQuery } from 'react-responsive';
import BackGroundImage from '../../../images/background.jpg';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import { Fade } from '@material-ui/core';
import { signInUserAPI } from '../../../api/userAPI';
import { signUpLink } from '../../../constants/pathsRouter';
import { useDispatch } from 'react-redux';

const SignIn = () => {

    const dispatch = useDispatch();

    const [input, setInput] = useState( { emailOrUsername:'', password:'' } );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const history = useHistory();

    const url = new URL( window.location.href );

    const accountCreated = url.searchParams.get( 'account__created' );

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const [timer, setTimer] = useState('');

    const [initialColorInput, setInitialColorInput] = useState( '#000000' );
    
    const [loading, setLoading] = useState( false );

    const [isLoadingComponents, setIsLoadingComponents] = useState( true );

    const passwordRef = useRef( null );

    
    useEffect(() => {

        window.scrollTo(0, 0);

        setTimeout(function () {
            let viewheight = window.innerHeight;
            let viewwidth = window.innerWidth;
            let viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
        }, 300);


        setTimeout(() => {

            setIsLoadingComponents( false );
            
        }, 2000);
     

    }, []);

    return (
        <>
        { isLoadingComponents && 
            <div className="divLoader z-50 absolute bg-white">
                <h1 className='point-hidden'> . </h1>
                <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
                </div>
            </div> }
            <Fade in={ isLoadingComponents === false }>
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
                        onSubmit={ (e) => signInUserAPI( input, setAlert, setLoading, e, history, dispatch ) }
                        className='space-y-4 w-full flex flex-col'>
                            <Input
                            alert={ alert }
                            StartIcon={ PersonRoundedIcon }
                            type='text'
                            required={ true }
                            label='Email or Username'
                            value={ input.emailOrUsername }
                            name='emailOrUsername'
                            color={ initialColorInput }
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
