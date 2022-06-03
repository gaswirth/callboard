module.exports = {
	singleQuote: true,
	printWidth: 120,
	useTabs: true,
	tabWidth: 2,
	overrides: [
		{
			files: '*.scss',
			options: {
				singleQuote: false,
			},
		},
	],
};
