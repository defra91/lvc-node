'use strict';

angular.module('services')
	.factory('ContactsListService', ['$resource',

		function($resource) {
			return $resource('api/contacts', {}, {
				'query': { method: 'GET', isArray: true},
				'save': { method: 'POST'}
			});
		}]);