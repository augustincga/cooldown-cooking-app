import React, { Component } from 'react';

import Header from './Header/Header'
import AvatarMenuContainer from './AvatarMenuContainer/AvatarMenuContainer'
import { cookies } from '../../shared/constants'

class HeaderContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div>
				<Header/>
			</div>
		);
	}
}

export default HeaderContainer;