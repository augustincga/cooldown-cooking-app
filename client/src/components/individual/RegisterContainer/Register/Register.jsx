import React, { Component } from "react"
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import './Register.css'

class Register extends Component {
    constructor(props) {
        super(props);
        this.open = false;
        this.state = {
            open: false
        };
    };

    render() {
        const actions = [
            <RaisedButton
                label="Cancel"
                onClick={this.props.onRegisterModalClose}
            />,
            <RaisedButton
                label="Register"
                primary={true}
                onClick={this.props.onRegisterModalRegister}
            />,
        ];

        return (
            <div className='register-wrapper'>
                <Dialog
                    title="Registration Form"
                    actions={actions}
                    modal={false}
                    open={this.props.isRegisterModalOpen}
                    onRequestClose={this.props.onRegisterModalClose}
                    autoScrollBodyContent={true}
                    actionsContainerClassName='register-wrapper__modal-footer'
                    contentClassName='register-wrapper__modal-content'
                    bodyClassName='register-wrapper__modal-body'
                    titleClassName='register-wrapper__modal-title'
                >
                    <TextField
                        hintText="First Name"
                        className='modal-text-field'
                        ref={(formFirstName) => { this.formFirstName = formFirstName }}
                    />
                    <TextField
                        hintText="Last Name"
                        className='modal-text-field'
                        ref={(formLastName) => { this.formLastName = formLastName }}
                    />
                    <TextField
                        hintText="E-mail Address"
                        className='modal-text-field'
                        ref={(formEmail) => { this.formEmail = formEmail }}
                    />
                    <TextField
                        hintText="Password"
                        type="password"
                        className='modal-text-field'
                        ref={(formPassword) => { this.formPassword = formPassword }}
                    />
                    <TextField
                        hintText="Repeat Password"
                        type="password"
                        className='modal-text-field'
                        ref={(formRepeatPassword) => { this.formRepeatPassword = formRepeatPassword }}
                    />
                    <DatePicker hintText="Birth Date"
                        openToYearSelection={true}
                        className='modal-date-picker-field'
                        onChange={(_, formBirthDate) => {this.formBirthDate = formBirthDate}}
                    />
                </Dialog>
            </div>
        );
    }
}

export default Register;