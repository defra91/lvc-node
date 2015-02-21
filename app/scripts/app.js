'use strict';

angular.module('services', ['ngResource']);
angular.module('controllers', ['services', 'angularModalService']);
angular.module('utils', ['services']);


angular.module('lvc', [
  'ngResource',
  'ngRoute',
  'controllers',
  'utils',
  'angularModalService',
  'ui.bootstrap',
  'angularUtils.directives.dirPagination'
])
  .config(function ($routeProvider, $locationProvider, paginationTemplateProvider) {

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
      .when('/admin/login', {
        templateUrl: 'partials/login',
        reloadOnSearch: false,
        controller: 'AuthCtrl'
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

    paginationTemplateProvider.setPath('views/dirPagination.tpl.html');

  });
