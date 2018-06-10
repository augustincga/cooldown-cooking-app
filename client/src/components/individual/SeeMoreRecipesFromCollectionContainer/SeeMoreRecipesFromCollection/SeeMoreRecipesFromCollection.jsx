import React, { Component } from "react"

import './SeeMoreRecipesFromCollections.css'
import RecipesTilesListContainer from "../../../shared/RecipesTilesListContainer/RecipesTilesListContainer";

class SeeMoreRecipesFromCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }

    render() {
		return(
			<div className="recipes-collection-expanded__container">
				<div className="recipes-collection-expanded__title">
					<h1>Recipes you already {this.props.collectionData.collectionName}</h1>
				</div>
				<RecipesTilesListContainer
					recipesList={this.props.collectionData.recipesList}
					selectedIngredients={[]}
				/>
			</div>
		)
    }
}

export default SeeMoreRecipesFromCollection;