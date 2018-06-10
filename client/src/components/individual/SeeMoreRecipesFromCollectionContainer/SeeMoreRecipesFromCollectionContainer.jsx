import React, { Component } from "react"

import SeeMoreRecipesFromCollection from './SeeMoreRecipesFromCollection/SeeMoreRecipesFromCollection'

class SeeMoreRecipesFromCollectionContainer extends Component {
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

export default SeeMoreRecipesFromCollectionContainer;