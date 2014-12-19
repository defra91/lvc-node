'use strict';

var errorByCode = {
	1000: ["Login error", "Wrong username or password"]
};

var CustomError = function(error, message, details) {

	if (error instanceof Error) {
		console.error("CustomError received an Error instead of an error code:", error);
		this.code = error.code;
		this.title = error.name;
		this.message = error.message;
		this.details = error.stack;
	} else if (error instanceof CustomError) {
		console.error("CustomError received a CustomError instead of an error code:", error);
		this.code = error.code;
		this.title = error.title;
		this.message = error.message;
		this.details = error.details;
	} else if (error === parseInt(error)) {

		this.code = error;
		if (errorByCode[error] === undefined) {
			console.error("CustomError received an unknown error code:", error);
			this.title = "Unknown error";
			this.message = "Error number " + error;
		} else {
			var err = errorByCode[error];
			this.title = err[0];
			this.message = err[1];
		}
	} else {
		console.error("CustomError received a strange argument:", error);
		this.code = 0;
		this.title = "Unknown error";
		this.message = error;
	}

	if (message) {
		this.message = message;
	}
	if (details) {
		this.details = details;
	}

};

CustomError.prototype.toDict = function() {

	var dict = {
		title: this.title,
		code: this.code,
		message: this.message
	};
	if (this.details) {
		dict.details = this.details;
	}

	return dict;
};

CustomError.prototype.toString = function() {

	var str = "CustomError";
	str += " " + this.title;
	str += " [" + this.code + "]";
	str += ": " + this.message;
	if (this.details) {
		str += "\n" + this.details;
	}

	return str;
};

CustomError.prototype.toError = function() {
	return new Error(this.toString());
};

module.exports = CustomError;