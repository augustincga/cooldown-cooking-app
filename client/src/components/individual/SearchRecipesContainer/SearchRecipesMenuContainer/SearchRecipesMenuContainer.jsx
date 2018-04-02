import React, { Component } from 'react';

import SearchRecipesMenu from './SearchRecipesMenu/SearchRecipesMenu'
import {errorNotification} from '../../../shared/constants'

class SearchRecipesMenuContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIngredients: [],
			selectedFilters: []
		}
		this._onSelectIngredientTrigger = this._onSelectIngredientTrigger.bind(this)
		this._onDeleteIngredient = this._onDeleteIngredient.bind(this)
	}

	render() {
		return (
			<div>
				<SearchRecipesMenu 
				onSelectIngredientTrigger = {this._onSelectIngredientTrigger} 
				selectedIngredients = {this.state.selectedIngredients}
				onDeleteIngredient = {this._onDeleteIngredient}
			/>
			</div>
		);
	}

	_onSelectIngredientTrigger(ingredient) {
		this.setState({selectedIngredients: [...this.state.selectedIngredients, ingredient]});
	}

	_onDeleteIngredient(event, ingredientIndexInDropdown) {
		if(ingredientIndexInDropdown === 0) {
			return;
		}

		let ingredientIndexInList = ingredientIndexInDropdown - 1;
		let selectedIngredientsCopy = this.state.selectedIngredients.slice();
		selectedIngredientsCopy.splice(ingredientIndexInList, 1);
		
		this.setState({selectedIngredients: selectedIngredientsCopy}, function(){
			errorNotification('Ingredient was deleted')
		});
	}
	
}

export default SearchRecipesMenuContainer;