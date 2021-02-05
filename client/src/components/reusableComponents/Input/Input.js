import React, { useEffect, useRef, useState } from 'react';
import { createMuiTheme, ThemeProvider, } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { IconButton, InputAdornment } from '@material-ui/core';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import { focusInputLastCharacter } from '../../../helpers/input';



const Input = ( props ) => {


    const { label, value, variant, isFullWidth, name, color, required, type, refInput, StartIcon, maxLength, isPassword, conditions, alert, indexInput } = props;

    const [theme, setTheme] = useState( { muitheme:createMuiTheme({
        palette: {
          primary: {

            light: color,
            main: color,
            dark: color,
            contrastText: color,

          },
          secondary: {
            light: color,
            main: color,
            contrastText: color
          },
        }
    })} ); 


    const iconRef = useRef( null );

    const [InitialPasswordIcon, setInitialPasswordIcon] = useState( { Icon:VisibilityRoundedIcon, type:'visibilityOn' } );

    const changeIconPasswordHandle = async () => {


        if ( InitialPasswordIcon.type === 'visibilityOff' ) {

            await setInitialPasswordIcon( { Icon:VisibilityRoundedIcon, type:'visibilityOn' } );

            focusInputLastCharacter( refInput );

            return false;

        };

        await setInitialPasswordIcon( { Icon:VisibilityOffRoundedIcon, type:'visibilityOff' } );

        focusInputLastCharacter( refInput );    
    

    };


    return (
        <ThemeProvider 
        key={ indexInput }
        theme={ theme.muitheme }>
            <div className='space-y-2'>
                <TextField 
                
                inputProps={{ maxLength, style:alert.type === name ? { color:'red' } : { color:'black' } }}
                InputProps={{
                    startAdornment:( 
                    <InputAdornment>
                        <StartIcon className={ `mr-1 ${ alert.type === name ? 'text-red-500' : 'text-gray-300' }` } 
                        ref={ iconRef }/>
                    </InputAdornment> ),
                    endAdornment:isPassword && (

                        <InputAdornment>
                            <IconButton
                            onClick={ (e) => {

                                e.preventDefault();

                                changeIconPasswordHandle();


                            } }
                            style={{ outline:'none', padding:'5px 0px' }}
                            >
                                <InitialPasswordIcon.Icon className='mr-1 text-gray-300'/>
                            </IconButton>
                        </InputAdornment>

                    )          
                }}
                onBlur={ () => {

                    if ( !iconRef.current ) return false;

                    iconRef.current.classList.add( 'text-gray-300' );
                    iconRef.current.classList.remove( 'text-gray-600' );

                } }
                onFocus={ () => {

                    if ( !iconRef.current ) return false;

                    iconRef.current.classList.remove( 'text-gray-300' );
                    iconRef.current.classList.add( 'text-gray-600' );

                } }
                inputRef={ refInput }
                name={ name }
                type={ type ? type === 'password' && InitialPasswordIcon.type === 'visibilityOn' ? 'password' : 'text' : type }
                required={ required }
                fullWidth={ isFullWidth }
                label={ label }
                value={ value }
                variant={ variant } />
                { conditions && 
                <div className='flex flex-row text-left items-center space-x-2'>
                    <InfoRoundedIcon
                    className={ `${ alert.type === name ? 'text-red-500' : 'text-blue-500' }` }
                    />
                    <p className={ `text-xs font-semibold ${ alert.type === name && 'text-red-500' }` }> 
                        { conditions }
                    </p>
                </div> }
            </div>
        </ThemeProvider>
    );
};

export default Input;
