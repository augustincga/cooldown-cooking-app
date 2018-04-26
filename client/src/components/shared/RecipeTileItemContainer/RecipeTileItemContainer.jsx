import React, { Component } from 'react';

import RecipeTileItem from './RecipeTileItem/RecipeTileItem';
import RecipeDetailsContainer from './RecipeDetailsContainer/RecipeDetailsContainer'
import {errorNotification} from '../constants'

class RecipeTileItemContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipeData: this.props.recipeData,
			isRecipeDetailsModalOpen: false,
			recipeDetailsData: null
		}
		this._onRecipeTileItemClick = this._onRecipeTileItemClick.bind(this);
		this._onRecipeDetailsModalClose = this._onRecipeDetailsModalClose.bind(this);
	}

	render() {
		return (
			<div className="recipe-tile__wrapper-container">
				<RecipeTileItem
					recipeData={this.state.recipeData}
					onRecipeTileItemClick={this._onRecipeTileItemClick}
				/>
				{this.state.isRecipeDetailsModalOpen ?
					<RecipeDetailsContainer
						isRecipeDetailsModalOpen={this.state.isRecipeDetailsModalOpen}
						recipeDetailsData={this.state.recipeDetailsData}
						onRecipeDetailsModalClose={this._onRecipeDetailsModalClose}
					/> :
					null}
			</div>
		);
	}

	_onRecipeTileItemClick() {

		let recipeId = this.state.recipeData._id;

		fetch(`http://localhost:3001/api/recipe/getRecipe/${recipeId}`, {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			method: 'get',
		}).then((response) => {
			if(response.status === 200) {
				response.json().then((recipe) => {
					if(this.props.isSimilarRecipe) {
						this.props.onSimilarRecipeClick(recipe[0]);
					} else {
						this.setState({
							recipeDetailsData: recipe[0],
							isRecipeDetailsModalOpen: !this.state.isRecipeDetailsModalOpen
						})
					}
				})
			} else {
				response.json().then((err) => {
					errorNotification(err);
				})
			}
		});
	}

	_onRecipeDetailsModalClose() {
		this.setState({
			isRecipeDetailsModalOpen: !this.state.isRecipeDetailsModalOpen
		});
	}
}

export default RecipeTileItemContainer;