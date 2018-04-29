import React, { Component } from 'react';

import RecipesCollection from './RecipesCollection/RecipesCollection'
import {cookies, errorNotification} from '../../shared/constants'

class RecipesCollectionContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			savedForLaterRecipes: [],
			ratedRecipes: [],
			ratedRecipesKey: 'rated-recipes-list',
			reviewedRecipes: [],
			reviewedRecipesKey: 'reviewd-recipes-list'
		}
		this.user = cookies.get('user');
		this._getRatedRecipesByUser = this._getRatedRecipesByUser.bind(this);
		this._getReviewedRecipesByUser = this._getReviewedRecipesByUser.bind(this);
		this._getSavedForLaterRecipes = this._getSavedForLaterRecipes.bind(this);
		this._triggeredByBookmarkChange = this._triggeredByBookmarkChange.bind(this);
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
				ratedRecipesListKey = {this.state.ratedRecipesKey}
				reviewedRecipesList = {this.state.reviewedRecipes}
				reviewedRecipesListKey = {this.state.reviewedRecipesKey}
				triggeredByBookmarkChange = {this._triggeredByBookmarkChange}
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

	_triggeredByBookmarkChange(action, recipe) {
		let bookmarks = cookies.get('user').savedForLaterRecipes;

		let synchronizedBookmarksList = [];

		if(action === 'onRemoveAction') {
			bookmarks.forEach((bookmark) => {
				this.state.savedForLaterRecipes.forEach((recipe) => {
					if(bookmark.recipeId === recipe._id) {
						synchronizedBookmarksList.push(recipe);
					}
				})
			})
		} else if(action === 'onAddAction') {
			synchronizedBookmarksList = [...this.state.savedForLaterRecipes];
			synchronizedBookmarksList.push(recipe);
		}

		this.setState({
			savedForLaterRecipes: synchronizedBookmarksList,
			ratedRecipesKey: this.state.ratedRecipesKey + Math.random(),
			reviewedRecipesKey: this.state.reviewedRecipesKey + Math.random()
		})
	}
}

export default RecipesCollectionContainer;