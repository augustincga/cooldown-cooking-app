import React, { Component } from "react"

import Register from './Register/Register'

class RegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegisterModalOpen: false
        }
        this._onRegisterFormRegisterClick = this._onRegisterFormRegisterClick.bind(this);
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
            console.log('Passwords doesn`t match.')
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
                birthDate: new Date(this.child.formBirthDate).toDateString()
            }
            console.log(userInformation);
        } else {
            this._validateRegisterForm();
        }
    }

    _sendUserInformationToServer() {

    }
}

export default RegisterContainer;