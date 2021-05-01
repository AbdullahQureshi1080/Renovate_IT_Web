import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#e8e8e8',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: "#495464",
    },
    text: {
      primary: '#1b262c',
      secondary: '#6b778c'
    }
  },
  shadows,
  typography
});

export default theme;
