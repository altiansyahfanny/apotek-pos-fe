/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#212529',
				primaryOnHover: '#3c4145',
				primaryToHover: '#e5e7eb',
			},

			// fontFamily: {
			// 	lexend: "'Roboto', sans-serif",
			// },
		},
	},
	plugins: [require('flowbite/plugin')],
};
