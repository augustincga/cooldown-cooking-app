import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton'


import './SearchRecipesMenu.css'
import AddIngredientsContainer from '../../../../shared/AddIngredientsContainer/AddIngredientsContainer'


class SearchRecipesMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
		this._formatSelectedIngredientsList = this._formatSelectedIngredientsList.bind(this);
	}

	render() {
		return (
			<div className="search-recipes-menu__wrapper">
				<Drawer
					width={200}
					containerClassName = "sidebar__wrapper"
					open={true}
				>
					<DropDownMenu 
						maxHeight={300} 
						value = {"default"}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						targetOrigin={{ vertical: 'top', horizontal: 'left' }}
						autoWidth={false}
						className="search-recipes-menu__ingredients-dropdown"
					>
						{this._formatSelectedIngredientsList()}
     				</DropDownMenu>

					<DropDownMenu 
						maxHeight={300} 
						value={1}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						targetOrigin={{ vertical: 'top', horizontal: 'left' }}
						autoWidth={false}
						className="search-recipes-menu__filters-dropdown"
					>
						<MenuItem value={1} primaryText="Selected Filters" />
     				</DropDownMenu>
					 <div className="search-recipes-menu__search-recipes-btn">
					 	<RaisedButton label="Search" primary={true} /> 					 
					 </div>
					<Divider/>
						<h1 className="search-recipes-menu__ingredients-dropdown-title">Add your available ingredients</h1>
						<div className="search-recipes-menu__ingredients-dropdown-wrapper">
							<AddIngredientsContainer onSelectIngredientTrigger = {this.props.onSelectIngredientTrigger}/>
						</div>
					<Divider/>
				</Drawer>
			</div>
		);
	}

	_formatSelectedIngredientsList() {
		let ingredients = [];
		ingredients.push(<MenuItem value={"default"} primaryText="Selected Ingredients" key="default"/>);
		this.props.selectedIngredients.forEach(function(ingredient, index){
			ingredients.push(<MenuItem value={index} key={index} primaryText={ingredient.name} />);
		})
		return ingredients;
	}
}

export default SearchRecipesMenu;