import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'

import './RecipeDetails.css'

class RecipeDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<Dialog
				modal={false}
				open={this.props.isRecipeDetailsModalOpen}
				onRequestClose={this.props.onRecipeDetailsModalClose}
				contentClassName='recipe-details__modal-wrapper'
			>
				<div className="recipe-details__title">
					<h1>{this.props.recipeDetailsData.title}</h1>
				</div>
				<div className="recipe-details__header-wrapper">
					<div className="recipe-picture">
						<img src={this.props.recipeDetailsData.smallImage}/>
					</div>
					<div className="recipe-data">
						<div className="recipe-information-wrapper">
							<div className="recipe-cooking-time">
								<i className=""> {this.props.recipeDetailsData.cookingTime}</i>
							</div>
							<div className="recipe-servings">
								<i className=""> {this.props.recipeDetailsData.servings}</i>
							</div>
						</div>
						<div className="recipe-nutrients-wrapper">
							<div className="recipe-calories">
								<i className=""> Calories: {this.props.recipeDetailsData.nutrients.calories}</i>
							</div>
							<div className="recipe-carbs">
								<i className=""> Carbs: {this.props.recipeDetailsData.nutrients.carbohydrates}</i>
							</div>
							<div className="recipe-protein">
								<i className=""> Protein: {this.props.recipeDetailsData.nutrients.protein}</i>
							</div>
							<div className="recipe-fat">
								<i className=""> Fat: {this.props.recipeDetailsData.nutrients.fat}</i>
							</div>
						</div>
					</div>
				</div>
				<Divider/>
				<div className="recipe-details__section-wrapper">
					<div className="recipe-details__section-title">
						<h1>Ingredients</h1>
					</div>
					{this.props.recipeDetailsData.ingredients.map((ingredient, index) => {
						return (
							<div className="recipe-details__section-item" key={ingredient.name}>
								<i className="fa fa-caret-right"> 
									<span className="ingredient-item-amount">{ingredient.amount}</span>
									<span className="ingredient-item-unit">{ingredient.unit}</span>
									<span className="ingredient-item-name">{ingredient.name}</span>
								</i>
							</div>
						)
					})}
				</div>
				<Divider/>
				<div className="recipe-details__section-wrapper">
					<div className="recipe-details__section-title">
						<h1>Steps</h1>
					</div>
					{this.props.recipeDetailsData.cookingSteps.map((step, index) => {
						return (
							<div className="recipe-details__section-item" key={step}>
								<i className="fa fa-caret-right"> 
									<span className="step-description">{step}</span>
								</i>
							</div>
						)
					})}
				</div>

			</Dialog>
		);
	}
}

export default RecipeDetails;