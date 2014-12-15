'use strict';

angular.module('controllers')
	.controller('ContactsCtrl', ['$scope', '$routeParams', '$location', 'ContactsService', 'FlashMessage', 'ErrorHandler',

		function($scope, $routeParams, $location, ContactsService, FlashMessage, ErrorHandler) {

			ContactsService.query(

				function success(data) {
					$scope.contacts = data
				},
				function err(error) {
					// TODO
				}
			);

			$scope.emailError = false;
			$scope.nameError = false;
			$scope.surnameError = false;

			$scope.newContactPage = function() {

				$location.path('/admin/contacts/new');
			};

			$scope.createContact = function() {

				if ($scope.contactFormData) {

					if ($scope.contactFormData.email.lenght <= 0) {
						FlashMessage.set({type: "danger", title: "Email richiesta", message: "Devi inserire obbligatoriamente il campo email"});
						return;
					}
					if ($scope.contactFormData.name.lenght <= 0) {
						FlashMessage.set({type: "danger", title: "Nome richiesta", message: "Devi inserire obbligatoriamente il campo nome"});
						return;
					}
					if ($scope.contactFormData.surname.lenght <= 0) {
						FlashMessage.set({type: "danger", title: "Email richiesta", message: "Devi inserire obbligatoriamente il campo cognome"});
						return;
					}

					var newContact = new ContactsService($scope.contactFormData);

					newContact.$save({},
						function success() {
							$location.path('/admin/contacts');
							FlashMessage.future({
								type: 'success',
								title: "Contatto aggiunto con successo",
								message: "Il contatto " + $scope.contactFormData.name + " " + $scope.contactFormData.surname + " è stato aggiunto correttamente"
							});
						},
						function error(err) {
							$scope.emailError = true;
						}
					);

				}

			};

			$scope.contactListPage = function() {

				$location.path('/admin/contacts');
			};

		}]);