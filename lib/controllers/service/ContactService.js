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

exports.getContactById = function(req, res, next) {

	var Contact = req.app.db.data.model('contact');

	Contact.findById(req.params.contactId,
		function success(result) {
			res.json(result);
		},
		function error(err) {
			next(err);
		}
	);

};

exports.deleteContactById = function(req, res, next) {
	
	var Contact = req.app.db.data.model('contact');

	Contact.findByIdAndRemove(req.params.contactId,
		function success() {
			res.end();
		},
		function error(err) {
			next(err);
		}
	);
};

exports.editContactById = function(req, res, next) {
	
	var Contact = req.app.db.data.model('contact');

	Contact.findById(req.params.contactId,
		function success(result) {

			var contactObj = {
				name: req.body.name,
				surname: req.body.surname,
				email: req.body.email
			};

			result.updateContact(contactObj,
				function success(result) {
					res.json(result);
				},
				function error(err) {
					next(err);
				}
			);

		},
		function error(err) {
			next(err);
		}
	);
};