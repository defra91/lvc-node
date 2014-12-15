'use strict';

angular.module('controllers')
	.controller('ModalCtrl', ['$scope', "close",
		function($scope, close) {
			close("Success");
		});