import React, { Component } from 'react';

import GoogleSearchRecipe from './GoogleSearchRecipe/GoogleSearchRecipe'

class GoogleSearchRecipeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div>
				<GoogleSearchRecipe/>
			</div>
		);
	}
}

export default GoogleSearchRecipeContainer;