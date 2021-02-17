import React, { useEffect, useState } from 'react'
import Input from '../../../reusableComponents/Input';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import { defaultTransiton } from '../../../../constants/styles';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useMediaQuery } from 'react-responsive';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import { useValidOTP } from '../../../../hooks/useValidOTP';

const SecondStep = ( props ) => {

    const { userData, setUserData, setSteps } = props;

    const { alertFetch, validOTP, isLoading, isSuccess, initialColorInput, inputEmailRef } = useValidOTP();

    const [input, setInput] = useState( { code:'' } );

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const inputProps = {

        alert,
        maxLength: 4,
        StartIcon: VpnKeyRoundedIcon,
        refInput: inputEmailRef,
        type:'text',
        required: true,
        label:'Code',
        value: input.code,
        name:'code',
        color: initialColorInput,
        isFullWidth: true,
        variant:'outlined'

    };

    useEffect(() => {

        if ( isSuccess.fetched && isSuccess.success ) {

            setUserData( credentials => ({ ...credentials, otp:input.code }) )
            setSteps( { firstStep:false, secondeStep:false, thirdStep:true } );

        };
        
    }, [ input, isSuccess, setUserData, setSteps ]);
    

    return (
        <div 
        style={{ overflow:'hidden' }}
        className='text-center flex flex-col items-center justify-center w-3/4 bg-white rounded p-5 space-y-10 absolute'>
            <p className={ `font-semibold text-center ${ mobileResolution ? 'text-sm' : 'text-lg' }` }> 
                We send an email to <span className='text-green-500'> { userData.email } </span> 
                with a code of 4 digits for confirm your account
            </p>
            <form 
            onChange={ (e) => setInput({ code:e.target.value }) }
            onSubmit={ (e) => validOTP( { ...input, ...userData }, e ) }
            className='space-y-4 w-full flex flex-col'>
                <Input { ...inputProps }/>
                { alertFetch.type && 
                <div className='flex flex-row text-left space-x-2 items-center'>
                    <ErrorRoundedIcon className='text-red-500'/>
                    <h1 className='text-red-500 font-semibold text-sm'> 
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
                    VERIFY
                </button> }
            </form>
        </div>
    );
};

export default SecondStep;
