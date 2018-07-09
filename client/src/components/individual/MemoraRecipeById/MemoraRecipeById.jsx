import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomeContainer from '../HomeContainer//HomeContainer'
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import RecipeDetails from '../../shared/RecipeTileItemContainer/RecipeDetailsContainer/RecipeDetails/RecipeDetails';
import {errorNotification} from '../../shared/constants'


class MemoraRecipeById extends Component {
	constructor(props) {
		super(props);
		this.state = {
			urlRecipeId: '',
			urlRecipeData: ''
		}
		this._fetchUrlRecipeIdData = this._fetchUrlRecipeIdData.bind(this);
	}

	componentWillMount() {
		this._fetchUrlRecipeIdData();
	}

	render() {
		return (
			<div>
				<HomeContainer authed={this.props.authed}  urlRecipeData={this.state.urlRecipeData}></HomeContainer>
			</div>
		);
	}

	_fetchUrlRecipeIdData() {
		let recipeId = this.props.match.params.recipeId;

		fetch(`http://localhost:3001/api/recipe/getRecipe/${recipeId}`, {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			method: 'get',
		}).then((response) => {
			if(response.status === 200) {
				response.json().then((recipe) => {
						this.setState({
							urlRecipeData: recipe[0],
						});
				})
			} else {
				response.json().then((err) => {
					errorNotification(err);
				})
			}
		});
	}
}

export default MemoraRecipeById;