import React, { useState, useEffect } from 'react'
import './SignUp.css';
import BackGroundImage from '../../../images/background.jpg';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import { Fade } from '@material-ui/core';
import ThirdStep from './ThirdStep';
import { useFixViewPort } from '../../../hooks/useFixViewport';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../actions/helmetTitle';

const SignUp = () => {

    useFixViewPort();

    const dispatch = useDispatch();

    const [steps, setSteps] = useState( { firstStep:true, secondStep:false, thirdStep:false } );

    const [userData, setUserData] = useState( { email:'', otp:0 } );

    useEffect(() => {

        dispatch( setTitle( 'Business Client Connection - SignUp' ) );
        
    }, [ dispatch ]);

    return (
        <Fade in={ true }>
            <div 
            className='flex flex-col items-center justify-center h-screen'>
                <img
                className='h-screen w-screen object-cover backgroundSignUp'
                alt=''
                src={BackGroundImage}/>
                { steps.firstStep && <FirstStep setSteps={ setSteps } setUserData={ setUserData } userData={ userData }/> }
                { steps.secondStep && <SecondStep setSteps={ setSteps } setUserData={ setUserData } userData={ userData }/> }
                { steps.thirdStep && <ThirdStep setSteps={ setSteps } setUserData={ setUserData } userData={ userData }/> }
            </div>
        </Fade>
    );
      
};

export default SignUp;
