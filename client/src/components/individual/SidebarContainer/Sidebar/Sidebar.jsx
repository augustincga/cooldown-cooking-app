import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';

import './Sidebar.css'

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<div>
				<Drawer
					width={200}
					containerClassName = "sidebar__wrapper"
					open={this.props.isSidebarOpen}
				/>
			</div>
		);
	}
}

export default Sidebar;