import React, { useEffect, useRef, useState } from 'react'
import ImageContainer from '../../../reusableComponents/ImageContainer';
import BCClogo from '../../../../images/bccLogo.png';
import Input from '../../../reusableComponents/Input';
import emailValidator from 'email-validator';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import { defaultTransiton } from '../../../../constants/styles';
import { Link, useHistory } from 'react-router-dom';
import PropagateLoader from "react-spinners/PropagateLoader";
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import { useMediaQuery } from 'react-responsive';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import { validateCode } from '../../../../helpers/validations';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import { createAccountAPI } from '../../../../api/userAPI';

const ThirdStep = ( props ) => {

    const history = useHistory();

    const { userData, setUserData, setSteps } = props;

    const [input, setInput] = useState( { businessName:'', username:'', password:'', repeatPassword:'' } );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const inputEmailRef = useRef( null );

    const [initialColorInput, setInitialColorInput] = useState( '#000000' );

    const [loading, setLoading] = useState( false );

    const businessName = useRef( null );
    const username = useRef( null );
    const password = useRef( null );
    const repeatPassword = useRef( null );

    const inputsArray = [ { maxLength:100, startIcon:BusinessRoundedIcon, refInput:businessName, type:'text', required:true, label:'Business Name', value:input.businessName, name:'businessName', color:initialColorInput, isFullWidth:true, variant:'outlined', conditions:'Only letters, numbers and spaces'  }, 
    { maxLength:100, startIcon:AccountCircleRoundedIcon, refInput:username, type:'text', required:true, label:'Username', value:input.username, name:'username', color:initialColorInput, isFullWidth:true, variant:'outlined', conditions:'Only letters, numbers . and _'}, 
    { maxLength:100, startIcon:LockRoundedIcon, refInput:password, type:'password', required:true, label:'Password', value:input.password, name:'password', color:'#FF0000', isFullWidth:true, variant:'outlined', isPassword:true, conditions:'Minimum 1 upper case, 1 lower, 1 digit, 1 special character and 8 length' }, 
    { maxLength:100, startIcon:LockRoundedIcon, refInput:repeatPassword, type:'password', required:true, label:'Repeat Password', value:input.repeatPassword, name:'repeatPassword', color:'#FF0000', isFullWidth:true, variant:'outlined', isPassword:true, conditions:'Passwords needs be equal' } ];

    return (
        <div 
        style={{ overflow:'hidden' }}
        className='text-center flex flex-col items-center justify-center w-3/4 bg-white rounded p-5 space-y-10 absolute'>
            <form
            onSubmit={ (e) => createAccountAPI( input, setLoading, setAlert, e, history, userData ) }
            className='space-y-5 w-full flex flex-col'
            onChange={ (e) => setInput({ ...input, [ e.target.name ]:e.target.value }) }
            >
                { inputsArray.map( ( input, index ) => (

                    <Input
                    indexInput={ index }
                    alert={ alert }
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
                    color={ initialColorInput }
                    isFullWidth={ true }
                    variant='outlined' 
                    />

                ) ) }
                { alert.type === 'general' &&  
                <p className='font-semibold text-red-500'> 
                    { alert.message } 
                </p> }
                { loading ?
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
