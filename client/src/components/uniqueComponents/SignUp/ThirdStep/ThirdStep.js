import React, { useRef, useState } from 'react'
import Input from '../../../reusableComponents/Input';
import { defaultTransiton } from '../../../../constants/styles';
import PropagateLoader from "react-spinners/PropagateLoader";
import { groupOfInputsThirdStepSignUp } from '../../../../constants/content';
import { useSignUp } from '../../../../hooks/useSignUp';

const ThirdStep = ( props ) => {

    const { userData } = props;

    const { isLoading, alertFetch, setData } = useSignUp();

    const [input, setInput] = useState( { businessName:'', username:'', password:'', repeatPassword:'' } );

    const businessName = useRef( null );
    const username = useRef( null );
    const password = useRef( null );
    const repeatPassword = useRef( null );

    const inputsSignUp = groupOfInputsThirdStepSignUp( input, businessName, username, password, repeatPassword );

    return (
        <div 
        style={{ overflow:'hidden' }}
        className='text-center flex flex-col items-center justify-center w-3/4 bg-white rounded p-5 space-y-10 absolute'>
            <form
            onSubmit={ (e) => {

                e.preventDefault();

                setData( { ...input, ...userData } );

            } }
            className='space-y-5 w-full flex flex-col'
            onChange={ (e) => setInput({ ...input, [ e.target.name ]:e.target.value }) }
            >
                { inputsSignUp.map( ( input, index ) => (

                    <Input
                    isThirdStep={ true }
                    indexInput={ index }
                    alert={ alertFetch }
                    conditions={ input.conditions }
                    key={ index }
                    maxLength={ input.maxLength }
                    StartIcon={ input.startIcon }
                    isPassword={ input.isPassword }
                    refInput={ input.refInput }
                    type={ input.type }
                    required={ true }
                    label={ input.label }
                    value={ input.value }
                    name={ input.name }
                    color='#000000'
                    isFullWidth={ true }
                    variant='outlined' 
                    />

                ) ) }
                { alertFetch.type === 'general' &&  
                <p className='font-semibold text-red-500'> 
                    { alert.alertFetch } 
                </p> }
                { isLoading ?
                <div className='py-5'>
                    <PropagateLoader/> 
                </div> 
                : 
                <button 
                style={ defaultTransiton }
                type='submit'
                className='text-gray-500 bg-transparent border border-solid border-gray-400 hover:bg-black hover:text-white active:bg-gray-600 font-bold uppercase px-8 py-2 rounded outline-none focus:outline-none w-full'>
                    CREATE
                </button> }
            </form>
        </div>
    );
};

export default ThirdStep;
