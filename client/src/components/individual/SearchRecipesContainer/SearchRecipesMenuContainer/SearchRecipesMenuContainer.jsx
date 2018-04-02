import React, { Component } from 'react';

import SearchRecipesMenu from './SearchRecipesMenu/SearchRecipesMenu'

class SearchRecipesMenuContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIngredients: [],
			selectedFilters: []
		}
		this._onSelectIngredientTrigger = this._onSelectIngredientTrigger.bind(this)
	}

	render() {
		return (
			<div>
				<SearchRecipesMenu 
				onSelectIngredientTrigger = {this._onSelectIngredientTrigger} 
				selectedIngredients = {this.state.selectedIngredients}
			/>
			</div>
		);
	}

	_onSelectIngredientTrigger(ingredient) {
		this.setState({selectedIngredients: [...this.state.selectedIngredients, ingredient]});
	}
	
}

export default SearchRecipesMenuContainer;