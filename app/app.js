'use strict';

/* App Module */


var bulklistApp = angular.module('bulklistApp', [
    'ngRoute',
    'bulklistControllers'
]);


bulklistApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/bulklist', {
                templateUrl: 'app/components/block/blocklist/bulklist.html',
                controller: 'bulkListCtrl'
            }).
            when('/map', {
                templateUrl: 'app/components/block/map/map.html',
                controller: 'bulkListCtrl'
            }).
            when('/news', {
                templateUrl: 'app/components/block/news/news.html',
                controller: 'bulkListCtrl'
            }).
            when('/gallery', {
                templateUrl: 'app/components/block/gallery/gallery.html',
                controller: 'bulkListCtrl'
            }).
            when('/docs', {
                templateUrl: 'app/components/block/docs/docs.html',
                controller: 'bulkListCtrl'
            }).
            when('/inner-contacts', {
                templateUrl: 'app/components/block/inner-contacts/inner-contacts.html',
                controller: 'bulkListCtrl'
            }).
            otherwise({
                redirectTo: '/bulklist'
            });
    }]);
