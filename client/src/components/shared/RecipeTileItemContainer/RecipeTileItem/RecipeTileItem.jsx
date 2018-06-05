import React, { Component } from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Beenhere from 'material-ui/svg-icons/maps/beenhere'

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
						overlay={
						<CardTitle title={this.props.recipeData.title}/>}
						onClick={this.props.onRecipeTileItemClick}
						className='recipe-tile__image-wrapper'
					>
						<div>
							<img src={this.props.recipeData.largeImage} alt="" onLoad={this.props.tileImageLoaded}/>
							{
								this.props.isRecipeBookmarked === false ?
									<IconButton className="recipe-tile__bookmark-btn-wrapper" onClick={this.props.onSaveForLaterClick}>
										<StarBorder color="white" />
									</IconButton> :
									<IconButton className="recipe-tile__already-bookmark-btn-wrapper" onClick={this.props.onRemoveFromBookmarks}>
										<Beenhere/>
									</IconButton>
							}
						</div>
					</CardMedia>
					<CardText className="recipe-tile__card-text">
						{this.props.availability.available !== null ?
							<div> 
								<div className="recipe-tile__available-ingredients">
									<span>{this.props.availability.available} ingredient(s) available </span>
								</div>
								<div className="recipe-tile__missing-ingredients">
									<span>{this.props.availability.missing !== 0 ? `${this.props.availability.missing} ingredient(s) missing` : null}</span>
								</div>
							</div>
							: null
						}

					</CardText>
				</Card>
			</div>
		);
	}
}

export default RecipeTileItem;