
import * as React from 'react';
import { loadTheme } from 'office-ui-fabric-react';
import { withRouter } from 'react-router';
import './../../node_modules/office-ui-fabric-react/dist/css/fabric.min.css';
import './App.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';


const configValue = {
    showWelcome: true
}


loadTheme({
  palette: {
    themePrimary: '#4eadd9',
    themeLighterAlt: '#f4fafa',
    themeLighter: '#d4eaeb',
    themeLight: '#b2d8d9',
    themeTertiary: '#72b1b3',
    themeSecondary: '#438e8f',
    themeDarkAlt: '#2e7273',
    themeDark: '#276061',
    themeDarker: '#1d4747',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#bab8b7',
    neutralSecondary: '#a3a2a0',
    neutralPrimaryAlt: '#8d8b8a',
    neutralPrimary: '#323130',
    neutralDark: '#605e5d',
    black: '#494847',
    white: '#ffffff',
  }
});


export const ConfigContext = React.createContext(null);

class App extends React.Component<any, any> {


  render(): JSX.Element {
    return (
    <ConfigContext.Provider value={configValue}>
      <Header />
      <Footer />
    </ConfigContext.Provider>
    );
  }

}


export default withRouter(App);

