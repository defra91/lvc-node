'use strict';

angular.module('services')
	.factory('GalleryService', ["$resource",

		function($resource) {
			return $resource('api/gallery/', {}, {
				'query': { method: 'GET' }
			});

		}
	]
);
