import React, { Component } from 'react';

import './RecipesCollectionList.css'
import RecipeTileItemContainer from '../../../shared/RecipeTileItemContainer/RecipeTileItemContainer'

class RecipesCollectionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div className="recipes-collection-list__wrapper">
				{this.props.recipesList.slice(0, 3).map((recipe)=> {
					return(
						<RecipeTileItemContainer 
							recipeData = {recipe} 
							key = {recipe._id}
							triggeredByBookmarkChange = {this.props.triggeredByBookmarkChange}
							triggeredByRemoveFromAlreadyCooked = {this.props.triggeredByRemoveFromAlreadyCooked}
							triggeredByAddToCooked = {this.props.triggeredByAddToCooked}			
						/>					
					)
				})}
			</div>
		);
	}

	componentWillReceiveProps(newProps) {
		this.forceUpdate();
	}
}

export default RecipesCollectionList;