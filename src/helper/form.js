import { useSelector } from 'react-redux';
import { getErrors } from '../redux/reducer/validationSlice';

const getValidationError = (key) => {
	const errors = useSelector(getErrors);
	for (var i = 0; i < errors.length; i++) {
		if (errors[i].path === key) return errors[i].msg;
	}
};

const preventCharactersOtherThanNumbers = (event) => {
	event.target.value = event.target.value.replace(/[^0-9]/g, '');
};

export { getValidationError, preventCharactersOtherThanNumbers };
