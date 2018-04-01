import React, { Component } from 'react';

import SearchRecipesMenu from './SearchRecipesMenu/SearchRecipesMenu'

class SearchRecipesMenuContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div>
				<SearchRecipesMenu/>
			</div>
		);
	}
}

export default SearchRecipesMenuContainer;