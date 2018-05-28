import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import './RecipeSearchBar.css'
import {errorNotification} from '../constants'

class RecipeSearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
		this._searchRecipesByName = this._searchRecipesByName.bind(this);
	}

	render() {
		return (
			<div className="recipe-search-bar__wrapper">
				<div className="recipe-search-bar__text-field">
					<TextField
						hintText='Recipe Name'
						type="text"
						ref={(recipeName) => { this.recipeName = recipeName }}
					/>
				</div>
				<div className="recipe-search-bar__search-btn">
					<RaisedButton label="Search" primary={true} onClick={this._searchRecipesByName}/>
				</div>
			</div>
		);
	}

	_searchRecipesByName () {
		let data = {
			recipesName: this.recipeName.getValue()
		}

		fetch('http://localhost:3001/api/recipe/getRecipesByName', {
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			method: 'post',
			body: JSON.stringify(data)
		}).then(function(response){
			if(response.status === 200) {
				response.json().then((recipes) => {
					this.props.triggeredFromSearchBar(recipes);
				})
			} else {
				response.json().then((error) => {
					errorNotification(error.message);
				})
			}
		}.bind(this))
	}
}

export default RecipeSearchBar;