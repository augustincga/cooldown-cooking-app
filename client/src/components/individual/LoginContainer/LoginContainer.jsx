import React, {Component} from 'react';

import Login from './Login/Login'
import RegisterContainer from '../RegisterContainer/RegisterContainer';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegisterModalOpen: false
        };

        this._redirectToHomePage = this._redirectToHomePage.bind(this);
        this._onRegisterClick = this._onRegisterClick.bind(this);
        this._onRegisterModalClose = this._onRegisterModalClose.bind(this);
        this._onLoginClick = this._onLoginClick.bind(this);
    }

    render() {
        return (
            <div>
                <RegisterContainer
                    isRegisterModalOpen={this.state.isRegisterModalOpen}
					onRegisterModalClose={this._onRegisterModalClose}
					onRegisterSuccessfully={this._redirectToHomePage}
                />
                <Login
                    onRegisterClick={this._onRegisterClick}
                    onLoginClick={this._onLoginClick}
                    ref={(childInstance) => { this.child = childInstance; }}
                />
            </div>
        );
    }

    _onLoginClick() {
        let userCredentials = {
            email: this.child.email.getValue(),
            password: this.child.password.getValue()
        };

        fetch('http://localhost:3001/api/user/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(userCredentials)
        }).then(function (response) {
            if(response.status === 200) {
                this._redirectToHomePage();
            } else {
                //notification here that user couldn`t login using these credentials
            }
        }.bind(this));
    };

    _onRegisterClick() {
        this.setState({isRegisterModalOpen: true});
    };

    _onRegisterModalClose = () => {
        this.setState({isRegisterModalOpen: false});
    };

    _redirectToHomePage() {
		this.props.changeAuthState();
        this.props.history.push("/");
    }
}

export default LoginContainer;