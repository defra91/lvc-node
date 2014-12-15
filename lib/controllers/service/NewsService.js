'use strict';

var fs = require('fs');

/* Get all news in database */
exports.newsList = function(req, res, next) {
	var News = req.app.db.data.model('news');

	News.findAll(
		function success(result) {
			News.countAll(
				function success(cnt) {
					var response = {
						count: cnt,
						news: result
					};
					res.json(response);
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

exports.findById = function(req, res, next) {
	var News = req.app.db.data.model('news');

	News.findById(req.params.newsId,
		function success(result) {
			res.json(result);
		},
		function error(err) {
			next(err);
		}
	);
};

exports.createNews = function(req, res, next) {

	var News = req.app.db.data.model('news');

	console.log(req.files);
	var property = 'content-type';

    var newsObj = {
    	title: req.body.title,
    	body: req.body.body,
    	img: {
    		data: fs.readFileSync(req.files.img.path),
    		contentType: req.files.img.headers[property]
    	}
    };

    News.createNews(newsObj,
    	function success() {
    		res.end();
    	},
    	function error(err) {
    		next(err);
    	}
    );

};

exports.getNewsImage = function(req, res, next) {

	var News = req.app.db.data.model('news');

	News.findByIdAndGetImage(req.params.newsId,
		function success(img) {
			res.contentType(img.contentType);
			res.end(img.data, 'binary');
		},
		function error(err) {
			next(err);
		}
	);
};

exports.deleteNewsById = function(req, res, next) {

	var News = req.app.db.data.model('news');

	News.findByIdAndRemove(req.params.newsId,
		function success(result) {
			res.end();
		},
		function error(err) {
			next(err);
		}
	);
};