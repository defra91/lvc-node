'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

exports.init = function(app) {

	var ContactSchema = new Schema({
		name: {
			type: String,
			required: true
		},
		surname: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			index: { unique: true },
			validate: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/
		},
		subscribeDate: {
			type: Date
		}
	});

	ContactSchema.statics.createContact = function(newContact, callback, errback) {

		var contact = new this({
			name: newContact.name,
			surname: newContact.surname,
			email: newContact.email
		});

		contact.save(function(err) {
			if (err) {
				errback(err);
 			} else {
 				callback();
 			}
		});
	};

	ContactSchema.statics.findAll = function(callback, errback) {
		this.find({}, function(err, result) {
			if (err) {
				errback(err);
			} else {
				callback(result);
			}
		});
	};

	ContactSchema.statics.findById = function(_id, callback, errback) {
		this.findOne({_id: _id}, function(err, result) {
			if (err) {
				errback(err);
			} else {
				callback(result);
			}
		});
	};

	ContactSchema.statics.findByIdAndRemove = function(_id, callback, errback) {
		this.findOne({_id: _id}, function(err, result) {
			if (err) {
				errback(err);
			} else {
				result.remove(function(err, result) {
					if (err) {
						errback(err);
					} else {
						callback();
					}
				});
			}
		});
	};

	ContactSchema.methods.updateContact = function(contact, callback, errback) {

		if (contact.name !== null && contact.name !== undefined) {
			this.name = contact.name;
		}
		if (contact.surname !== null && contact.surname !== undefined) {
			this.surname = contact.surname;
		}
		if (contact.email !== null && contact.email !== undefined) {
			this.email = contact.email;
		}

		this.save(function(err, result) {
			if (err) {
				errback(err);
			} else {
				callback(result)
			}
		});
	}

	app.db.data.model('contact', ContactSchema);
	app.db.data.contactSchema = ContactSchema;

};