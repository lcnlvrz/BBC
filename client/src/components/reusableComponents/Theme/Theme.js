import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const Theme = ( props ) => {

  const { color, children } = props;

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
        }
    });

    return (
        <ThemeProvider theme={ theme }>

          { children }

        </ThemeProvider>
    );
};

export default Theme;
