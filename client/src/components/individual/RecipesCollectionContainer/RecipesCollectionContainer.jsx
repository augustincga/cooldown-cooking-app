import React, { Component } from 'react';

import RecipesCollection from './RecipesCollection/RecipesCollection'
import {cookies, errorNotification} from '../../shared/constants'

class RecipesCollectionContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			savedForLaterRecipes: [],
			ratedRecipes: [],
			reviewedRecipes: []
		}
		this.user = cookies.get('user');
		this._getRatedRecipesByUser = this._getRatedRecipesByUser.bind(this);
		this._getReviewedRecipesByUser = this._getReviewedRecipesByUser.bind(this);
		this._getSavedForLaterRecipes = this._getSavedForLaterRecipes.bind(this);
	}

	componentDidMount() {
		this._getSavedForLaterRecipes();
		this._getRatedRecipesByUser();
		this._getReviewedRecipesByUser();
	}

	render() {
		return (
			<RecipesCollection
				savedForLaterRecipes = {this.state.savedForLaterRecipes}
				ratedRecipesList = {this.state.ratedRecipes}
				reviewedRecipesList = {this.state.reviewedRecipes}
			/>
		);
	}

	_getSavedForLaterRecipes() {
		let userId = this.user._id;

		fetch(`http://localhost:3001/api/user/getSavedForLaterRecipes/${userId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'get',
        }).then(function (response) {
            if(response.status === 200) {
				response.json().then((data) => {
					this.setState({
						savedForLaterRecipes: data
					})
				})
			} else {
				response.json().then((data) => {
					errorNotification(data.message);
				});
			}
        }.bind(this))
	}

	_getRatedRecipesByUser() {
		let userId = this.user._id;

		fetch(`http://localhost:3001/api/recipe/getRatedRecipesByUser/${userId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'get',
        }).then(function (response) {
            if(response.status === 200) {
				response.json().then((data) => {
					this.setState({
						ratedRecipes: data
					})
				})
			} else {
				response.json().then((data) => {
					errorNotification(data.message);
				});
			}
        }.bind(this))
	}

	_getReviewedRecipesByUser() {
		let userId = this.user._id;

		fetch(`http://localhost:3001/api/recipe/getReviewedRecipesByUser/${userId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'get',
        }).then(function (response) {
            if(response.status === 200) {
				response.json().then((data) => {
					this.setState({
						reviewedRecipes: data
					})
				})
			} else {
				response.json().then((data) => {
					errorNotification(data.message);
				});
			}
        }.bind(this))
	}
}

export default RecipesCollectionContainer;