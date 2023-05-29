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
				primary: '#233c46',
				secondary: '#5e7d8a',
				secondary_on_hover: '#506a75',
				green_tea: '#88c241',
				green_tea_hover: '#97d44c',
			},

			// fontFamily: {
			// 	lexend: "'Roboto', sans-serif",
			// },
		},
	},
	plugins: [require('flowbite/plugin')],
};
