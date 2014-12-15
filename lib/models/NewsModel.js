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

		news.save(function(err) {
			if (err) {
				errback(err);
			} else {
				callback();
			}
		})
	};

	/*
	* Get all news items from database
	*/
	NewsSchema.statics.findAll = function(callback, errback) {
		this.find({}, function(err, result) {
			if (err) {
				errback(err);
			} else {
				var r = [];
				for(var i=0; i<result.length; i++) {
					console.log(i);
					var obj = {
						_id: result[i]._id,
						title: result[i].title,
						body: result[i].body,
						datetime: result[i].datetime
					};
					r.push(obj);
				}
				callback(r);
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
		this.findOne({_id: _id},
			function success(err, news) {
				if (err) {
					errback(err);
				} else {
					var r = {
						_id: news._id,
						title: news.title,
						body: news.body,
						datetime: news.datetime
					};
					callback(r);
				}
			}	
		);
	};


	/*
	* Find item by id and remove
	*/
	NewsSchema.statics.findByIdAndRemove = function(_id, callback, errback) {
		this.findOne({_id: _id},
			function success(err, result) {
				if (err) {
					errback(err);
				} else {
					result.remove(function(err, result) {
						if (err) {
							errback(err);
						} else {
							callback(result);
						}
					});
				}
			}
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

	/*
	* Find news by id and get cover image
	*/ 
	NewsSchema.statics.findByIdAndGetImage = function(_id, callback, errback) {
		this.findOne({_id: _id}, function(err, news) {
			if (err) {
				errback(err);
			} else {
				callback(news.img);
			}
		})
	}

	app.db.data.model('news', NewsSchema);
	app.db.data.newsSchema = NewsSchema;

};