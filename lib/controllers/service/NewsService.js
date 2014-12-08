'use strict';

var formidable = require('formidable');

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

	News.findById(req.params.id,
		function success(result) {
			res.json(result);
		},
		function error(err) {
			next(err);
		}
	);
};

exports.createNews = function(req, res, next) {

	var form = new formidable.IncomingForm();

	form.uploadDir = "./tmp/";
	form.keepExtension = true;

	form.parse(req, function(err, fields, files) {
		res.writeHead(200, {'content-type': 'text/plain'});
		res.write("Received upload");

		console.log("file size: " + JSON.stringify(files.fileUploaded.size));
        console.log("file path: " + JSON.stringify(files.fileUploaded.path));
        console.log("file name: " + JSON.stringify(files.fileUploaded.name));
        console.log("file type: " + JSON.stringify(files.fileUploaded.type));
        console.log("astModifiedDate: " + JSON.stringify(files.fileUploaded.lastModifiedDate));

        var News = req.app.db.data.model('news');

        var newsObj = {
        	title: req.body.title,
        	body: req.body.body,
        	img: {
        		data: files.fileUploaded.path,
        		contentType: 'image/*'
        	},
        	datetime: req.body.datetime
        };

        News.createNews(newsObj,
        	function success(result) {

        	},
        	function error(err) {

        	}
        );
        
        res.end();
	});

};