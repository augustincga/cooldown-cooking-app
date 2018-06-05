import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';


import './RecipesTilesList.css'
import RecipeTileItemContainer from '../../RecipeTileItemContainer/RecipeTileItemContainer';
import LoadingIndicator from '../../../shared/LoadingIndicator/LoadingIndicator'

class RecipeTilesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {

		return (
			<div className="recipe-tiles-list__wrapper">

				<LoadingIndicator isActive = {this.props.isLoadingActive}/>
				
				<InfiniteScroll
					pageStart={0}
					loadMore={this.props.onScrollEnd}
					hasMore={this.props.hasMore}
				>
				{this.props.recipesList.map(recipe => (
					<RecipeTileItemContainer 
						recipeData = {recipe} 
						key = {recipe._id} 
						selectedIngredients={this.props.selectedIngredients}
						tileImageLoaded = {this.props.tileImageLoaded}	
					/>
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