import React, { Component } from 'react';

import Header from './Header/Header'

class HeaderContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div>
				<Header 
					onSearchRecipes = {this.props.onSearchRecipes}
					onRecipesCollection = {this.props.onRecipesCollection}
					onGoogleSearchRecipe = {this.props.onGoogleSearchRecipe}
				/>
			</div>
		);
	}
}

export default HeaderContainer;