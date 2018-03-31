import React, { Component } from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import './RecipeTileItem.css'

class RecipeTileItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div className="recipe-tile__wrapper">
				<Card>
					<CardMedia
						overlay={<CardTitle title={this.props.recipeData.title} subtitle="Overlay subtitle" />}
					>
						<img src={this.props.recipeData.largeImage} alt="" />
					</CardMedia>
					<CardText>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</CardText>
				</Card>
			</div>
		);
	}
}

export default RecipeTileItem;