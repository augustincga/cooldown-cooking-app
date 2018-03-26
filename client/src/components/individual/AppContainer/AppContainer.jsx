import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';

import HomeContainer from '../HomeContainer/HomeContainer'
import LoginContainer from '../LoginContainer/LoginContainer'
import NotFoundRoute from '../../shared/NotFoundRoute/NotFoundRoute'
import PrivateRoute from '../../shared/PrivateRoute/PrivateRoute'
import {cookies} from '../../shared/constants'

class AppContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authed: cookies.get('user') ? true : false
		}
		this._changeAuthState = this._changeAuthState.bind(this)
		this._createUserCookie = this._createUserCookie.bind(this)
		this._onUserLogin = this._onUserLogin.bind(this)
	}

	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route exact path='/login' render={(params) => <LoginContainer onUserLogin={this._onUserLogin} history={params.history} />} />
						<PrivateRoute exact path='/' component={HomeContainer} authed={this.state.authed} />
						<Route component={NotFoundRoute} />
					</Switch>
				</Router>
				<Alert stack={{limit: 3}} />
			</div>
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