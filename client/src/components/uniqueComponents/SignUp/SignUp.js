import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './SignUp.css';
import BackGroundImage from '../../../images/background.jpg';
import { grey } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider, } from '@material-ui/core/styles';
import { outlineButton } from '../../../constants/styles';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ImageContainer from '../../reusableComponents/ImageContainer';
import { Fade } from '@material-ui/core';
import ThirdStep from './ThirdStep';

const SignUp = ( ) => {


    const [isLoadingComponents, setIsLoadingComponents] = useState( true );

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
            
        }, 1000);
     

    }, []);



        return (
            <>
            { isLoadingComponents && 
                <div className="divLoader h-scren z-50 absolute bg-white">
                    <h1 className='point-hidden'> . </h1>
                    <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                    </div>
                </div> }
            <Fade in={ isLoadingComponents === false }>
                <div 
                className='flex flex-col items-center justify-center h-screen'>
                    <img
                    className='h-screen w-screen object-cover backgroundSignUp'
                    alt=''
                    src={BackGroundImage}/>
                    <FirstStep/>
                    {/* <SecondStep/> */}
                    {/* <ThirdStep/> */}
                </div>
            </Fade>
            </>
        );
        
    
};

export default SignUp;
