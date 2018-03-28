import Cookies from 'universal-cookie';
import Alert from 'react-s-alert';

//Cookies reference
export const cookies = new Cookies();

//Alerts references
export const errorNotification = (message) => {
	Alert.error(message, {
		position: 'top-right',
		effect: 'flip',
		timeout: 3000
	});
}

export const successNotification = (message) => {
	Alert.success(message, {
		position: 'top-right',
		effect: 'flip',
		timeout: 3000
	});
}

export const warningNotification = (message) => {
	Alert.warning(message, {
		position: 'top-right',
		effect: 'flip',
		timeout: 3000
	});
}