import { createTheme } from '@mui/material/styles';
import { themeConfig } from './settings';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005066',
    },
    background: {
      default: themeConfig.color.content, 
    },
  },
  typography: {
    fontFamily: themeConfig.typography.headerFontFamily,
    h1: {
      fontFamily: themeConfig.typography.headerFontFamily,
      fontWeight: 700,
    },
    h2: {
      fontFamily: themeConfig.typography.headerFontFamily,
    },
    body1: {
      fontFamily: '"Arial", sans-serif', 
    },
  },
  spacing: themeConfig.padding, 
  breakpoints: {
    values: {
      xs: themeConfig.responsive.small,
      sm: themeConfig.responsive.medium,
      md: themeConfig.responsive.large,
      lg: 1920, 
    },
  },
});

export default theme;
