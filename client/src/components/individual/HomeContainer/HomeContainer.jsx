import React, { Component } from 'react';

import Home from './Home/Home'
import { cookies } from '../../shared/constants'

class HomeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: cookies.get('user')
		}
	}

	render() {
		return (
			<Home userData={this.state.userData} />
		);
	}
}

export default HomeContainer;