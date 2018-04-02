import React, { Component } from 'react';

import AddIngredients from './AddIngredients/AddIngredients';
import {errorNotification} from '../constants'

const hardcodedIngredientsList = [{name: "Egg"}, {name: "Milk"}, {name: "Orange"}, {name: "Apple"}]

class AddIngredientsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
		this._onSelectIngredient = this._onSelectIngredient.bind(this);
	}

	render() {
		return (
			<div>
				<AddIngredients onSelectIngredient={this._onSelectIngredient} ingredientsList = {hardcodedIngredientsList}/>
			</div>
		);
	}


	//TODO - also check for case insensitive
	_onSelectIngredient(ingredient, index) {
		let isTypedIngredientAvailable = hardcodedIngredientsList.filter((ingredientInList) => ingredientInList.name == ingredient).length > 0 ? true : false
		if(index === -1 && isTypedIngredientAvailable) {
			let ingredientObject = {name: ingredient}
			this.props.onSelectIngredientTrigger(ingredientObject);
		}else if(index !== -1){
			this.props.onSelectIngredientTrigger(ingredient);
		} else {
			errorNotification("Ingredient is not available");
		}
	}
}

export default AddIngredientsContainer;