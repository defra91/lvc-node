'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

exports.init = function(app) {

	var NewsSchema = new Schema({
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true
		},
		datetime: {
			type: Date,
			default: Date.now
		},
		img: {
			data: Buffer,
			contentType: String
		}
	});

	/* 
	* Register a new news on database
	*/
	NewsSchema.statics.createNews = function(newNews, callback, errback) {
		var news = new this({
			title:    newNews.title,
			body:     newNews.body,
			datetime: newNews.datetime,
			img:    newNews.img
		});

		this.register(news, function(err, result) {
			if (err) {
				// TODO
			} else {
				callback(result);
			}
		});
	};

	/*
	* Get all news items from database
	*/
	NewsSchema.statics.findAll = function(callback, errback) {
		this.find({}, function(err, result) {
			if (err) {
				// TODO
			} else {
				callback(result);
			}
		});
	};

	/*
	* Count all items
	*/
	NewsSchema.statics.countAll = function(callback, errback) {
		this.count({}, function(err, result) {
			if (err) {
				// TODO
			} else {
				callback(result);
			}
		});
	};

	/*
	* Find item by id
	*/
	NewsSchema.statics.findById = function(_id, callback, errback) {
		this.findById(id, function(err, result) {
			if (err) {
				// TODO
			} else {
				if (result) {
					callback(result);
				} else {
					// TODO
				}
			}
		});
	};


	/*
	* Find item by id and remove
	*/
	NewsSchema.statics.findByIdAndRemove = function(_id, callback, errback) {
		this.safeFindById(_id,
			function success(result) {
				result.remove(function(err, result) {
					if (err) {
						// TODO
					} else {
						callback(result);
					}
				});
			},
			errback
		);
	};

	/*
	* Update item
	*/
	NewsSchema.methods.updateNews = function(news, callback, errback) {
		this.title = news.title;
		this.body = news.body;
		this.datetime = news.datetime;
		this.cover = news.cover;

		this.save(function(err, result) {
			if (err) {

			} else {
				callback(result);
			}
		});
	};

	app.db.data.model('news', NewsSchema);
	app.db.data.newsSchema = NewsSchema;

};