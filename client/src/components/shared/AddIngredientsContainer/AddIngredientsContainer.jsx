import React, { Component } from 'react';

import AddIngredients from './AddIngredients/AddIngredients';
import {errorNotification, successNotification} from '../constants'

const hardcodedIngredientsList = [{name: "Egg"}, {name: "Milk"}, {name: "Orange"}, {name: "Apple"}]

class AddIngredientsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
		this._onSelectIngredient = this._onSelectIngredient.bind(this);
		this._onSelectValidIngredient = this._onSelectValidIngredient.bind(this);
	}

	render() {
		return (
			<div>
				<AddIngredients
					ref={(childInstance) => { this.addIngredientAutocompleteRef = childInstance; }} 
					onSelectIngredient={this._onSelectIngredient}
					ingredientsList={hardcodedIngredientsList} />
			</div>
		);
	}


	_onSelectIngredient(ingredient, index) {
		let ingredientIndex = null;
		let isTypedIngredientAvailable = false;

		hardcodedIngredientsList.forEach(function(ingredientInList, index){
			if(ingredientInList.name.toLowerCase() === ingredient.toLowerCase()) {
				ingredientIndex = index;
				isTypedIngredientAvailable = true;
				return;
			}
		})

		if(index === -1 && isTypedIngredientAvailable) {
			let ingredientObject = hardcodedIngredientsList[ingredientIndex];
			this._onSelectValidIngredient(ingredientObject);
		} else if(index !== -1){
			this._onSelectValidIngredient(ingredient);
		} else {
			errorNotification("Ingredient is not available");
		}
	}

	_onSelectValidIngredient(ingredient) {
		this.props.onSelectIngredientTrigger(ingredient);
		this.addIngredientAutocompleteRef.autocompleteInput.setState({searchText:''});
		this.addIngredientAutocompleteRef.autocompleteInput.focus();
		successNotification("Ingredient was added");
	}
}

export default AddIngredientsContainer;