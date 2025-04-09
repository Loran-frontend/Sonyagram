import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [
		heroui({
			themes: {
				light: {
					layout: {},
					colors: {
						background: '#C5ACF7FF',
						foreground: '#333333',
						content1: '#E0D8FF',
						default: {
							foreground: '#FFFFFFFF',
							50: '#CCBFFAFF',
							100: '#D9C9FF',
							200: '#A782F6FF',
							300: '#9561FF',
							400: '#732DFF',
							500: '#5A00E6FF',
							600: '#4700B3',
							700: '#340080',
							800: '#21004D',
							900: '#0E001A',
							DEFAULT: '#5A00E6',
						},
					},
				},
				dark: {
					layout: {},
					colors: {
						background: '#0A0420',
						foreground: '#E6D8FF',
						content1: '#211938',
						default: {
							50: '#F4F0FF',
							100: '#CFC1F7FF',
							200: '#C6B3FF',
							300: '#A98DFF',
							400: '#8B66FF',
							500: '#6E40FF',
							600: '#5A35D1',
							700: '#472A9E',
							800: '#331F6B',
							900: '#201438',
							DEFAULT: '#6E40FF',
						},
					},
				},
			},
		}),
	],
};
