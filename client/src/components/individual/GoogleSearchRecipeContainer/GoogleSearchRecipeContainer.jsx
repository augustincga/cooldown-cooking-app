import React, { Component } from 'react';

import GoogleSearchRecipe from './GoogleSearchRecipe/GoogleSearchRecipe'
import {CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL, cookies, successNotification, errorNotification} from '../../shared/constants'


class GoogleSearchRecipeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadedFileCloudinaryUrl: '',
			uploadedFile: '',
			googleSearchedRecipes: cookies.get('user').googleSearchedRecipes,
			isLoadingActive: false		
		}
		this._onImageDrop = this._onImageDrop.bind(this);
		this._handleImageUpload = this._handleImageUpload.bind(this);
		this._saveGoogleSearch = this._saveGoogleSearch.bind(this);
	}

	render() {
		return (
			<div>
				<GoogleSearchRecipe
					onImageDrop = {this._onImageDrop}
					googleSearchedRecipes = {this.state.googleSearchedRecipes} 
					isLoadingActive = {this.state.isLoadingActive}
				/>
			</div>
		);
	}

	_onImageDrop(files) {
		this.setState({
			uploadedFile: files[0],
			isLoadingActive: true
		})
		this._handleImageUpload(files[0]);
	}

	_handleImageUpload(file) {

		let fd = new FormData();
		fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
		fd.append('file', file);

		fetch(CLOUDINARY_UPLOAD_URL, {
			method: 'post',
			body: fd
		})
		.then()
		.then()
		.then((response) => {
			response.json().then((image) => {
				let googleUrl = `http://images.google.com/searchbyimage?image_url=${image.secure_url}`

				window.open(googleUrl, '_blank');
				this._saveGoogleSearch(image.secure_url, googleUrl);
			})
		  });
		  this._onImageDrop = this._onImageDrop.bind(this);
		  this._handleImageUpload = this._handleImageUpload.bind(this);
		  this._saveGoogleSearch = this._saveGoogleSearch.bind(this);
	  }

	_saveGoogleSearch(imageUrl, urlResult) {
		let data = {
			uploadedImgUrl: imageUrl,
			urlResult: urlResult,
			userId: cookies.get('user')._id
		}

		fetch('http://localhost:3001/api/user/saveGoogleSearch', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'post',
			body: JSON.stringify(data)
		}).then((response) => {
			if(response.status === 200) {
				response.json().then((user) => {
					cookies.set('user', user);
					this.setState({
						googleSearchedRecipes: user.googleSearchedRecipes,
						isLoadingActive: false
					})
					successNotification('Google Search has been saved.');
				})
			} else {
				response.json().then((err) => {
					errorNotification(err);
				})
			}
		});
	}
}

export default GoogleSearchRecipeContainer;