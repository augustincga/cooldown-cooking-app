import React, { Component } from 'react';

import HeaderContainer from '../HeaderContainer/HeaderContainer'
import SearchRecipesContainer from '../SearchRecipesContainer/SearchRecipesContainer'
import RecipesCollectionContainer from '../RecipesCollectionContainer/RecipesCollectionContainer'
import GoogleSearchRecipeContainer from '../GoogleSearchRecipeContainer/GoogleSearchRecipeContainer'
import { cookies } from '../../shared/constants'

class HomeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: cookies.get('user'),
			isSearchRecipesMount: false,
			isRecipesCollectionMount: false,
			isGoogleSearchRecipeMount: false
		}
		this._onSearchRecipes = this._onSearchRecipes.bind(this);
		this._onRecipesCollection = this._onRecipesCollection.bind(this);
		this._onGoogleSearchRecipe = this._onGoogleSearchRecipe.bind(this);
	}

	render() {
		return (
			<div>
				<HeaderContainer 
					onSearchRecipes = {this._onSearchRecipes}
					onRecipesCollection = {this._onRecipesCollection}
					onGoogleSearchRecipe = {this._onGoogleSearchRecipe}
				/>
				{this.state.isSearchRecipesMount ? <SearchRecipesContainer /> : null}
				{this.state.isRecipesCollectionMount ? <RecipesCollectionContainer/> : null}
				{this.state.isGoogleSearchRecipeMount ? <GoogleSearchRecipeContainer/> : null}
			</div>
		);
	}

	_onSearchRecipes () {
		this.setState({ 
			isSearchRecipesMount:true, 
			isRecipesCollectionMount: false,
			isGoogleSearchRecipeMount: false
		})
	}

	_onRecipesCollection() {
		this.setState({
			isRecipesCollectionMount: true,
			isSearchRecipesMount: false,
			isGoogleSearchRecipeMount: false
		})
	}

	_onGoogleSearchRecipe() {
		this.setState({
			isGoogleSearchRecipeMount: true,
			isRecipesCollectionMount: false,
			isSearchRecipesMount: false
		})
	}
}

export default HomeContainer;