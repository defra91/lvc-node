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

			$scope.newContactPage = function() {

				$location.path('/admin/contacts/new');
			};

			$scope.createContact = function() {

				if ($scope.contactFormData) {

					if ($scope.contactFormData.email.lenght <= 0) {
						// TODO error
						return;
					}
					if ($scope.contactFormData.name.lenght <= 0) {
						// TODO error
						return;
					}
					if ($scope.contactFormData.surname.lenght <= 0) {
						// TODO error
						return;
					}

					var newContact = new ContactsService($scope.contactFormData);

					newContact.$save({},
						function success() {
							$location.path('/admin/contacts');
						},
						function error(err) {
							// TODO handle error
						}
					);

				}

			};

			$scope.contactListPage = function() {

				$location.path('/admin/contacts');
			};

		}]);