import React, { useEffect, useState } from 'react'
import './SignUp.css';
import BackGroundImage from '../../../images/background.jpg';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import { Fade } from '@material-ui/core';
import ThirdStep from './ThirdStep';
import LoadingAnimation from '../../reusableComponents/LoadingAnimation';
import { useFixViewPort } from '../../../hooks/useFixViewport';

const SignUp = ( ) => {

    useFixViewPort();

    const [steps, setSteps] = useState( { firstStep:true, secondStep:false, thirdStep:false } );

    const [userData, setUserData] = useState( { email:'', otp:0 } );

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
