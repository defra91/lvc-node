'use strict';

angular.module('controllers')
	.controller('FlashMessageCtrl', ['$scope', "FlashMessage",

	function ($scope, FlashMessage) {
		$scope.flushMessage = FlashMessage.flush;
	}
]);
