import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	IndexRedirect
} from 'react-router-dom';

import App from './App/App'
import HomeContainer from '../HomeContainer/HomeContainer'
import LoginContainer from '../LoginContainer/LoginContainer'
import NotFoundRoute from '../../shared/NotFoundRoute/NotFoundRoute'
import PrivateRoute from '../../shared/PrivateRoute/PrivateRoute'
import {cookies} from '../../shared/constants'

class AppContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authed: false
		}
		this._changeAuthState = this._changeAuthState.bind(this)
		this._createUserCookie = this._createUserCookie.bind(this)
		this._onUserLogin = this._onUserLogin.bind(this)
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path='/login' render={(params) => <LoginContainer onUserLogin={this._onUserLogin} history={params.history} />} />
					<PrivateRoute exact path='/' component={HomeContainer} authed={this.state.authed} />
					<Route component={NotFoundRoute} />
				</Switch>
			</Router>
		);
	}

	_changeAuthState() {
		this.setState({ authed: !this.state.authed });
	}

	_createUserCookie(userData) {
		cookies.set('user', userData);
	}

	_onUserLogin(userData) {
		this._changeAuthState();
		this._createUserCookie(userData);
	}

}

export default AppContainer;