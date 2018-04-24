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
			recipeDetailsData: this.props.recipeDetailsData
		}
		this._getReviewDetails = this._getReviewDetails.bind(this);
		this._onAddReview = this._onAddReview.bind(this);
		this._onExportRecipeAsPdf = this._onExportRecipeAsPdf.bind(this);
	}

	render() {
		return (
			<RecipeDetails 
				isRecipeDetailsModalOpen = {this.props.isRecipeDetailsModalOpen}
				recipeDetailsData = {this.state.recipeDetailsData}
				onRecipeDetailsModalClose = {this.props.onRecipeDetailsModalClose}
				onAddReview = {this._onAddReview}
				onExportRecipeAsPdf = {this._onExportRecipeAsPdf}
				ref={(recipeDetailsChild) => this.recipeDetailsChild = recipeDetailsChild}
			/>
		);
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
}

export default RecipeDetailsContainer;