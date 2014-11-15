'use strict';

angular.module('lvc', [
  'ngResource',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider

      .when('/home', {

        templateUrl: 'partials/home',
        reloadOnSearch: false

      })
      .when('/', {
      	redirectTo: '/home'
      })

      .otherwise({

        redirectTo: '/home'

      });

    $locationProvider.html5Mode(true);
  });
