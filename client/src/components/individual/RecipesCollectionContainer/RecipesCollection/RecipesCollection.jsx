import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton/';


import './RecipesCollection.css';
import RecipesCollectionList from '../RecipesCollectionList/RecipesCollectionList';

class RecipesCollection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div className="recipes-collection__wrapper">
				<div className="recipes-collection__bookmarked-recipes-wrapper">
					<div>
						<h1>
							Here are the recipes you saved for later...
						</h1>
						<div className="bookmarked-recipes-container">
							<RecipesCollectionList 
								recipesList = {this.props.savedForLaterRecipes} 
								key = {"saved-for-later-recipes"}
								triggeredByBookmarkChange = {this.props.triggeredByBookmarkChange}	
							/>
						</div>
						<div className="bookmarked-recipes-see-more-btn-wrapper">
							<RaisedButton className="bookmarked-recipes-see-more-btn" label="See more" primary={true}/>
						</div>
					</div>
				</div>
				<Divider/>
				<div className="recipes-collection__reviewed-recipes-wrapper">
					<div>
						<h1>
							See your reviewed recipes...
						</h1>
						<div className="reviewed-recipes-container">
							<RecipesCollectionList 
								recipesList = {this.props.reviewedRecipesList} 
								key = {this.props.reviewedRecipesListKey}
								triggeredByBookmarkChange = {this.props.triggeredByBookmarkChange}
							/>
						</div>
						<div className="reviewed-recipes-see-more-btn-wrapper">
							<RaisedButton className="reviewed-recipes-see-more-btn" label="See more" primary={true}/>
						</div>
					</div>
				</div>
				<Divider/>				
				<div className="recipes-collection__rated-recipes-wrapper">
					<div>
						<h1>
							See your rated recipes...
						</h1>
						<div className="rated-recipes-container">
							<RecipesCollectionList 
							recipesList = {this.props.ratedRecipesList} 
							key = {this.props.ratedRecipesListKey}
							triggeredByBookmarkChange = {this.props.triggeredByBookmarkChange}
							/>
						</div>
						<div className="rated-recipes-see-more-btn-wrapper">
							<RaisedButton className="rated-recipes-see-more-btn" label="See more" primary={true}/>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default RecipesCollection;