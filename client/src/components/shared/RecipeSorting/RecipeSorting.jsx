import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';

import './RecipeSorting.css'

class RecipeSorting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sortOrder: 'desc'
		}
		this._sortRecipes = this._sortRecipes.bind(this);
	}

	render() {
		return (
			<div className="recipe-sorting__wrapper">
				<div className="recipe-sorting__sort-wrapper">
					<div className="recipe-sorting__sort-label">
						<p>Sort recipes</p>
					</div>
					<div className="recipe-sorting__sort-btn">
						<IconButton iconClassName="fa fa-sort" onClick={this._sortRecipes} />
					</div>
				</div>
			</div>
		);
	}

	_sortRecipes() {
		switch(this.state.sortOrder) {
			case 'asc':
				this.props.recipesList.sort(function (a, b) {
					var titleA = a["title"].toLowerCase(), titleB = b["title"].toLowerCase();
					return titleA.localeCompare(titleB);
				});				
				this.setState({
					sortOrder: 'desc'
				});
				this.props.triggerSortedRecipes(this.props.recipesList);
				break;
			case 'desc':
				this.props.recipesList.sort(function (a, b) {
					var titleA = a["title"].toLowerCase(), titleB = b["title"].toLowerCase();
					return titleB.localeCompare(titleA);
				});
				this.setState({
					sortOrder: 'asc'
				});
				this.props.triggerSortedRecipes(this.props.recipesList);
				break;
		}
	}

}

export default RecipeSorting;