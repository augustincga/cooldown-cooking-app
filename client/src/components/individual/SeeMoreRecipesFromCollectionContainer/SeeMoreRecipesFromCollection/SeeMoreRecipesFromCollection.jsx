import React, { Component } from "react"

import './SeeMoreRecipesFromCollections.css'

class SeeMoreRecipesFromCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }

    render() {
		return(
			<SeeMoreRecipesFromCollection collectionData = {this.props.collectionData}/>
		)
    }
}

export default SeeMoreRecipesFromCollection;