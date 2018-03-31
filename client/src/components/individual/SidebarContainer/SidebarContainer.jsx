import React, { Component } from 'react';

import Sidebar from './Sidebar/Sidebar'

class SidebarContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div>
				<Sidebar isSidebarOpen={this.props.isSidebarOpen}/>
			</div>
		);
	}
}

export default SidebarContainer;