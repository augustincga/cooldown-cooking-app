import React, { Component } from 'react';

import RecipeTilesList from './RecipesTilesList/RecipesTilesList';

class RecipesTilesListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipesList: props.recipesList
		}
	}

	render() {
		return (
			<div>
				<RecipeTilesList recipesList={this.state.recipesList}/>
			</div>
		);
	}

	componentWillReceiveProps(newProps) {
		if (this.state.recipesList !== newProps.recipesList) {
			this.setState({recipesList: newProps.recipesList}, () => {
				console.log(this.state.recipesList);
			});
		}
	}
}

export default RecipesTilesListContainer;