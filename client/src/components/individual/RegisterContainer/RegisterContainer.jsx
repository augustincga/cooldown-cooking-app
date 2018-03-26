import React, { Component } from "react"

import Register from './Register/Register'
import {errorNotification} from '../../shared/constants'

class RegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegisterModalOpen: false
        };
        this._onRegisterFormRegisterClick = this._onRegisterFormRegisterClick.bind(this);
        this._sendUserInformationToServer = this._sendUserInformationToServer.bind(this);
      }

    render() {
        return (<Register 
            isRegisterModalOpen = {this.state.isRegisterModalOpen}
            onRegisterModalClose = {this.props.onRegisterModalClose}
            onRegisterModalRegister = {this._onRegisterFormRegisterClick}
            ref={(childInstance) => { this.child = childInstance; }} 
            />)
    }

    componentWillReceiveProps(newProps) {
        this.setState({isRegisterModalOpen: newProps.isRegisterModalOpen});
    } 
    
    _validateRegisterForm () { 
        if(this.child.formPassword.getValue() !== this.child.formRepeatPassword.getValue()) {
            errorNotification('Passwords does not match.')
            return false;
        }
        return true;
    }

    _onRegisterFormRegisterClick () {
        if(this._validateRegisterForm()) {
            let userInformation = {
                firstName: this.child.formFirstName.getValue(),
                lastName: this.child.formLastName.getValue(),
                email: this.child.formEmail.getValue(),
                password: this.child.formPassword.getValue(),
                birthDate: new Date(this.child.formBirthDate).toDateString(),
                role: 'user',
                fullName: `${this.child.formFirstName.getValue()} ${this.child.formLastName.getValue()}`
            };
            this._sendUserInformationToServer(userInformation);
        }
    }

    _sendUserInformationToServer(data) {
        fetch('http://localhost:3001/api/user/register', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(data)
        }).then(function (response) {
            if(response.status === 200) {
				response.json().then((data) => {
					this.props.onRegisterModalClose();
					this.props.onRegisterSuccessfully(data);
				})
			} else {
				response.json().then((data) => {
					errorNotification(data.message);
				});
			}
        }.bind(this))
    }
}

export default RegisterContainer;