import React, { Component } from 'react';

import AvatarMenu from './AvatarMenu/AvatarMenu'
import { cookies } from '../../../shared/constants'

class AvatarMenuContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: cookies.get('user')
		}
	}

	render() {
		return (
			<AvatarMenu 
				avatarName = {this.state.userData.firstName}		
			/>
		);
	}
}

export default AvatarMenuContainer;