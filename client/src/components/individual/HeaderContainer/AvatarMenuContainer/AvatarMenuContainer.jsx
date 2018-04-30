import React, { Component } from 'react';

import AvatarMenu from './AvatarMenu/AvatarMenu'
import { cookies } from '../../../shared/constants'

class AvatarMenuContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: cookies.get('user')
		}
		this._onSignOut = this._onSignOut.bind(this);
	}

	render() {
		return (
			<AvatarMenu 
				avatarName = {this.state.userData.firstName}
				onSearchRecipes = {this.props.onSearchRecipes}
				onRecipesCollection = {this.props.onRecipesCollection}
				onGoogleSearchRecipe ={this.props.onGoogleSearchRecipe}
				onSignOut = {this._onSignOut}		
			/>
		);
	}

	_onSignOut() {
		cookies.remove('user');
		window.location.reload(); 
	}
}

export default AvatarMenuContainer;