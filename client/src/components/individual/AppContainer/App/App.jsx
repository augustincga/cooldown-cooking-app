import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import LoginContainer from '../../LoginContainer/LoginContainer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
        <div className='app-container'>
        </div>  
    );
  }
}

export default App;