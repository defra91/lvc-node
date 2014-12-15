'use strict';

angular.module('controllers')
	.controller('ContactsCtrl', ['$scope', '$routeParams', '$location', 'ContactsService',

		function($scope, $routeParams, $location, ContactsService) {

			ContactsService.query(

				function success(data) {
					$scope.contacts = data
				},
				function err(error) {
					// TODO
				}
			);

		}]);