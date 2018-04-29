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
							<img src={this.props.recipeData.largeImage} alt="" />
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
					<CardText>
					</CardText>
				</Card>
			</div>
		);
	}
}

export default RecipeTileItem;