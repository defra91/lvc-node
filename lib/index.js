'use strict';

var express    = require('express'),
    path       = require('path'),
    fs         = require('fs'),
    mongoose   = require('mongoose'),
    MongoStore = require('connect-mongo')(express),
    env        = process.env.NODE_ENV || "development",
    config     = require("./config/config")[env],
    middleware = require('./controllers/middleware');

var initDb = function(app) {
	var config = app.config;

	app.db = {};

	app.db.data = mongoose.createConnection("mongodb://" + config.db.url);
	app.db.data.on('error', function(err) {
		console.err(err);
		console.error("Check if your mongodb Data database is running at " + config.db.url);
	});
	app.db.data.on('open', function(ref) {
		console.log("Successefully connected at database: " + config.db.url);
	});
};

var initApp = function(app) {
	var config = app.config;

	if (config.env === 'development') {
		app.use(express.logger());
	}

	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser("y0ur $3cret h3re"));

	app.use(express.session({
		secret: "y0ur $3cret h3re",
		store: new MongoStore({
			url: "mongodb://" + config.db.url,
			maxAge: 2 * 7 * 24 * 3600 * 1000
		})
	}));

	if (config.webServer && config.webServer.static) {
		app.use(express.static(config.webServer.static));
	}

	middleware.init(app);

};

var start = function(config) {
	var app = express();
	app.config = config;
	initDb(app);
	initApp(app);

	process.on('uncaughtException', function(err) {
		console.error("/!\\ Caught exception:", err);
	});

	console.log("Starting app.listen...");
	app.listen(config.webServer.port);
}

exports.initDb  = initDb;
exports.initApp = initApp;
exports.start   = start;