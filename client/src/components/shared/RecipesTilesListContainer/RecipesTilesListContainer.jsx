import React, { Component } from 'react';

import RecipeTilesList from './RecipesTilesList/RecipesTilesList';
import RecipeSorting from '../RecipeSorting/RecipeSorting'

const numberOfPassedRecipes = 9;

class RecipesTilesListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipesList: props.recipesList,
			passedRecipes: [],
			lastPassedRecipeIndex: 0,
			isDataLeftToRender: true,
		}
		this._onScrollEnd = this._onScrollEnd.bind(this);
		this._triggerSortedRecipes = this._triggerSortedRecipes.bind(this);
	}

	render() {
		return (
			<div>
				{this.state.recipesList.length > 0 ? 
				<RecipeSorting 
					recipesList = {this.state.recipesList}
					triggerSortedRecipes = {this._triggerSortedRecipes}
				/> : null}
				<RecipeTilesList 
					recipesList={this.state.passedRecipes}
					onScrollEnd={this._onScrollEnd}
					hasMore={this.state.isDataLeftToRender}
				/>
			</div>
		);
	}

	componentDidMount() {
		
	}

	_onScrollEnd() {
		let passedRecipes = this.state.recipesList.slice(this.state.lastPassedRecipeIndex, this.state.lastPassedRecipeIndex + numberOfPassedRecipes);
		let isDataLeftInArray = true;
		
		if(passedRecipes.length < numberOfPassedRecipes) {
			isDataLeftInArray = false;
		}

		this.setState({
			lastPassedRecipeIndex: this.state.lastPassedRecipeIndex + numberOfPassedRecipes,
			passedRecipes: this.state.passedRecipes.concat(passedRecipes),
			isDataLeftToRender: isDataLeftInArray
		})
	}

	_triggerSortedRecipes(recipesList) {
		this.setState({
			recipesList: recipesList,
			passedRecipes: [],
			lastPassedRecipeIndex: 0,
			isDataLeftToRender: true
		}, () => {
			this._onScrollEnd();
		});
	}

	componentWillReceiveProps(newProps) {
		if (this.state.recipesList !== newProps.recipesList) {
			this.setState({
				recipesList: newProps.recipesList,
				passedRecipes: [],
				lastPassedRecipeIndex: 0,
				isDataLeftToRender: true
			}, () => {
				this._onScrollEnd();
			});
		}
	}
}

export default RecipesTilesListContainer;