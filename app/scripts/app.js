'use strict';

angular.module('services', ['ngResource']);
angular.module('controllers', ['services']);
angular.module('utils', ['services']);


angular.module('lvc', [
  'ngResource',
  'ngRoute',
  'controllers',
  'utils'
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
        controller: 'GalleryCtrl',
        templateUrl: 'partials/gallery',
        reloadOnSearch: false
      })
      .when('/news', {
        templateUrl: 'partials/news',
        reloadOnSearch: false
      })
      .when('/admin/contacts', {
        controller: 'ContactsCtrl',
        templateUrl: 'partials/contacts',
        reloadOnSearch: false
      })
      .when('/admin/contacts/new', {
        controller: 'ContactsCtrl',
        templateUrl: 'partials/newContact'
      })

      .otherwise({

        redirectTo: '/home'

      });

    $locationProvider.html5Mode(true);
  });
