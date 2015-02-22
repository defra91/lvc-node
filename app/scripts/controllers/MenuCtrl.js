'use strict';

angular.module('controllers')

	.controller('MenuCtrl', ['$scope', 
		
		function($scope) {

			$('.tab-content').hide() // hide all content

			$('.tab-content:first').show(); // show the first tab

			$('ul.tab-header li').click(function() {
				
			})

		}

	]);