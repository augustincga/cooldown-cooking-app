import React, { Component } from 'react';

import Header from './Header/Header'

class HeaderContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div>
				<Header onSearchRecipes = {this.props.onSearchRecipes}/>
			</div>
		);
	}
}

export default HeaderContainer;