import moment from 'moment';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './router/Router';
import TriggerClass from './components/TriggerClass';
import { localization } from './config/dateConfig';

const App = () => {
	moment.updateLocale('id', localization);
	moment.locale('id');
	return (
		<>
			<Router />
			<ToastContainer
				autoClose={3000}
				position="top-right"
				pauseOnHover={false}
				pauseOnFocusLoss={false}
			/>
			<TriggerClass />
		</>
	);
};

export default App;
