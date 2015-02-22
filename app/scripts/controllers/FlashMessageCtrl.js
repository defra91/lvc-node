'use strict';

angular.module('controllers')
	.controller('FlashMessageCtrl', ['$scope', "ErrorHandler", "FlashMessage",

	function ($scope, ErrorHandler, FlashMessage) {
		$scope.flushMessage = FlashMessage.flush;
	}
]);
