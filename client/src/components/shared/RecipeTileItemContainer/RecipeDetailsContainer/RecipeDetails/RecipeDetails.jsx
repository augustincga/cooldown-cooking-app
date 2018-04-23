import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import './RecipeDetails.css'
import {cookies} from '../../../constants'
import {errorNotification} from '../../../constants'
import {successNotification} from '../../../constants'

class RecipeDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipeDetailsData: this.props.recipeDetailsData
		}
		this._getReviewDetails = this._getReviewDetails.bind(this),
		this._onAddReview = this._onAddReview.bind(this)
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
					<h1>{this.state.recipeDetailsData.title}</h1>
				</div>
				<div className="recipe-details__header-wrapper">
					<div className="recipe-picture">
						<img src={this.state.recipeDetailsData.smallImage}/>
					</div>
					<div className="recipe-data">
						<div className="recipe-information-wrapper">
							<div className="recipe-cooking-time">
								<i className=""> {this.state.recipeDetailsData.cookingTime}</i>
							</div>
							<div className="recipe-servings">
								<i className=""> {this.state.recipeDetailsData.servings}</i>
							</div>
						</div>
						<div className="recipe-nutrients-wrapper">
							<div className="recipe-calories">
								<i className=""> Calories: {this.state.recipeDetailsData.nutrients.calories}</i>
							</div>
							<div className="recipe-carbs">
								<i className=""> Carbs: {this.state.recipeDetailsData.nutrients.carbohydrates}</i>
							</div>
							<div className="recipe-protein">
								<i className=""> Protein: {this.state.recipeDetailsData.nutrients.protein}</i>
							</div>
							<div className="recipe-fat">
								<i className=""> Fat: {this.state.recipeDetailsData.nutrients.fat}</i>
							</div>
						</div>
					</div>
				</div>
				<Divider/>
				<div className="recipe-details__section-wrapper">
					<div className="recipe-details__section-title">
						<h1>Ingredients</h1>
					</div>
					{this.state.recipeDetailsData.ingredients.map((ingredient, index) => {
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
					{this.state.recipeDetailsData.cookingSteps.map((step, index) => {
						return (
							<div className="recipe-details__section-item" key={step}>
								<i className="fa fa-caret-right"> 
									<span className="step-description">{step}</span>
								</i>
							</div>
						)
					})}
				</div>
				<Divider/>
				<div className="recipe-details__section-wrapper">
					<div className="recipe-details__section-title">
						<div>
							<h1>Reviews</h1>
						</div>
					</div>
					{this.state.recipeDetailsData.receivedReviews.map((review, index) => {
						return (
							<div className="recipe-details__section-item" key={review.userName + index}>
								<div className="review-container">
									<Card>
										<CardHeader
											title={review.title}
											subtitle={"wrote by " + review.userName}
											actAsExpander={true}
											showExpandableButton={true}
										/>
										<CardText expandable={true}>
											{review.content}
    									</CardText>
									</Card>
								</div>
							</div>
						)
					})}
					<div className="recipe-details__add-review-wrapper">
						<div>
							<form className="recipe-details__add-review-form">
								<fieldset className="add-review-fieldset">
									<label className="add-review-label"> Review Title: </label>
									<input className="add-review-input" type="text"  ref={(reviewTitle) => { this.reviewTitle = reviewTitle }}/>
								</fieldset>

								<fieldset className="add-review-fieldset">
									<label className="add-review-label"> Review Description: </label>
									<textarea className="add-review-textarea" ref={(reviewDescription) => { this.reviewDescription = reviewDescription }}></textarea>
								</fieldset>

								<div className="add-review-btn-wrapper">
									<RaisedButton className="add-review-btn" label="Add your review" primary={true} onClick={this._onAddReview}/>
								</div>
							</form>
						</div>


					</div>
				</div>

			</Dialog>
		);
	}

	_getReviewDetails() {
		let user = cookies.get('user');

		let reviewDetails = {
			review: {
				title: this.reviewTitle.value,
				content: this.reviewDescription.value,
			},
			userName: user.fullName,
			userId: user._id,
			recipeId: this.state.recipeDetailsData._id
		}

		return reviewDetails;
	}

	_onAddReview() {
		let reviewData = this._getReviewDetails();

		fetch('http://localhost:3001/api/recipe/reviewRecipe', {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			method: 'post',
			body: JSON.stringify(reviewData)
		}).then(function(response){
			if(response.status === 200) {
				response.json().then((recipe) => {
					this.setState({
						recipeDetailsData: recipe
					});
					successNotification("Your review has been added.");
					this.reviewTitle.value = '';
					this.reviewDescription.value = '';
				})
			} else {
				response.json().then((error) => {
					errorNotification(error.message);
				})
			}
		}.bind(this))
	}
}

export default RecipeDetails;