import React, { Component } from 'react';

import SearchRecipesMenu from './SearchRecipesMenu/SearchRecipesMenu'
import {errorNotification} from '../../../shared/constants'

class SearchRecipesMenuContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filtersList: [],
			selectedIngredients: [],
			selectedFilters: []
		}
		this._onSelectIngredientTrigger = this._onSelectIngredientTrigger.bind(this)
		this._onDeleteIngredient = this._onDeleteIngredient.bind(this)
		this._getFilters = this._getFilters.bind(this)
		this._onCheckFilter = this._onCheckFilter.bind(this)
	}

	componentWillMount() {
		this._getFilters();
	}

	render() {
		return (
			<div>
				<SearchRecipesMenu 
				onSelectIngredientTrigger = {this._onSelectIngredientTrigger} 
				selectedIngredients = {this.state.selectedIngredients}
				onDeleteIngredient = {this._onDeleteIngredient}
				filtersList = {this.state.filtersList}
				onCheckFilter = {this._onCheckFilter}
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

	_getFilters() {
		fetch('http://localhost:3001/api/recipe/getFiltersFromRecipes', {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'get',
		}).then(function(response){
			if(response.status === 200) {
				response.json().then((filters) => {
					this.setState({filtersList: filters});
				})
			} else {
				response.json().then((error) => {
					errorNotification(error.message);
				})
			}
		}.bind(this))
	}

	_onCheckFilter(x,y,z) {
		console.log(x, y, z);
	}
	
}

export default SearchRecipesMenuContainer;