import React, { Component } from 'react';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
		<div>
			<p>Welcome, {this.props.userData.fullName}</p>
		</div>
    );
  }
}

export default Home;