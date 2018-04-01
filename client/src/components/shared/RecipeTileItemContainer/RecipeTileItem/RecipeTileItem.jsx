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
					>
						<img src={this.props.recipeData.largeImage} alt="" />
					</CardMedia>
					<CardText>
						<div className="">
							<i className="fa fa-hourglass"> {this.props.recipeData.cookingTime}</i>
						</div>	
					</CardText>
				</Card>
			</div>
		);
	}
}

export default RecipeTileItem;