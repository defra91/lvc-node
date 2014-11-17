'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

// Development

var development = {
	env: "development",

	rootPath: rootPath,

	webServer: {
		port: 3000,
		static: path.join(rootPath, "app"),
		tmp: path.join(rootPath, ".tmp")
	},

	db: {
		url: "localhost:27017/lvc"
	}
};


// Production

var production = {
	env: "production",

	rootPath: rootPath,

	webServer: {
		port: 3000,
		static: path.join(rootPath, "app"),
		tmp: path.join(rootPath, ".tmp")
	},

	db: {
		url: "localhost:27017/lvc"
	}
};

module.exports = {
	development: development,
	production: production
};
