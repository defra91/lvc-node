'use strict';

angular.module('services')
	.factory('ContactsService', ['$resource', 

		function($resouce) {
			return $resouce('api/contacts/:id', {}, {

				'get': { method: 'GET' },
				'remove': { method: 'DELETE' },
				'update': { method: 'PUT' }

			});
}]);