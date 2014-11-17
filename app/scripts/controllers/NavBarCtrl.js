'use strict';

angular.module('controllers')
	.controller('NavBarCtrl', ['$scope', '$location', '$route',

		function ($scope, $location, $route) {

			$scope.isActive = function(viewLocation) {
				if (viewLocation === $location.path()) {
					return true;
				}
			}

		}
]);
