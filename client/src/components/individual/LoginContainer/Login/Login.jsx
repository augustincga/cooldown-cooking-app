import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import('./Login.css');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentWillMount() {

  }
  render() {
    return (
        <div className='login-wrapper'>
            <section className='login-wrapper__left-side'>
                    <div className='left-side-wrapper'>
                        <p className='left-side-register' onClick={this.props.onRegisterClick}>Don`t have an account? Register Now!</p>
                    </div>
            </section>
            <section className='login-wrapper__form'>
                <form>
                    <fieldset className='form-fieldset'>
                        <TextField hintText='E-mail'/>
                    </fieldset>
                    <fieldset className='form-fieldset'>
                        <TextField hintText='Password' type="password"/>
                    </fieldset>
                    <div className="form-login-btn" >
                        <RaisedButton label="Sign In" primary={true}/>
                    </div>
                    <div className="form-forgot-password" >
                        <a href="#">Forgot your password?</a>
                    </div>
                </form>
            </section>
        </div>
    
    );
  }
}

export default Login;