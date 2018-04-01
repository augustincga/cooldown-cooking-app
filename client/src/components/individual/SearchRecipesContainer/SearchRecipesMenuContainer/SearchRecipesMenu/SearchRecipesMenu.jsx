import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton'


import './SearchRecipesMenu.css'

class SearchRecipesMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
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
						value={1}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						targetOrigin={{ vertical: 'top', horizontal: 'left' }}
						autoWidth={false}
						className="search-recipes-menu__ingredients-dropdown"
					>
						<MenuItem value={1} primaryText="Ingredients here" />
     				</DropDownMenu>

					<DropDownMenu 
						maxHeight={300} 
						value={1}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						targetOrigin={{ vertical: 'top', horizontal: 'left' }}
						autoWidth={false}
						className="search-recipes-menu__filters-dropdown"
					>
						<MenuItem value={1} primaryText="Filters in here" />
     				</DropDownMenu>
					 <div className="search-recipes-menu__search-recipes-btn">
					 	<RaisedButton label="Search" primary={true} /> 					 
					 </div>
					<Divider/>

				</Drawer>
			</div>
		);
	}
}

export default SearchRecipesMenu;