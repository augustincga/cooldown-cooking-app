import Cookies from 'universal-cookie';
import Alert from 'react-s-alert';

//Cookies reference
export const cookies = new Cookies();

//Alerts references
export const errorNotification = (message) => {
	Alert.error(message, {
		position: 'bottom-right',
		effect: 'flip',
		timeout: 3000
	});
}

export const successNotification = (message) => {
	Alert.success(message, {
		position: 'bottom-right',
		effect: 'flip',
		timeout: 3000
	});
}

export const warningNotification = (message) => {
	Alert.warning(message, {
		position: 'bottom-right',
		effect: 'flip',
		timeout: 3000
	});
}


//Settings for cloudinary in order to upload an image on cloud before searchign it on google
export const CLOUDINARY_UPLOAD_PRESET = 'vtxr37dm'

export const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/augustincga/upload'
