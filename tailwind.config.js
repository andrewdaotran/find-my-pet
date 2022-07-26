/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				pastelGrey: '#EAE4E9',
				pastelCream: '#FFF1E6',
				pastelLighterCream: '#FAF3ED',
				pastelDarkerCream: '#FAE3CF',
				pastelPink: '#FDE2E4',
				pastelRed: '#FAD2E1',
				pastelLighterRed: '#F7DFE8',
				pastelDarkerRed: '#FAB6D0',
				pastelLightGreen: '#E2ECE9',
				pastelDarkerLightGreen: '#CAE6DD',
				pastelGreen: '#BEE1E6',
				pastelSand: '#F0EFEB',
				pastelBlue: '#DFE7FD',
				pastelPurple: '#CDDAFD',
				pastelLighterPurple: '#E1E8FA',
			},
		},
	},
	plugins: [],
}
