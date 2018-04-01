import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';

import AppContainer from './components/individual/AppContainer/AppContainer'


ReactDOM.render(<MuiThemeProvider>
                    <AppContainer/>
                </MuiThemeProvider>, 
                document.getElementById('root'));
registerServiceWorker();
