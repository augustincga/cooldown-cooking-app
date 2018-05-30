import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';


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

				<InfiniteScroll
					pageStart={0}
					loadMore={this.props.onScrollEnd}
					hasMore={this.props.hasMore}
				>
				{this.props.recipesList.map(recipe => (
					<RecipeTileItemContainer recipeData = {recipe} key = {recipe._id} selectedIngredients={this.props.selectedIngredients}/>
				))}
				</InfiniteScroll>
			</div>
		);
	}

	componentWillReceiveProps(newProps) {
		this.forceUpdate();
	}

}

export default RecipeTilesList;