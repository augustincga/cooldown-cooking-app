import React, { Component } from 'react';

import RecipeDetails from './RecipeDetails/RecipeDetails'

class RecipeDetailsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<RecipeDetails 
				isRecipeDetailsModalOpen = {this.props.isRecipeDetailsModalOpen}
				recipeDetailsData = {this.props.recipeDetailsData}
				onRecipeDetailsModalClose = {this.props.onRecipeDetailsModalClose}
			/>
		);
	}
}

export default RecipeDetailsContainer;