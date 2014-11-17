'use strict';

var fs = require('fs');

exports.getImages = function(req, res, next) {

	console.log(req.app.config.webServer.galleryDir);
	fs.readdir(
		req.app.config.webServer.galleryDir.standardDir,
		function (err, images) {
			if (err) {
				console.error("No directory found");
				return;
			}

			var onlyFiles = [];

			var path = req.app.config.webServer.galleryDir.standardDir + "/";

			(function iterator(index) {
				if (index == images.length) {
					var obj = {
						standardDir: req.app.config.webServer.galleryDir.standardDir,
						thumbDir: req.app.config.webServer.galleryDir.thumbDir,
						photos: onlyFiles
					};
					res.json(obj);
					return;
				}

				fs.stat(
					path + images[index],
					function(err, stats) {
						if (err) {
							console.error("File error");
							// TODO
							return;
						}

						if (stats.isFile()) {
							var obj = {
								filename: images[index],
								desc: images[index]
							};
							onlyFiles.push(obj);
						}
						iterator(index + 1);
					}
				);
			})(0);

		}
	);

}
