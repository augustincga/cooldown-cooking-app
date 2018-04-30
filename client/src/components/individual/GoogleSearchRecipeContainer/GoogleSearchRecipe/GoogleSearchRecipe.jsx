import React, { Component } from 'react';
import Dropzone from 'react-dropzone';


import './GoogleSearchRecipe.css'
import {CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL} from '../../../shared/constants'

class GoogleSearchRecipe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadedFileCloudinaryUrl: '',
			uploadedFile: ''
		}
		this._onImageDrop = this._onImageDrop.bind(this);
		this._handleImageUpload = this._handleImageUpload.bind(this);
	}

	render() {
		return (
			<div className="google-search-recipes__wrapper">
				<Dropzone
					multiple={false}
					accept="image/*"
					onDrop={this._onImageDrop}>
					<p>Drop an image or click to select a file to upload.</p>
				</Dropzone>

				<div>
					{this.state.uploadedFileCloudinaryUrl === '' ? null :
						<div>
							<p>{this.state.uploadedFile.name}</p>
							<img src={this.state.uploadedFileCloudinaryUrl} />
						</div>}
				</div>
			</div>
		);
	}

	_onImageDrop(files) {
		this.setState({
			uploadedFile: files[0]
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
				this.setState({
					uploadedFileCloudinaryUrl: image.secure_url
				  });
				  
				  window.open(`http://images.google.com/searchbyimage?image_url=${image.secure_url}`, '_blank');
			})
		  });
	
	  }
}

export default GoogleSearchRecipe;