import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

import './AddIngredients.css';

const suggestionListStyles = {
	"width": "150px",
	"maxHeight": "200px",
	"overflow": "auto"
}

class AddIngredients extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		
		const dataSourceConfig = {text: 'name'}
		return (
			<div className="add-ingredients__wrapper" >
				<AutoComplete className="add-ingredients__search-wrapper"
					listStyle={suggestionListStyles}
					hintText="Ingredient..."
					filter={AutoComplete.caseInsensitiveFilter}
					dataSource={this.props.ingredientsList}
					dataSourceConfig={dataSourceConfig}
					onNewRequest = {this.props.onSelectIngredient}
					ref={(item) => { this.autocompleteInput = item; }} 
				/>
			</div>
		);
	}
}

export default AddIngredients;