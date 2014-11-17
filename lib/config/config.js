'use strict';

// Development

var development = {
	env: "development",

	webServer: {
		port: 3000,
		static: __dirname + "/app"
	},

	db: {
		url: "localhost:27017/lvc"
	}
};


// Production

var production = {
	env: "production",

	webServer: {
		port: 3000,
		static: __dirname + "/app"
	},

	db: {
		url: "localhost:27017/lvc"
	}
};

module.exports = {
	development: development,
	production: production
};
