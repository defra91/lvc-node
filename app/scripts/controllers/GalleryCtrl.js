'use strict'

angular.module('controllers')
	.controller('GalleryCtrl', ["$scope", "$routeParams", "$location", "GalleryService",

		function($scope, $routeParams, $location, GalleryService) {

			GalleryService.query(

			function success(data) {
				$scope.images = data;
			},
			function err(error) {
				// TODO
			});
		}
	]);
