const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./src/**/*.njk",
		"./src/**/*.svg",
		"./src/**/*.md",
		"./src/assets/js/*.js"
	],
	screens: {
		sm: "576px",
		md: "768px",
		lg: "1024px",
		xl: "1280px"
	},
	theme: {
		extend: {
			typography: theme => ({
				DEFAULT: {
					css: {
					  fontFamily: {
              serif: ['Lora', ...defaultTheme.fontFamily.serif],
      },
						blockquote: {
							fontWeight: "normal",
							color: theme("colors.slate.600")
						},
						"blockquote p:first-of-type::before": {
							content: ""
						},
						"blockquote p:last-of-type::after": {
							content: ""
						}
					}
				}
			})
		}
	},
	plugins: [require("@tailwindcss/typography")]
};
