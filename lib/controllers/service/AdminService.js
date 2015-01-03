'use strict';

exports.getAdmins = function(req, res, next) {

	var Admin = req.app.db.data.model('admin');

	Admin.findAll(function success(result) {
		res.json(result);
	}, function error(err) {
		next(err);
	});
};

exports.createAdmin = function(req, res, next) {

	var Admin = req.app.db.data.model('admin');

	var admin = {
		email: req.body.email,
		password: req.body.password
	};

	Admin.createAdmin(admin,
		function success(result) {
			res.json(result);
		},
		function error(err) {
			next(err);
		}
	);

};

exports.deleteAdminById = function(req, res, next) {

	var Admin = req.app.db.data.model('admin');

	Admin.findByIdAndRemove(req.params.adminId,
		function success() {
			res.end();
		},
		function error(err) {
			next(err);
		}
	);
};