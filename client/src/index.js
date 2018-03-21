import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

import AppContainer from './components/individual/AppContainer/AppContainer'
import LoginContainer from './components/individual/LoginContainer/LoginContainer';
import NotFoundRoute from './components/shared/NotFoundRoute/NotFoundRoute'


ReactDOM.render(<MuiThemeProvider>
                    <Router>
                        <Switch>
                            <Route exact path='/' component={AppContainer} />
                            <Route exact path='/login' component={LoginContainer} />
                            {/* <PrivateRoute isLoggedIn={this.state.isLoggedIn} path='/home' component={HomeScene} appContext={this}></PrivateRoute> */}
                            <Route component={NotFoundRoute} />
                        </Switch>
                    </Router>
                </MuiThemeProvider>, 
                document.getElementById('root'));
registerServiceWorker();
