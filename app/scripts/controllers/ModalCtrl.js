'use strict';

angular.module('controllers')
	.controller('ModalCtrl', ['$scope', "close",
		
		function($scope, close) {
			
			$scope.close = function(result) {
				close(result, 500);
			};
		}

	]);