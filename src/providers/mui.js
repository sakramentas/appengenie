import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  cyan900, cyan500, lightBlue900,
  pinkA200,
  grey100, grey400, grey500,
  white, darkBlack, fullBlack, deepOrange600,
} from 'material-ui/styles/colors';

export const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightBlue900,
    primary2Color: deepOrange600,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: cyan900,
    pickerHeaderColor: cyan500,
    shadowColor: fullBlack,
  },
  appBar: {
    height: 60,
  },
});


export { MuiThemeProvider };
