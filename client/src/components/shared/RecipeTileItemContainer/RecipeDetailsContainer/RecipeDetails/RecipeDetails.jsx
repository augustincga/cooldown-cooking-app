import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog'

import './RecipeDetails.css'

class RecipeDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<Dialog
				modal={false}
				open={this.props.isRecipeDetailsModalOpen}
				onRequestClose={this.props.onRecipeDetailsModalClose}
			>
				<p>{this.props.recipeDetailsData.title}</p>
		  </Dialog>
		);
	}
}

export default RecipeDetails;