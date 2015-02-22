'use strict';

angular.module('controllers')
	
	.controller('AuthCtrl', ['$scope', '$routeParams', '$location', 'ProfileService'

		function($scope, $routeParams, $location, ProfileService) {

			$scope.userFormLogin = {
				email: '',
				password: ''
			};

			$scope.login = function() {

				if ($scope.userFormLogin) {

					var authUser = new ProfileService($scope.userFormLogin);
					authUser.$login({},
						function success(data) {
							
						}, function error(err) {
							// Handle error
						}
					);

				}

			};

		}
	]);