'use strict';

angular.module('controllers')

	.controller('HomeCtrl', ['$scope',
		function($scope) {

			var position = new google.maps.LatLng(44.93956, 7.78015);

			var mapOptions = {
	            center: position,
	            zoom: 12,
	            mapTypeId: google.maps.MapTypeId.ROADMAP
	    	};
	    	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	    	var marker = new google.maps.Marker({
	    		position: position,
	    		map: map,
	    		title: 'Le Vecchie Credenze'
	    	});
   
		}
	]);