import { createTheme } from '@mui/material'

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#556cd6',
    },
  },
  typography: {
    h1: {
      fontSize: 40,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h4: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    h5: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    h6: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: 24,
    },
    subtitle2: {
      fontSize: 20,
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
    },
    button: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 12,
    },
  },
})

export default theme
