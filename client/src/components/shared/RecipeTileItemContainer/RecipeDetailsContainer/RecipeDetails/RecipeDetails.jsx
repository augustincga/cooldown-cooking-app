import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ReactStars from 'react-stars';

import './RecipeDetails.css'

class RecipeDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
		this._getFormattedAverageRating = this._getFormattedAverageRating.bind(this)
	}

	render() {
		return (
			<Dialog
				modal={false}
				open={this.props.isRecipeDetailsModalOpen}
				onRequestClose={this.props.onRecipeDetailsModalClose}
				contentClassName='recipe-details__modal-wrapper'
			>

				<div className="recipe-details__rating-wrapper">
					<div className="rating-stars">
						<ReactStars
							count={5}
							onChange={this.props.onAddRating}
							size={24}
							value={this.props.addedUserRating}
							color2={'rgb(0, 188, 212)'} 
							half={false}
						/>
					</div>
				</div>
				<div className="recipe-details__header-buttons">
					<div className="header-buttons__export-pdf">
						<IconButton iconClassName="fa fa-save" onClick={this.props.onExportRecipeAsPdf}/>
					</div>
				</div>				
				<div className="recipe-details__content" id="sectionToPrint">
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
								<div className="recipe-stars-number">
									<ReactStars
										count={5}
										size={16}
										value={this._getFormattedAverageRating()}
										edit={false}
										color1={'#CFCFCF'}
										color2={'black'}
									/>
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
					<div className="recipe-details__section-wrapper ">
						<div className="recipe-details__section-title">
							<h1>Ingredients</h1>
						</div>
						{this.props.recipeDetailsData.ingredients.map((ingredient, index) => {
							return (
								<div className="recipe-details__section-item" key={ingredient.name + index}>
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
				</div>
				<Divider/>
				<div className="recipe-details__section-wrapper">
					<div className="recipe-details__section-title">
						<div>
							<h1>Reviews</h1>
						</div>
					</div>
					{this.props.recipeDetailsData.receivedReviews.map((review, index) => {
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
									<RaisedButton className="add-review-btn" label="Add your review" primary={true} onClick={this.props.onAddReview}/>
								</div>
							</form>
						</div>


					</div>
				</div>

			</Dialog>
		);
	}
	
	componentWillReceiveProps(newProps) {
		this.forceUpdate();
	}

	_getFormattedAverageRating(){
		let ratingsSum = 0;
		
		this.props.recipeDetailsData.receivedRatings.forEach((rating) => {
			ratingsSum += rating.score;
		})

		let averageRating = 0;
		let totalRatingsNumber = this.props.recipeDetailsData.receivedRatings.length;

		averageRating = parseFloat(ratingsSum) / totalRatingsNumber;

		return averageRating;
	}
}

export default RecipeDetails;