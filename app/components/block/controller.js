'use strict';

/* Controllers */

var bulklistApp = angular.module('bulklistApp', []);

bulklistApp.controller('bulkListCtrl', function($scope, $http){
    var getBulksLink = 'http://db-estate.services.dev.vendelevas.dev3.pikweb.net/api/objects/?method=getBulkList&block_id=eabaeb9-9df2-2e6c-8476-c0ededf8503a&site=pikru&private_key=uXd3YY4!lptkarvQG8roywJW&format=json&domain=localhost%3A63342';
    $http.get(getBulksLink).success(function(data) {
        $scope.bulks = data;
    });
    $scope.flatsWithPrice = function(prop, val){
        return function(item){
            return item[prop] > val;
        }
    };
});

