import moment from 'moment';
import 'moment/locale/id'; // Impor locale Bahasa Indonesia

export const dateFormatWithTime = (date) => {
	return `${moment(date).format('DD/MM/YYYY - HH.mm')}`;
};

export const dateFormat = (date) => {
	moment.locale('id');
	return `${moment(date).format('dddd, DD MMMM YYYY')}`;
};

export const dateFormatNormal = (date) => {
	return `${moment(date).format('DD MMMM YYYY')}`;
};

export const dateFormatForInput = (date) => {
	return `${moment(date).format('YYYY-MM-DD')}`;
};

export const dateFormatCustom = (date, format = 'YYYY-MM-DD') => {
	return `${moment(date).format(format)}`;
};

export const dateFormatForImport = (date) => {
	return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
};
