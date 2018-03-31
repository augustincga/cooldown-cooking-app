import React, { Component } from 'react';

import './RecipesTilesList.css'
import RecipeTileItemContainer from '../../RecipeTileItemContainer/RecipeTileItemContainer';

class RecipeTilesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div className="recipe-tiles-list__wrapper">
				{this.props.recipesList.map(recipe => (
					<RecipeTileItemContainer recipeData = {recipe} key = {recipe._id}/>
				))}
			</div>
		);
	}

	componentWillReceiveProps(newProps) {
		this.forceUpdate();
	}

}

export default RecipeTilesList;