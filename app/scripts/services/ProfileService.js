'use strict';

angular.module('services')
	.factory('ProfileService', ['$resource',
		function($resource) {

			return $resource('/profile', {}, {
				'get': { method: 'GET' },
				'update': { method: 'PUT' },
				'login': { method: 'POST' },
				'logout': { method: 'DELETE' }
			});
	}]);