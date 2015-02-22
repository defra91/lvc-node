'use strict';

var passport = require('passport');
var CustomError = require('../../utils/CustomError');

exports.init = function(app) {

	var Admin = app.db.data.model('admin');

	passport.use(Admin.createStrategy());

	passport.serializeUser(Admin.serializeUser());
	passport.deserializeUser(Admin.deserializeUser());

	app.use(passport.initialize());
	app.use(passport.session());
};

exports.authenticate = function(req, res, next) {

	passport.authenticate('local',
		function(err, admin, info) {
			if (err) {
				return next(err);
			}
			if (!admin) {
				return res.json(401, new CustomError(1000).toDict());
			}
			req.logIn(admin, function(err) {
				if (err) {
					return next(err);
				}
				return next();
			});	
		})(req, res, next);
};

exports.requireLogged = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next(); 
	} else {
		res.json(401, new CustomError(1001).toDict());
	}
};