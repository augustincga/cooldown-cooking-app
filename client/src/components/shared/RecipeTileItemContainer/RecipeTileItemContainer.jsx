import React, { Component } from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import RecipeTileItem from './RecipeTileItem/RecipeTileItem';

class RecipeTileItemContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipeData: this.props.recipeData
		}
	}

	render() {
		return (
			<RecipeTileItem recipeData = {this.state.recipeData}/>
		);
	}
}

export default RecipeTileItemContainer;