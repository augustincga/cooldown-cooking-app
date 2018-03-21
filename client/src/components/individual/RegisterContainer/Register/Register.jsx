import React, { Component } from "react"
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton';

import './Register'

class Register extends Component {
    constructor(props){
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
            // <RaisedButton
            //     label="Submit"
            //     primary={true}
            //     keyboardFocused={true}
            //     onClick={this.handleClose}
            // />,
        ];

        return (
            <div>
                <Dialog
                    title="Registration Form"
                    actions={actions}
                    modal={false}
                    open={this.props.isRegisterModalOpen}
                    onRequestClose={this.props.onRegisterModalClose}
                >
            </Dialog>
            </div>
        );
    }
}

export default Register;