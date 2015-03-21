var bulklistApp = angular.module('bulklistApp', []);

bulklistApp.controller('bulkListCtrl', function($scope, $http){
    $scope.bulks = [];
    var getBulksLink = 'http://db-estate.services.dev.vendelevas.dev3.pikweb.net/api/objects/?method=getBulkList&block_id=eabaeb9-9df2-2e6c-8476-c0ededf8503a&site=pikru&private_key=uXd3YY4!lptkarvQG8roywJW&format=json&domain=localhost%3A63342';

    // запрос списка
    $http.get(getBulksLink).success(function(data) {
        $scope.bulks = data;
    // массив с ценами

        $scope.minimums = {
            minPriceFlats: null,
            minPriceFlats1: null,
            minPriceFlats2: null,
            minPriceFlats3: null,
            minPriceFlats4: null,
            minPriceFlatsSP: null,
            minPriceCommercial: null,
            minPriceCars: null
        }

        for (i = 0; i < $scope.bulks.length; i++) {
            if($scope.bulks[i].type == 100000000 && $scope.minimums.minPriceFlats === null && $scope.bulks[i].minprice != 0
                || $scope.bulks[i].type == 100000000 && $scope.bulks[i].minprice != 0 && $scope.minimums.minPriceFlats > $scope.bulks[i].minprice) {
                $scope.minimums.minPriceFlats = $scope.bulks[i].minprice;
            }
            if($scope.minimums.minPriceFlats1 === null && $scope.bulks[i].minprice_1 != undefined
                || $scope.bulks[i].minprice_1 != undefined && $scope.minimums.minPriceFlats1 > $scope.bulks[i].minprice_1) {
                $scope.minimums.minPriceFlats1 = $scope.bulks[i].minprice_1;
            }
            if($scope.minimums.minPriceFlats2 === null && $scope.bulks[i].minprice_2 != undefined
                || $scope.bulks[i].minprice_2 != undefined && $scope.minimums.minPriceFlats2 > $scope.bulks[i].minprice_2) {
                $scope.minimums.minPriceFlats2 = $scope.bulks[i].minprice_2;
            }
            if($scope.minimums.minPriceFlats3 === null && $scope.bulks[i].minprice_3 != undefined
                || $scope.bulks[i].minprice_3 != undefined && $scope.minimums.minPriceFlats3 > $scope.bulks[i].minprice_3) {
                $scope.minimums.minPriceFlats3 = $scope.bulks[i].minprice_3;
            }
            if($scope.minimums.minPriceFlats4 === null && $scope.bulks[i].minprice_4 != undefined
                || $scope.bulks[i].minprice_4 != undefined && $scope.minimums.minPriceFlats3 > $scope.bulks[i].minprice_4) {
                $scope.minimums.minPriceFlats4 = $scope.bulks[i].minprice_4;
            }
            if($scope.bulks[i].type == 100000003 && $scope.minimums.minPriceCommercial === null && $scope.bulks[i].minprice != 0
                || $scope.bulks[i].type == 100000003 && $scope.bulks[i].minprice != 0 && $scope.minimums.minPriceCommercial > $scope.bulks[i].minprice) {
                $scope.minimums.minPriceCommercial = $scope.bulks[i].minprice;
            }
            if($scope.bulks[i].type == 100000004 && $scope.minimums.minPriceCars === null && $scope.bulks[i].minprice != 0
                || $scope.bulks[i].type == 100000004 && $scope.bulks[i].minprice != 0 && $scope.minimums.minPriceCars > $scope.bulks[i].minprice) {
                $scope.minimums.minPriceCars = $scope.bulks[i].minprice;
            }

        }
        console.log($scope.minimums);
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