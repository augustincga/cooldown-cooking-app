import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar'; 

import AvatarMenuContainer from '../AvatarMenuContainer/AvatarMenuContainer'

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<AppBar
				iconElementLeft={<AvatarMenuContainer/>}
			/>
		);
	}
}

export default Header;