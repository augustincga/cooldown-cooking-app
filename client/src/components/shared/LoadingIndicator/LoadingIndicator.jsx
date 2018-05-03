import React from "react"
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Dialog from 'material-ui/Dialog';


const PrivateRoute = ({isActive}) => {
	return (
		<Dialog
		open={isActive}
		style={{width: '200px', marginLeft: '40%', backgroundColor: 'transparent'}}
		title= 'Loading'
		titleStyle={{paddingTop: '0px', paddingLeft: '45px', fontSize: '15px', lineHeight: '40px'}}
		>
			<RefreshIndicator
			style= {{display: 'inline-block'}}
			size={50}
			left={50}
			top={30}
			loadingColor="#FF9800"
			status="loading"    
			/>
		</Dialog>
	  )
}

export default PrivateRoute;