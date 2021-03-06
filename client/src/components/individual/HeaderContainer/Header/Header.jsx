import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar'; 

import AvatarMenuContainer from '../AvatarMenuContainer/AvatarMenuContainer'
import './Header.css'

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div className="header__wrapper">
				<AppBar
					iconElementLeft={<AvatarMenuContainer 
										onSearchRecipes= {this.props.onSearchRecipes}
										onRecipesCollection = {this.props.onRecipesCollection}
										onGoogleSearchRecipe = {this.props.onGoogleSearchRecipe}
										/>
									}
					className="header__app-bar"
				/>
				{/* <div className="header__search-recipe" onClick={this.props.onSearchRecipes}>
					Search recipes
				</div> */}
			</div>
		);
	}
}

export default Header;