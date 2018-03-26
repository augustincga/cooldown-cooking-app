import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';

import('./AvatarMenu.css');

class AvatarMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarLetter: props.avatarName.substr(0,3)
		}
	}

	render() {
		return (
			<Avatar size={38} className='header__avatar-wrapper'>
				{this.state.avatarLetter}
		  </Avatar>
		);
	}
}

export default AvatarMenu;