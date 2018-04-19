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
						overlay={<CardTitle title={this.props.recipeData.title}/>}
						onClick={this.props.onRecipeTileItemClick}
						className='recipe-tile__image-wrapper'
					>
						<img src={this.props.recipeData.largeImage} alt="" />
					</CardMedia>
					<CardText>
					</CardText>
				</Card>
			</div>
		);
	}
}

export default RecipeTileItem;