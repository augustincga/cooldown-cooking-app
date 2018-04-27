import React, { Component } from 'react';

import HeaderContainer from '../HeaderContainer/HeaderContainer'
import SearchRecipesContainer from '../SearchRecipesContainer/SearchRecipesContainer'
import RecipesCollectionContainer from '../RecipesCollectionContainer/RecipesCollectionContainer'
import { cookies } from '../../shared/constants'

class HomeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: cookies.get('user'),
			isSearchRecipesMount: false,
			isRecipesCollectionMount: false
		}
		this._onSearchRecipes = this._onSearchRecipes.bind(this);
		this._onRecipesCollection = this._onRecipesCollection.bind(this);
	}

	render() {
		return (
			<div>
				<HeaderContainer 
					onSearchRecipes = {this._onSearchRecipes}
					onRecipesCollection = {this._onRecipesCollection}
				/>
				{this.state.isSearchRecipesMount ? <SearchRecipesContainer /> : null}
				{this.state.isRecipesCollectionMount ? <RecipesCollectionContainer/> : null}
			</div>
		);
	}

	_onSearchRecipes () {
		this.setState({ 
			isSearchRecipesMount: !this.state.isSearchRecipesMount, 
			isRecipesCollectionMount: false
		})
	}

	_onRecipesCollection() {
		this.setState({
			isRecipesCollectionMount: !this.state.isRecipesCollectionMount,
			isSearchRecipesMount: false
		})
	}
}

export default HomeContainer;