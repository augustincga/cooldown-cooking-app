import React, {Component} from 'react';

import Login from './Login/Login'
import RegisterContainer from '../RegisterContainer/RegisterContainer';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegisterModalOpen: false
        };
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
                />
                <Login
                    onRegisterClick={this._onRegisterClick}
                    onLoginClick={this._onLoginClick}
                    ref={(childInstance) => { this.child = childInstance; }}
                />
            </div>
        );
    }

    componentDidMount() {
        console.log(this);
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
            return response.json();
            console.log(response)
        }).then(function (body) {
            console.log(body);
        });
    };

    _onRegisterClick() {
        this.setState({isRegisterModalOpen: true});
        console.log('asd');
    };

    _onRegisterModalClose = () => {
        this.setState({isRegisterModalOpen: false});
        console.log('Closed');
    };
}

export default LoginContainer;