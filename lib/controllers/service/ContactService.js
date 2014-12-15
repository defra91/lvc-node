'use strict';

exports.getContacts = function(req, res, next) {

	var Contact = req.app.db.data.model('contact');

	Contact.findAll(function success(result) {
		res.json(result);
	}, function error(err) {
		next(err);
	});

};

exports.createContact = function(req, res, next) {

	var Contact = req.app.db.data.model('contact');

	var contactObj = {
		name: req.body.name,
		surname: req.body.surname,
		email: req.body.email
	};

	Contact.createContact(contactObj,
		function success(result) {
			res.json(result);
		},
		function error(err) {
			next(err);
		}
	);

};