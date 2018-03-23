import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

import AppContainer from './components/individual/AppContainer/AppContainer'


ReactDOM.render(<MuiThemeProvider>
                    <AppContainer/>
                </MuiThemeProvider>, 
                document.getElementById('root'));
registerServiceWorker();
