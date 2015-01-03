'use strict';

var express      = require('express'),
    path         = require('path'),
    fs           = require('fs'),
    mongoose     = require('mongoose'),
    MongoStore   = require('connect-mongo')(express),
    env          = process.env.NODE_ENV || "development",
    config       = require("./config/config")[env],
    middleware   = require('./controllers/middleware'),
    newsModel    = require('./models/NewsModel'),
    contactModel = require('./models/ContactModel');
    adminModel   = require('./models/AdminModel');

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

	newsModel.init(app);
	contactModel.init(app);
};

var initApp = function(app) {
	var config = app.config;

	if (config.env === 'development') {
		app.use(express.logger());
	}

	if (config.webServer && config.webServer.static) {
		app.use(express.static(config.webServer.tmp));
		app.use(express.static(config.webServer.static));
		app.set('views', path.join(config.webServer.static, "views"));
	}

	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');

	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser("y0ur $3cret h3re"));
	app.use(express.errorHandler());
	app.use(express.bodyParser());
	app.use(require('connect-livereload')());

	app.use(express.session({
		secret: "y0ur $3cret h3re",
		store: new MongoStore({
			url: "mongodb://" + config.db.url,
			maxAge: 2 * 7 * 24 * 3600 * 1000
		})
	}));

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
