import React, { Component } from 'react';

import Login from './Login/Login'
import RegisterContainer from '../RegisterContainer/RegisterContainer';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegisterModalOpen: false
    }
    this._onRegisterClick = this._onRegisterClick.bind(this);
    this._onRegisterModalClose = this._onRegisterModalClose.bind(this);
  }

  render() {
    return (
        <div>
          <RegisterContainer 
          isRegisterModalOpen = {this.state.isRegisterModalOpen}
          onRegisterModalClose = {this._onRegisterModalClose}
          />
          <Login onRegisterClick = {this._onRegisterClick}/>
        </div>
    );  
  }

  componentDidMount() {
    console.log(this);
  }

  _onRegisterClick () {
    this.setState({isRegisterModalOpen: true});
    console.log('asd');
  };

  _onRegisterModalClose = () => {
    this.setState({ isRegisterModalOpen: false });
    console.log('Closed');
  };
}

export default LoginContainer;