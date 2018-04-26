import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

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
			<IconMenu
				iconButtonElement={<IconButton><Avatar className="header__avatar-wrapper">
					{this.state.avatarLetter}
				</Avatar></IconButton>}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				targetOrigin={{ vertical: 'top', horizontal: 'left' }}
			>
				<MenuItem primaryText="SearchRecipes" onClick={this.props.onSearchRecipes}/>
				<MenuItem primaryText="Sign out" onClick={this.props.onSignOut}/>
			</IconMenu>	
		);
	}
}

export default AvatarMenu;