'use strict';

exports.init = function(app) {
	require('./AppInjector').init(app);

	require('./Router').init(app);
}
