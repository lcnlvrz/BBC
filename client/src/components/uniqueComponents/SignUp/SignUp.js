import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './SignUp.css';
import BackGroundImage from '../../../images/background.jpg';
import { grey } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider, } from '@material-ui/core/styles';
import { outlineButton } from '../../../constants';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ImageContainer from '../../reusableComponents/ImageContainer';
import { Fade } from '@material-ui/core';

const SignUp = ( ) => {


    const [isLoading, setIsLoading] = useState( false );

    useEffect(() => {
        
        setTimeout(function () {
            let viewheight = window.innerHeight;
            let viewwidth = window.innerWidth;
            let viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
        }, 300);


        setTimeout(() => {

            setIsLoading( true );
            
        }, 2000);
     

    }, []);



        return (
            <>
            { !isLoading && 
            <div class="divLoader">
            <h1 class='point-hidden'> . </h1>
            <div class="sk-folding-cube">
              <div class="sk-cube1 sk-cube"></div>
              <div class="sk-cube2 sk-cube"></div>
              <div class="sk-cube4 sk-cube"></div>
              <div class="sk-cube3 sk-cube"></div>
            </div>
          </div> }
            <Fade in={isLoading}>
                <div 
                className='flex flex-col items-center justify-center h-screen'>
                    <img
                    className='h-screen w-screen object-cover backgroundSignUp'
                    alt=''
                    src={BackGroundImage}/>
                    {/* <FirstStep/> */}
                    <SecondStep/>
                </div>
            </Fade>
            </>
        );
        
    
};

export default SignUp;
