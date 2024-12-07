import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/routes/**/*.svelte'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Epilogue Variable', ...fontFamily.sans]
			}
		}
	},
	plugins: []
}
