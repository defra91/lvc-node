'use strict';

var CustomError = require('../../utils/CustomError');

exports.handler = function(err, req, res, next) {

	if (err instanceof CustomError) {
		res.json(500, err.toDict());
	} else {
		console.error("ErrorHandler received an error that is not a MaapError", err);
		res.json(500, new CustomError(err));
	}
};