import React, { Component } from 'react';

import Home from './Home/Home'
import HeaderContainer from '../HeaderContainer/HeaderContainer'
import SearchRecipesContainer from '../SearchRecipesContainer/SearchRecipesContainer'
import { cookies } from '../../shared/constants'

class HomeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: cookies.get('user'),
			isSearchRecipesMount: false
		}
		this._onSearchRecipes = this._onSearchRecipes.bind(this);
	}

	render() {
		return (
			<div>
				<HeaderContainer onSearchRecipes = {this._onSearchRecipes}/>
				{this.state.isSearchRecipesMount ? <SearchRecipesContainer /> : null}
			</div>
		);
	}

	_onSearchRecipes () {
		this.setState({  isSearchRecipesMount: !this.state.isSearchRecipesMount })
	}
}

export default HomeContainer;