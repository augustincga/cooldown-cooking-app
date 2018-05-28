import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import {Tabs, Tab} from 'material-ui/Tabs/';

import RecipesTilesListContainer from '../../shared/RecipesTilesListContainer/RecipesTilesListContainer'
import SearchRecipesMenuController from './SearchRecipesMenuContainer/SearchRecipesMenuContainer'
import RecipeSearchBar from '../../shared/RecipeSearchBar/RecipeSearchBar'

class SearchRecipesContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipesDataSet: [],
			toggleSearchTypeValue: "filters"
		}
		this._onFetchRecipesByFilters = this._onFetchRecipesByFilters.bind(this);
		this._onTabChangeSearchType = this._onTabChangeSearchType.bind(this);
		this._onSuccessfullyReceiveRecipesFromSearchBar = this._onSuccessfullyReceiveRecipesFromSearchBar.bind(this);
	}

	componentWillMount() {
		
	}

	render() {
		return (
			<div>
				<Drawer
					width={200}
					containerClassName="sidebar__wrapper"
					open={true}
				>
					<Tabs 
						value={this.state.toggleSearchTypeValue} 
						onChange={this._onTabChangeSearchType}           
					>
						<Tab value="filters" label="by filters" />
						<Tab value="name" label="by name" />
					</Tabs>

					{ this.state.toggleSearchTypeValue === "filters" ?
						<SearchRecipesMenuController onFetchRecipesByFilters={this._onFetchRecipesByFilters}/> :
						<RecipeSearchBar triggeredFromSearchBar = {this._onSuccessfullyReceiveRecipesFromSearchBar}/>
					}
					
				</Drawer>
				<RecipesTilesListContainer recipesList = {this.state.recipesDataSet}/>
			</div>
		);
	}
	
	_onFetchRecipesByFilters(recipes) {
		this.setState({recipesDataSet: recipes});
	}

	_onTabChangeSearchType(value) {
		this.setState({ toggleSearchTypeValue: value });
	};

	_onSuccessfullyReceiveRecipesFromSearchBar(recipes) {
		this.setState({
			recipesDataSet: recipes
		})
	}
}

export default SearchRecipesContainer;