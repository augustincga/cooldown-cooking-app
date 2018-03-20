import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
const FormGroup = require ('react-bootstrap').FormGroup;
const FieldGroup = require('react-bootstrap').FieldGroup;
// const FormControl = require('react-bootstrap').FormControl;


import('./Login.css');
const loginBackground = require('../../../../assets/imgs/login_background.jpg')

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
        <div className='login'>
            <section className='login__left'>
                    <div className='background-left'>
                        <p className='register-text'>Don`t have an account? Register Now!</p>
                    </div>
            </section>
            <section className='login__form'>
                <div className='form-title'>
                    <h1>Sign In</h1>
                </div>
                <form>
                    <fieldset className='form-fieldset'>
                        <Col lg={10}>
                            <label>Email: </label>
                            <FormControl/>
                        </Col>
                    </fieldset>
                    <fieldset className='form-fieldset'>
                        <Col lg={10}>
                            <label>Password: </label>
                            <FormControl type='Password'/>
                        </Col>
                    </fieldset>
                    <div className="form-button" >
                        <Button bsStyle="primary" bsSize="sm" block>Sign In</Button>
                    </div>
                    <div className="form-forgot-password-link" >
                        <a href="#">Forgot your password?</a>
                    </div>
                </form>
            </section>
        </div>
    
    );
  }
}

export default Login;