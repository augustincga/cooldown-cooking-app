import React, { Component } from 'react';

import RecipeTileItem from './RecipeTileItem/RecipeTileItem';
import RecipeDetailsContainer from './RecipeDetailsContainer/RecipeDetailsContainer'
import {successNotification, errorNotification, cookies} from '../constants'

class RecipeTileItemContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipeData: this.props.recipeData,
			isRecipeDetailsModalOpen: false,
			recipeDetailsData: null,
			isRecipeBookmarked: false,
			availability: {
				available: null,
				missing: null
			}
		}
		this._onRecipeTileItemClick = this._onRecipeTileItemClick.bind(this);
		this._onRecipeDetailsModalClose = this._onRecipeDetailsModalClose.bind(this);
		this._onSaveForLaterClick = this._onSaveForLaterClick.bind(this);
		this._isRecipeBookmarked = this._isRecipeBookmarked.bind(this);
		this._onRemoveFromBookmarks = this._onRemoveFromBookmarks.bind(this);
		this._getIngredientsAvailability = this._getIngredientsAvailability.bind(this);
	}

	componentWillMount() {
		this.setState({
			isRecipeBookmarked: this._isRecipeBookmarked()
		})
		if(this.props.hasOwnProperty('selectedIngredients') && this.props.selectedIngredients.length > 0) {
			this._getIngredientsAvailability();
		}
	}

	render() {
		return (
			<div className="recipe-tile__wrapper-container">
				<RecipeTileItem
					recipeData={this.state.recipeData}
					onRecipeTileItemClick={this._onRecipeTileItemClick}
					onSaveForLaterClick = {this._onSaveForLaterClick}
					onRemoveFromBookmarks = {this._onRemoveFromBookmarks}
					isRecipeBookmarked = {this.state.isRecipeBookmarked}
					availability = {this.state.availability}
				/>
				{this.state.isRecipeDetailsModalOpen ?
					<RecipeDetailsContainer
						isRecipeDetailsModalOpen={this.state.isRecipeDetailsModalOpen}
						recipeDetailsData={this.state.recipeDetailsData}
						onRecipeDetailsModalClose={this._onRecipeDetailsModalClose}
						triggeredByRemoveFromAlreadyCooked = {this.props.triggeredByRemoveFromAlreadyCooked}						
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

	_onSaveForLaterClick(event) {
		event.preventDefault();
		event.stopPropagation();

		let data = {
			userId: cookies.get('user')._id,
			recipeId: this.state.recipeData._id
		}

		fetch('http://localhost:3001/api/user/saveRecipeForLater', {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			method: 'post',
			body: JSON.stringify(data)
		}).then((response) => {
			if(response.status === 200) {
				response.json().then((user) => {
					successNotification('The recipe has been bookmarked.');
					cookies.set('user', user);
					this.setState({isRecipeBookmarked: true});
					if(this.props.triggeredByBookmarkChange) {
						this.props.triggeredByBookmarkChange('onAddAction', this.state.recipeData);
					}
				})
			} else {
				response.json().then((err) => {
					errorNotification(err);
				})
			}
		});
	}

	_isRecipeBookmarked() {
		let bookmarksList = cookies.get('user').savedForLaterRecipes;
		let isBookmarked = false;

		bookmarksList.forEach((bookmark) => {
			if(bookmark.recipeId === this.state.recipeData._id) {
				isBookmarked = true;
			}
		});

		return isBookmarked;
	}

	_onRemoveFromBookmarks(event) {
		event.preventDefault();
		event.stopPropagation();

		let data = {
			userId: cookies.get('user')._id,
			recipeId: this.state.recipeData._id
		}

		fetch('http://localhost:3001/api/user/removeSavedForLaterRecipe', {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			method: 'post',
			body: JSON.stringify(data)
		}).then((response) => {
			if(response.status === 200) {
				response.json().then((user) => {
					successNotification('The recipe has been removed.');
					cookies.set('user', user);
					this.setState({isRecipeBookmarked: false});
					if(this.props.triggeredByBookmarkChange) {
						this.props.triggeredByBookmarkChange('onRemoveAction');
					}
				})
			} else {
				response.json().then((err) => {
					errorNotification(err);
				})
			}
		});
	}

	_getIngredientsAvailability() {
		let selectedIngredientsAsFilters = this.props.selectedIngredients;

		let recipeIngredients = [];

		this.state.recipeData.ingredients.map((ingredient) => {
			recipeIngredients.push(ingredient.name);
		})

		let identicalIngredients = selectedIngredientsAsFilters.filter((ingredient)  => recipeIngredients.indexOf(ingredient) !== -1 );
		
		if(identicalIngredients.length  === recipeIngredients.length) {
			this.setState({
				availability: {
					available: 'All',
					missing: 0
				}
			})
		} else {
			this.setState({
				availability: {
					available: identicalIngredients.length,
					missing: recipeIngredients.length - identicalIngredients.length
				}
			})
		}
	}

}

export default RecipeTileItemContainer;