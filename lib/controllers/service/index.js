'use strict';

exports.getGalleryService = function(app) {
	return require("./GalleryService");
};

exports.getNewsService = function(app) {
	return require('./NewsService');
};

exports.getContactService = function(app) {
	return require('./ContactService');
};

exports.getAdminService = function(app) {
	return require('./AdminService');
};