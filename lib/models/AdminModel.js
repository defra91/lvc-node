'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.init = function(app) {

	var AdminSchema = new Schema({
		email: {
			type: String,
			required: true,
			index: { unique: true},
			validate: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/
		},
		password: {
			type: String,
			required: true
		}
	});

	AdminSchema.statics.createAdmin = function(newAdmin, callback, errback) {

		var admin = new this({
			email: newAdmin.email
		});

		this.register(admin, newAdmin.password, function(err, result) {
			if (err) {
				errback(err);
			} else {
				callback(result);
			}
		});
	};

	AdminSchema.statics.findAll = function(callback, errback) {
		this.find({}, function(err, result) {
			if (err) {
				errback(err);
			} else {
				callback(result);
			}
		});
	};

	AdminSchema.statics.findByIdAndRemove = function(_id, callback, errback) {
		this.findById(_id, function(err, result) {
			if (err) {
				errback(err);
			} else {
				result.remove(function (err, result) {
					if  (err) {
						errback(err);
					} else {
						callback(result);
					}
				});
			}
		});
	};

	app.db.data.model('admin', AdminSchema);
	app.db.data.adminSchema = AdminSchema;

};