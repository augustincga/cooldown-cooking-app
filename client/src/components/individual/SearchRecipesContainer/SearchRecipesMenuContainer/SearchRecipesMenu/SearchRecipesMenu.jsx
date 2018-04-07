import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton'
import Delete from 'material-ui/svg-icons/action/delete';
import Checkbox from 'material-ui/Checkbox'


import './SearchRecipesMenu.css'
import AddIngredientsContainer from '../../../../shared/AddIngredientsContainer/AddIngredientsContainer'


class SearchRecipesMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
		this._formatSelectedIngredientsList = this._formatSelectedIngredientsList.bind(this);
		this._formatSelectedFiltersList = this._formatSelectedFiltersList.bind(this);
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
						maxHeight={150} 
						value = {"default"}
						onChange={this.props.onDeleteIngredient}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						targetOrigin={{ vertical: 'top', horizontal: 'left' }}
						autoWidth={false}
						className="search-recipes-menu__ingredients-dropdown"
					>
						{this._formatSelectedIngredientsList()}
     				</DropDownMenu>

					<DropDownMenu 
						maxHeight={150} 
						value = {"default"}
						onChange={this.props.onDeleteFilter}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						targetOrigin={{ vertical: 'top', horizontal: 'left' }}
						autoWidth={false}
						className="search-recipes-menu__filters-dropdown"
					>
						{this._formatSelectedFiltersList()}
     				</DropDownMenu>
					 <div className="search-recipes-menu__search-recipes-btn">
					 	<RaisedButton label="Search" primary={true} onClick = {this.props.onRecipesSearch}/> 					 
					 </div>
					<Divider/>
						<h1 className="search-recipes-menu__ingredients-dropdown-title">Add your available ingredients</h1>
						<div className="search-recipes-menu__ingredients-dropdown-wrapper">
							<AddIngredientsContainer onSelectIngredientTrigger = {this.props.onSelectIngredientTrigger}/>
						</div>
					<Divider/>
						<h1 className="search-recipes-menu__filters-title">Select some filters</h1>
						<div className="search-recipes-menu__filters-wrapper">
						{this.props.filtersList.map((filterItem, index) => 
							<Checkbox
								label={filterItem}
								key={filterItem}
								checked={this.props.checkedFilters[filterItem]}
								onCheck={(e, isChecked) => this.props.onCheckFilter(e, isChecked, filterItem)}
							/>
							)}
						</div>
				</Drawer>
			</div>
		);
	}


	componentWillReceiveProps(){
		this.forceUpdate();
	}

	_formatSelectedIngredientsList() {
		let ingredients = [];
		ingredients.push(<MenuItem value={"default"} primaryText="Selected Ingredients" key="default"/>);
		this.props.selectedIngredients.forEach(function(ingredient, index){
			ingredients.push(
				<MenuItem 
					value={index} 
					key={index} 
					primaryText={ingredient.name} 
					rightIcon={<Delete />}
				/>
			);
		})
		return ingredients;
	}

	_formatSelectedFiltersList() {
		let filters = [];
		filters.push(<MenuItem value={"default"} primaryText="Selected Filters" key="default"/>);
		this.props.selectedFilters.forEach(function(filter, index){
			filters.push(
				<MenuItem 
					value={index} 
					key={index} 
					primaryText={filter} 
					rightIcon={<Delete />}
				/>
			);
		})
		return filters;
	}
}

export default SearchRecipesMenu;