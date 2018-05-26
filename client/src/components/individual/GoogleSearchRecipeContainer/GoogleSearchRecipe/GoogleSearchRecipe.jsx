import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import './GoogleSearchRecipe.css'
import LoadingIndicator from '../../../shared/LoadingIndicator/LoadingIndicator'

class GoogleSearchRecipe extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			
			<div className="google-search-recipes__wrapper">
				<LoadingIndicator isActive = {this.props.isLoadingActive}/>

				<div className="google-search-recipes__dropzone">
					<Dropzone
						multiple={false}
						accept="image/*"
						onDrop={this.props.onImageDrop}>
						<p>Drop an image or click to select a file to upload.</p>
					</Dropzone>
				</div>

				<div className="google-search-recipes__list-container">
					<div>
						<h1>Here are your latest google searches...</h1>
					</div>

					<div className="google-search-recipes__items-wrapper">
						{this.props.googleSearchedRecipes.slice(this.props.googleSearchedRecipes.length - 5, this.props.googleSearchedRecipes.length).map((search) => {
							return(
								<div className="google-search-recipes__list-item" key={search.urlResult}>
									<a href={search.urlResult} target="_blank"><img src={search.uploadedImgUrl}/></a>
								</div>
							)
						})}
					</div>
				</div>
			
			</div>
		);
	}
}

export default GoogleSearchRecipe;