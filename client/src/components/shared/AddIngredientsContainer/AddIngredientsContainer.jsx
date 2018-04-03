import React, { Component } from 'react';

import AddIngredients from './AddIngredients/AddIngredients';
import {errorNotification, successNotification} from '../constants'

class AddIngredientsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredientsList: [],
		}
		this._onSelectIngredient = this._onSelectIngredient.bind(this);
		this._onSelectValidIngredient = this._onSelectValidIngredient.bind(this);
		this._getIngredientsList = this._getIngredientsList.bind(this);
	}

	componentWillMount() {
		this._getIngredientsList();
	}

	render() {
		return (
			<div>
				<AddIngredients
					ref={(childInstance) => { this.addIngredientAutocompleteRef = childInstance; }} 
					onSelectIngredient={this._onSelectIngredient}
					ingredientsList={this.state.ingredientsList} />
			</div>
		);
	}


	_onSelectIngredient(ingredient, index) {
		let ingredientIndex = null;
		let isTypedIngredientAvailable = false;

		this.state.ingredientsList.forEach(function(ingredientInList, index){
			if(ingredientInList.name.toLowerCase() === ingredient.toLowerCase()) {
				ingredientIndex = index;
				isTypedIngredientAvailable = true;
				return;
			}
		})

		if(index === -1 && isTypedIngredientAvailable) {
			let ingredientObject = this.state.ingredientsList[ingredientIndex];
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

	_getIngredientsList() {
		fetch('http://localhost:3001/api/ingredient/getIngredients', {
			headers: {
				'Accept': 'application/json',
                'Content-Type': 'application/json'
			},
			method: 'get',
		}).then(function(response){
			if(response.status === 200) {
				response.json().then((ingredients) => {
					let formattedIngredientsList = ingredients.map((ingredient) => {
						let formattedIngredientItem = {};
						formattedIngredientItem.name = ingredient.name;
						return formattedIngredientItem
					});
					this.setState({ingredientsList: formattedIngredientsList});
				})
			} else {
				response.json().then((error) => {
					errorNotification(error.message);
				})
			}
		}.bind(this))
	};
}

export default AddIngredientsContainer;