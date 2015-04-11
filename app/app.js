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
                templateUrl: 'app/components/block/bulklist/bulklist.html',
                controller: 'bulkListCtrl',
                activetab: 'bulklist'
            }).
            when('/map', {
                templateUrl: 'app/components/block/map/map.html',
                controller: 'bulkListCtrl',
                activetab: 'map'
            }).
            when('/news', {
                templateUrl: 'app/components/block/news/news.html',
                controller: 'bulkListCtrl',
                activetab: 'news'
            }).
            when('/gallery', {
                templateUrl: 'app/components/block/gallery/gallery.html',
                controller: 'bulkListCtrl',
                activetab: 'gallery'
            }).
            when('/docs', {
                templateUrl: 'app/components/block/docs/docs.html',
                controller: 'bulkListCtrl',
                activetab: 'docs'
            }).
            when('/inner-contacts', {
                templateUrl: 'app/components/block/inner-contacts/inner-contacts.html',
                controller: 'bulkListCtrl',
                activetab: 'inner-contacts'
            }).
            otherwise({
                redirectTo: '/bulklist'
            });
    }]);

bulklistApp.controller('activeTabCTRL', function($scope, $location){
    $scope.isActiveTab = function(route) {
        return route === $location.path();
    };
});