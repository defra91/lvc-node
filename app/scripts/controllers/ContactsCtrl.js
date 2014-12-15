'use strict';

angular.module('controllers')
	.controller('ContactsCtrl', ['$scope', '$routeParams', '$location', 'ContactsService', 'FlashMessage', 'ErrorHandler', 'ModalService',

		function($scope, $routeParams, $location, ContactsService, FlashMessage, ErrorHandler, ModalService) {

			ContactsService.query(

				function success(data) {
					$scope.contacts = data
				},
				function err(error) {
					// TODO
				}
			);

			$scope.emailError = {
				status: false,
				message: ""
			};

			$scope.nameError = {
				status: false,
				message: ""
			};

			$scope.surnameError = {
				status: false,
				message: ""
			};

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
							if (err.data.title === "MongoError" && err.data.code === 11000) {
								$scope.emailError.status = true;
								$scope.emailError.message = "Email già esistente"
							}
						}
					);

				}

			};

			$scope.contactListPage = function() {

				$location.path('/admin/contacts');
			};

			$scope.resetFields = function() {

				$scope.nameError.status = false;
				$scope.nameError.message = "";

				$scope.surnameError.status = false;
				$scope.surnameError.message = "";

				$scope.emailError.status = false;
				$scope.emailError.message = "";
			};

			ModalService.showModal({
				templateUrl: '../../views/contactsModal.html',
				controller: 'ModalCtrl'
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					console.log(result);
				});
			});

		}]);