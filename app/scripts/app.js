'use strict';

angular.module('controllers', []);

angular.module('lvc', [
  'ngResource',
  'ngRoute',
  'controllers'
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
      .when('/gallery', {

        templateUrl: 'partials/gallery',
        reloadOnSearch: false
      })
      .when('/news', {
        templateUrl: 'partials/news',
        reloadOnSearch: false
      })

      .otherwise({

        redirectTo: '/home'

      });

    $locationProvider.html5Mode(true);
  });
