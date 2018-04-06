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
		// const loader = <div className="loader">Loading ...</div>;

		return (
			<div className="recipe-tiles-list__wrapper">
				{/* {this.props.recipesList.map(recipe => (
					<RecipeTileItemContainer recipeData = {recipe} key = {recipe._id}/>
				))} */}

				<InfiniteScroll
					pageStart={0}
					loadMore={this.props.onScrollEnd}
					hasMore={this.props.hasMore}
				>
				{this.props.recipesList.map(recipe => (
					<RecipeTileItemContainer recipeData = {recipe} key = {recipe._id}/>
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