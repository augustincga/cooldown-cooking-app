import React, { Component } from 'react';

import SearchRecipesMenu from './SearchRecipesMenu/SearchRecipesMenu'
import {errorNotification} from '../../../shared/constants'

class SearchRecipesMenuContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filtersList: [],
			selectedFilters: [],
			checkedFilters: {},
			selectedIngredients: [],
		}
		this._onSelectIngredientTrigger = this._onSelectIngredientTrigger.bind(this)
		this._onDeleteIngredient = this._onDeleteIngredient.bind(this)
		this._onDeleteFilter = this._onDeleteFilter.bind(this)
		this._getFilters = this._getFilters.bind(this)
		this._onCheckFilter = this._onCheckFilter.bind(this)
		this._onRecipesSearch = this._onRecipesSearch.bind(this)
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
				selectedFilters = {this.state.selectedFilters}
				checkedFilters = {this.state.checkedFilters}
				onDeleteIngredient = {this._onDeleteIngredient}
				onDeleteFilter = {this._onDeleteFilter}
				filtersList = {this.state.filtersList}
				onCheckFilter = {this._onCheckFilter}
				onRecipesSearch = {this._onRecipesSearch}
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

	_onDeleteFilter(event, filterIndexInDropdown) {
		if(filterIndexInDropdown === 0) {
			return;
		}

		let filterIndexInList = filterIndexInDropdown - 1;
		let selectedFiltersCopy = this.state.selectedFilters.slice();
		let filterName = selectedFiltersCopy[filterIndexInList];
		selectedFiltersCopy.splice(filterIndexInList, 1);
		
		this.setState({
			selectedFilters: selectedFiltersCopy,
			checkedFilters : {...this.state.checkedFilters, [filterName]: false}
		}, function(){
			errorNotification('Filter was deleted');

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
					let checkedFiltersMap = {}
					filters.forEach(function(filter){
						checkedFiltersMap[filter] = false;
					}) 
					this.setState({filtersList: filters, checkedFilters: checkedFiltersMap});
				})
			} else {
				response.json().then((error) => {
					errorNotification(error.message);
				})
			}
		}.bind(this))
	}

	_onCheckFilter(event, isChecked, label) {
		if(isChecked) {
			this.setState({
				selectedFilters: [...this.state.selectedFilters, label],
				checkedFilters : {...this.state.checkedFilters, [label]: isChecked}
			});
		} else {
			let selectedFiltersCopy = this.state.selectedFilters.filter((filterItem) => filterItem !== label);
			this.setState({
				selectedFilters: selectedFiltersCopy,
				checkedFilters : {...this.state.checkedFilters, [label]: ![label]}
			});
		}
	}

	_onRecipesSearch() {
		let selectedIngredientsFormatted = this.state.selectedIngredients.map((ingredient) => ingredient.name);
		
		let dataRequest = {
			filters: this.state.selectedFilters,
			ingredients: selectedIngredientsFormatted
		}

		fetch('http://localhost:3001/api/recipe/getRecipesByFilters', {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			method: 'post',
			body: JSON.stringify(dataRequest)
		}).then(function(response){
			if(response.status === 200) {
				response.json().then((recipes) => {
					console.log(recipes);
					this.props.onFetchRecipesByFilters(recipes);
				})
			} else {
				response.json().then((error) => {
					errorNotification(error.message);
				})
			}
		}.bind(this))
	}
}

export default SearchRecipesMenuContainer;