import React, { Component } from 'react';

import Home from './Home/Home'
import HeaderContainer from '../HeaderContainer/HeaderContainer'
import SidebarContainer from '../SidebarContainer/SidebarContainer'
import SearchRecipesContainer from '../SearchRecipesContainer/SearchRecipesContainer'
import { cookies } from '../../shared/constants'

class HomeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: cookies.get('user'),
			isSidebarOpen: false,
			isSearchRecipesMount: false
		}
		this._onSearchRecipes = this._onSearchRecipes.bind(this);
	}

	render() {
		return (
			<div>
				<HeaderContainer onSearchRecipes = {this._onSearchRecipes}/>
				<SidebarContainer isSidebarOpen = {this.state.isSidebarOpen}/>
				{this.state.isSearchRecipesMount ? <SearchRecipesContainer /> : null}
			</div>
		);
	}

	_onSearchRecipes () {
		this.setState({ isSidebarOpen: !this.state.isSidebarOpen, 
						isSearchRecipesMount: !this.state.isSearchRecipesMount })
	}
}

export default HomeContainer;