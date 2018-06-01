import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import RecipeDetails from './RecipeDetails/RecipeDetails'
import {cookies} from '../../constants'
import {errorNotification} from '../../constants'
import {successNotification} from '../../constants'

class RecipeDetailsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipeDetailsData: this.props.recipeDetailsData,
			similarRecipes: [],
			isRecipeCooked: false,
			isRecipeDetailsModalOpen: this.props.isRecipeDetailsModalOpen,
			isEmailPopoverOpen: false,
			emailPopoverAnchor: null,
			addAsCookedPopoverAnchor: null,
			isAddAsCookedPopoverOpen: false
		}
		this._getReviewDetails = this._getReviewDetails.bind(this);
		this._onAddReview = this._onAddReview.bind(this);
		this._onExportRecipeAsPdf = this._onExportRecipeAsPdf.bind(this);
		this._onAddRating = this._onAddRating.bind(this);
		this._getAddedRatingByUser = this._getAddedRatingByUser.bind(this);
		this._getSimilarRecipes = this._getSimilarRecipes.bind(this);
		this._onSimilarRecipeClick = this._onSimilarRecipeClick.bind(this);
		this._onSendByEmail = this._onSendByEmail.bind(this);
		this._onEmailPopover = this._onEmailPopover.bind(this);
		this._onAddAsCookedPopover = this._onAddAsCookedPopover.bind(this);
		this._onAddRecipeAsCooked = this._onAddRecipeAsCooked.bind(this);
		this._isRecipeCooked = this._isRecipeCooked.bind(this);
	}

	render() {
		return (
			<RecipeDetails 
				isRecipeDetailsModalOpen = {this.state.isRecipeDetailsModalOpen}
				recipeDetailsData = {this.state.recipeDetailsData}
				similarRecipes = {this.state.similarRecipes}
				onSimilarRecipeClick = {this._onSimilarRecipeClick}
				onRecipeDetailsModalClose = {this.props.onRecipeDetailsModalClose}
				onAddReview = {this._onAddReview}
				onExportRecipeAsPdf = {this._onExportRecipeAsPdf}
				onAddRating = {this._onAddRating}
				addedUserRating = {this._getAddedRatingByUser()}
				isAddAsCookedPopoverOpen = {this.state.isAddAsCookedPopoverOpen}
				isRecipeCooked = {this.state.isRecipeCooked}
				onAddAsCookedPopover = {this._onAddAsCookedPopover}
				addAsCookedPopoverAnchor = {this.state.addAsCookedPopoverAnchor}
				onAddRecipeAsCooked = {this._onAddRecipeAsCooked}
				isEmailPopoverOpen = {this.state.isEmailPopoverOpen}
				onEmailPopover = {this._onEmailPopover}
				emailPopoverAnchor = {this.state.emailPopoverAnchor}
				onSendByEmail = {this._onSendByEmail}
				ref={(recipeDetailsChild) => this.recipeDetailsChild = recipeDetailsChild}
			/>
		);
	}

	componentWillMount() {
		this._getSimilarRecipes();
		this.setState({
			isRecipeCooked: this._isRecipeCooked()
		})
	}

	_getReviewDetails() {
		let user = cookies.get('user');

		let reviewDetails = {
			review: {
				title: this.recipeDetailsChild.reviewTitle.value,
				content: this.recipeDetailsChild.reviewDescription.value,
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
					this.recipeDetailsChild.reviewTitle.value = '';
					this.recipeDetailsChild.reviewDescription.value = '';
				})
			} else {
				response.json().then((error) => {
					errorNotification(error.message);
				})
			}
		}.bind(this))
	}

	_onExportRecipeAsPdf() {
		const sectionToPrint = document.getElementById('sectionToPrint');


		html2canvas(sectionToPrint)
			.then((canvas) => {
				const imgData = canvas.toDataURL('image/png');
				const pdf = new jsPDF();
				pdf.addImage(imgData, 'JPEG', 10, 10, 180, 150);
				pdf.save("recipe.pdf");
			});
	}

	_getAddedRatingByUser() {
		let user = cookies.get('user');
		let userRating = null;

		this.state.recipeDetailsData.receivedRatings.forEach((rating) => {
			if(user._id === rating.userId.toString()) {
				userRating = rating.score;
				return; 
			}
		});

		return userRating;
	}

	_onAddRating(rating) {
		let user = cookies.get('user');

		let ratingDetails = {
			ratingScore: rating,
			userName: user.fullName,
			recipeId: this.state.recipeDetailsData._id,
			userId: user._id
		}

		fetch('http://localhost:3001/api/recipe/rateRecipe', {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			method: 'post',
			body: JSON.stringify(ratingDetails)
		}).then(function(response){
			if(response.status === 200) {
				response.json().then((recipe) => {
					this.setState({
						recipeDetailsData: recipe
					});
					successNotification("Your rating has been added.");
				})
			} else {
				response.json().then((error) => {
					errorNotification(error.message);
				})
			}
		}.bind(this))
	}

	_getSimilarRecipes () {
		let ingredientsList = {
			ingredients: []
		};

		this.state.recipeDetailsData.ingredients.forEach((ingredient) => {
			ingredientsList.ingredients.push(ingredient.name);
		});

		fetch('http://localhost:3001/api/recipe/getSimilarRecipes', {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			method: 'post',
			body: JSON.stringify(ingredientsList)
		}).then(function(response){
			if(response.status === 200) {
				response.json().then((recipes) => {
					recipes.shift()
					this.setState({
						similarRecipes: recipes
					});
				})
			} else {
				response.json().then((error) => {
					errorNotification(error.message);
				})
			}
		}.bind(this))
	}

	_onSimilarRecipeClick(recipe) {
		this.setState({
			recipeDetailsData: recipe
		},() => this._getSimilarRecipes())
	}

	_onSendByEmail() {
		console.log(this.recipeDetailsChild.emailAddressInput.getValue());

		const sectionToPrint = document.getElementById('sectionToPrint');

		html2canvas(sectionToPrint)
			.then((canvas) => {
				console.log(canvas);
			});
	}

	_onEmailPopover(event) {
		this.setState({
			isEmailPopoverOpen: !this.state.isEmailPopoverOpen,
			emailPopoverAnchor: event.currentTarget,
		})
	}

	_onAddAsCookedPopover(event) {
		this.setState({
			isAddAsCookedPopoverOpen: !this.state.isAddAsCookedPopoverOpen,
			addAsCookedPopoverAnchor: event.currentTarget,
		})
	}

	_onAddRecipeAsCooked() {
		let data = {
			recipeId: this.state.recipeDetailsData._id,
			userId: cookies.get('user')._id,
			personalNotes: this.recipeDetailsChild.personalNotesInput.getValue()
		}
		
		fetch('http://localhost:3001/api/user/addRecipeAsCooked', {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			method: 'post',
			body: JSON.stringify(data)
		}).then(function(response){
			if(response.status === 200) {
				response.json().then((user) => {
					console.log(user);
					successNotification('Recipe was added as cooked.');
					cookies.set('user', user);
					this.setState({
						isAddAsCookedPopoverOpen: !this.state.isAddAsCookedPopoverOpen,
						isRecipeCooked: true,
					});
				})
			} else {
				response.json().then((error) => {
					errorNotification(error.message);
				})
			}
		}.bind(this))
	}

	
	_isRecipeCooked() {
		let cookedList = cookies.get('user').alreadyCookedRecipes;
		let isCooked = false;

		console.log(cookies.get('user'));

		cookedList.forEach((cooked) => {
			if(cooked.recipeId === this.state.recipeDetailsData._id) {
				isCooked = true;
			}
		});

		return isCooked;
	}

	
}

export default RecipeDetailsContainer;