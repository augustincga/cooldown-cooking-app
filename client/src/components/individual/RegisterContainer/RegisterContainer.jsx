import React, { Component } from "react"

import Register from './Register/Register'

class RegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegisterModalOpen: false
        }
      }

    render() {
        return (<Register 
            isRegisterModalOpen = {this.state.isRegisterModalOpen}
            onRegisterModalClose = {this.props.onRegisterModalClose}
            />)
    }

    componentWillReceiveProps(newProps) {
        this.setState({isRegisterModalOpen: newProps.isRegisterModalOpen});
    }    
}

export default RegisterContainer;