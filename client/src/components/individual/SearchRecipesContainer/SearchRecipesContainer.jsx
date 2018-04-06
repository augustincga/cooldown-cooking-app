import React, { Component } from 'react';

import SearchRecipes from './SearchRecipes/SearchRecipes'
import RecipesTilesListContainer from '../../shared/RecipesTilesListContainer/RecipesTilesListContainer'
import SearchRecipesMenuController from './SearchRecipesMenuContainer/SearchRecipesMenuContainer'
import {errorNotification} from '../../shared/constants'

class SearchRecipesContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipesDataSet: []
		}
		this._onFetchRecipesByFilters = this._onFetchRecipesByFilters.bind(this);
	}

	componentWillMount() {
		
	}

	render() {
		return (
			<div>
				<SearchRecipesMenuController onFetchRecipesByFilters={this._onFetchRecipesByFilters}/>
				<RecipesTilesListContainer recipesList = {this.state.recipesDataSet}/>
			</div>
		);
	}
	
	_onFetchRecipesByFilters(recipes) {
		this.setState({recipesDataSet: recipes});
	}


}

export default SearchRecipesContainer;