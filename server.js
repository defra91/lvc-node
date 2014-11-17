'use strict';

var lib = require("./lib");

var env = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config')[env];

lib.start(config);
