import { ThemeProvider as MuiThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ReactElement } from 'react';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fec762',
      contrastText: '#fff',
    },
    text: {
      primary: '#23252E',
      secondary: '#606477',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    fontSize: 14,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          lineHeight: '20px',
        },
        subtitle1: {
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '25px',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#23252E',
          fontWeight: 500,
          textDecorationColor: '#23252E',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          boxShadow: '0px 20px 40px rgba(254, 199, 98, 0.25)',
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          transform: 'scale(1)',
          fontSize: '14px',
          fontWeight: 500,
          color: '#606477',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderBottom: '1px solid rgba(154, 161, 184, 0.2)',
          },
        },
        input: {
          padding: '10px 0',
          '&::placeholder': {
            color: '#D7D9E2',
            opacity: 1,
          },
          '&[type="password"]': {
            fontFamily: 'monospace',
            fontWeight: 'bold',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        fullWidth: true,
      },
    },
  },
});

export type ThemeProviderPropsType = {
  children: ReactElement | [ReactElement]
};

export type ThemeProviderType = (props: ThemeProviderPropsType) => ReactElement;

const ThemeProvider: ThemeProviderType = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
  </StyledEngineProvider>
);

export default ThemeProvider;
