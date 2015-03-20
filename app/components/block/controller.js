var bulklistApp = angular.module('bulklistApp', []);

bulklistApp.controller('bulkListCtrl', function($scope, $http){
    $scope.bulks = [];
    var getBulksLink = 'http://db-estate.services.dev.vendelevas.dev3.pikweb.net/api/objects/?method=getBulkList&block_id=eabaeb9-9df2-2e6c-8476-c0ededf8503a&site=pikru&private_key=uXd3YY4!lptkarvQG8roywJW&format=json&domain=localhost%3A63342';

    // запрос списка
    $http.get(getBulksLink).success(function(data) {
        $scope.bulks = data;
    // массив с ценами
        var minpriceArray = [];

        for (i = 0; i < $scope.bulks.length; i++) {
            if($scope.bulks[i].minprice > 0) minpriceArray.push($scope.bulks[i].minprice) ;
        }

    // массив запись минимальной цены
       $scope.minprice = Math.min.apply(0,minpriceArray);
    });

    // показывать цену больше чем
    $scope.flatsWithPrice = function(prop, val){
        return function(item){
            return item[prop] > val;
        }
    };
    //фильтрация на тип недвиги
    $scope.realtyTypeFilter = {};
    $scope.setType = function(type) {
    	$scope.realtyTypeFilter.type = type
    };
    //проверка на активный фильтр
    $scope.isActive = function(type){
        return $scope.realtyTypeFilter.type == type;
    };

});

bulklistApp.controller('minpriceCtrl', function($scope){

});