import React, { Component } from 'react';

import SearchRecipes from './SearchRecipes/SearchRecipes'
import RecipesTilesListContainer from '../../shared/RecipesTilesListContainer/RecipesTilesListContainer'
import {errorNotification} from '../../shared/constants'

class SearchRecipesContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipesDataSet: []
		}
		this._getAllRecipes = this._getAllRecipes.bind(this);
	}

	componentWillMount() {
		this._getAllRecipes();
	}

	render() {
		return (
			<div>
				<SearchRecipes />
				<RecipesTilesListContainer recipesList = {this.state.recipesDataSet}/>
			</div>
		);
	}

	_getAllRecipes() {
        fetch('http://localhost:3001/api/recipe/getAllRecipes', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'get',
        }).then(function (response) {
            if(response.status === 200) {
				response.json().then((data) => {
					this.setState({recipesDataSet: data});
				})
			} else {
				response.json().then((data) => {
					errorNotification(data.message);
				});
            }
        }.bind(this));
    };
}

export default SearchRecipesContainer;