import React, { useRef } from 'react';
import { createMuiTheme, ThemeProvider, } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const Input = ( props ) => {

    const { label, value, variant, isFullWidth, name, color, required, type, refInput, IconEndAdornment, maxLength } = props;

    const theme = createMuiTheme({
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
        },
    });

    const iconRef = useRef( null );

    return (
        <ThemeProvider theme={ theme }>
            <TextField 
            inputProps={{ maxLength }}
            InputProps={{
                startAdornment: (<IconEndAdornment className='mr-1 text-gray-300' ref={ iconRef }/>)
                
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
            type={ type }
            required={ required }
            fullWidth={ isFullWidth }
            label={ label }
            value={ value }
            variant={ variant } />
        </ThemeProvider>
    );
};

export default Input;
