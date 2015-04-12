var bulklistControllers = angular.module('bulklistControllers', []);


bulklistControllers.controller('bulkListCtrl',['$scope', '$http', '$sce',
    function($scope, $http, $sce){

    var realtyObject = 'eabaeb9-9df2-2e6c-8476-c0ededf8503a';
    //02c34f4-cbbf-5d7c-92ee-79b38c0c0fe0 новокуркино
    //eabaeb9-9df2-2e6c-8476-c0ededf8503a левобережный
    //7ba415d-2a2d-b8b2-c523-bdb408b8c414 бунинский
    //6a9eaaf-12c0-21da-a643-8ceb3d10fc39 красная горка
    //c13e8bd-54c3-131e-0fe4-55156056f664 ярославский
    //c3c82ff-bb40-72f3-2a94-e5c8386233c2
    //e2cc96c-5028-b4ac-efc8-4df14dbb9449 centr2
    var getBulksLink = 'http://db-estate.services.dev.vendelevas.dev3.pikweb.net/api/objects/?method=getBulkList&block_id=' + realtyObject + '&site=pikru&private_key=uXd3YY4!lptkarvQG8roywJW&format=json&domain=localhost%3A63342';
    var getOfficeLink = 'http://offices.services.dev.vendelevas.dev3.pikweb.net/api/offices/index?locations=all&domain=localhost%3A63342&private_key=uXd3YY4!lptkarvQG8roywJW&format=json';
    var getBlockLink = 'http://db-estate.services.dev.vendelevas.dev3.pikweb.net/api/objects/?method=getBlock&block_id='+ realtyObject +'&domain=localhost%3A63342&private_key=uXd3YY4!lptkarvQG8roywJW&format=json';

    $scope.bulks = null;
    $scope.block = null;
    $scope.offices = null;

    // запрос офисов
    if (!$scope.offices) {
        $http.get(getOfficeLink).success(function(data) {
            $scope.offices = data;

            //заглушка для картинки офисов
            for (var i in $scope.offices) {
                $scope.offices[i]['photo'] = 'http://offices.cdn.pik-service.ru/attachment/0/49/lbg_7c628ae5ff307fdb621d53bd24479009.jpg';
            }
        });
    }

    // запрос Района
    if (!$scope.block) $http.get(getBlockLink).success(function(data) {$scope.block = data});

    // запрос списка Корпусов
    $http.get(getBulksLink).success(function(data) {
        $scope.bulks = data;

    //объект с ценами

        $scope.minimums = {
            minPriceFlats: null,
            minPriceFlats1: null,
            minPriceFlats2: null,
            minPriceFlats3: null,
            minPriceFlats4: null,
            minPriceFlatsSP: null,
            minPriceCommercial: null,
            minPriceCars: null
        };
    //объект для проверки на наличие определенного типа недвижимости для ng-if
        $scope.realtyType = {
            flats: null,
            commercial: null,
            cottages:null,
            cars: null
        };

       // объект с уникальными офисами
         $scope.unicOffices = {};

        for (var i = 0, len = $scope.bulks.length; i < len; i++) {

            //Заглушка, пока у Артема сломались картинки
            $scope.bulks[i].preview = 'http://2.db-estate.cdn.pik-service.ru/attachment_pikru/0/972FC13E-DC93-E311-8208-001EC9D56418/kope_parus_006_800x600_15aae06b60d7d6da6ac1c2c7940_be3fe44d6f5179f3caba5cee47b4fe57_0x200.jpg';

            //наполняем объект с уникальными офисами
            if ($scope.bulks[i].office) $scope.unicOffices[$scope.bulks[i].office] = $scope.offices[$scope.bulks[i].office];

            // объект для проверки на наличие определенного типа недвижимости в кнопках для ng-if
            if($scope.bulks[i].type == 100000000 && $scope.bulks[i].minprice != 0) $scope.realtyType.flats = true;
            if($scope.bulks[i].type == 100000003 && $scope.bulks[i].minprice != 0) $scope.realtyType.commercial = true;
            if($scope.bulks[i].type == 100000004 && $scope.bulks[i].minprice != 0) $scope.realtyType.cars = true;

            // кастомная сортировка
            if($scope.bulks[i].minprice == 0) $scope.bulks[i].sort_inner = -100000;
            if($scope.bulks[i].sale_status == 100000003) $scope.bulks[i].sort_inner = -100000000;

            //Выборка минимальных цен в новый объект
            if($scope.bulks[i].type == 100000000 && ($scope.bulks[i].minprice != 0 && (!$scope.minimums.minPriceFlats
                || $scope.minimums.minPriceFlats > $scope.bulks[i].minprice))) {
                $scope.minimums.minPriceFlats = $scope.bulks[i].minprice;
            }

            if($scope.bulks[i].type == 100000000 && ($scope.bulks[i].minprice_1 && (!$scope.minimums.minPriceFlats1
                || $scope.minimums.minPriceFlats1 > $scope.bulks[i].minprice_1))) {
                $scope.minimums.minPriceFlats1 = $scope.bulks[i].minprice_1;
            }

            if($scope.bulks[i].minprice_2 && (!$scope.minimums.minPriceFlats2
                || $scope.minimums.minPriceFlats2 > $scope.bulks[i].minprice_2)) {
                $scope.minimums.minPriceFlats2 = $scope.bulks[i].minprice_2;
            }
            if($scope.bulks[i].minprice_3 && (!$scope.minimums.minPriceFlats3
                || $scope.minimums.minPriceFlats3 > $scope.bulks[i].minprice_3)) {
                $scope.minimums.minPriceFlats3 = $scope.bulks[i].minprice_3;
            }
            if($scope.bulks[i].minprice_4 && (!$scope.minimums.minPriceFlats4
                || $scope.minimums.minPriceFlats4 > $scope.bulks[i].minprice_4)) {
                $scope.minimums.minPriceFlats4 = $scope.bulks[i].minprice_4;
            }
            if($scope.bulks[i].type == 100000003 && ($scope.bulks[i].minprice != 0 && (!$scope.minimums.minPriceCommercial
                || $scope.minimums.minPriceCommercial > $scope.bulks[i].minprice))) {
                $scope.minimums.minPriceCommercial = $scope.bulks[i].minprice;
            }
            if($scope.bulks[i].type == 100000004 && ($scope.bulks[i].minprice != 0 && (!$scope.minimums.minPriceCars
                || $scope.minimums.minPriceCars > $scope.bulks[i].minprice))) {
                $scope.minimums.minPriceCars = $scope.bulks[i].minprice;
            }

            //быдлорешение вывода иконок. Позже создать директиву для этого

            if (!$scope.bulks[i].interior) {
                $scope.bulks[i].interiorIco = 'http://www.pik.ru/images/realty/icons/decore_off.png';
                $scope.bulks[i].interiorTxt = 'Нет отделки';
            } else {
                $scope.bulks[i].interiorIco = 'http://www.pik.ru/images/realty/icons/decore_on.png';
                $scope.bulks[i].interiorTxt = 'Есть отделка';
            }

            if (!$scope.bulks[i].ipoteka) {
                $scope.bulks[i].ipotekaIco = 'http://www.pik.ru/images/realty/icons/hypotec_off.png';
                $scope.bulks[i].ipotekaTxt = 'Нет ипотеки';

            } else {
                $scope.bulks[i].ipotekaIco = 'http://www.pik.ru/images/realty/icons/hypotec_on.png';
                $scope.bulks[i].ipotekaTxt = 'Есть ипотека';
            }

            if (!$scope.bulks[i].discount) {
                $scope.bulks[i].discountIco = 'http://www.pik.ru/images/realty/icons/action_off.png';
                $scope.bulks[i].discountTxt = 'Нет акции';
            } else {
                $scope.bulks[i].discountIco = 'http://www.pik.ru/images/realty/icons/action_on.png';
                $scope.bulks[i].discountTxt = 'Есть акция';
            }

            if (!$scope.bulks[i].payment) {
                $scope.bulks[i].paymentIco = 'http://www.pik.ru/images/realty/icons/clock_off.png';
                $scope.bulks[i].paymentTxt = 'Нет рассрочки';
            } else {
                $scope.bulks[i].paymentIco = 'http://www.pik.ru/images/realty/icons/clock_on.png';
                $scope.bulks[i].paymentTxt = 'Есть рассрочка';
            }

            switch ($scope.bulks[i].building_status) {
                case '100000000':
                    $scope.bulks[i].building_statusIco = 'http://yaroslavl.pik.ru/images/realty/icons/plan.png';
                    $scope.bulks[i].building_statusTxt = 'Не идет строительство';
                    break;
                case '100000001':
                    $scope.bulks[i].building_statusIco = 'http://yaroslavl.pik.ru/images/realty/icons/underConstruction.png';
                    $scope.bulks[i].building_statusTxt = 'Идет строительство';
                    break;
                case '100000002':
                    $scope.bulks[i].building_statusIco = 'http://yaroslavl.pik.ru/images/realty/icons/occupy.png';
                    $scope.bulks[i].building_statusTxt = 'Заселение';
                    break;
                case '100000003':
                    $scope.bulks[i].building_statusIco = 'http://www.pik.ru/images/realty/icons/built.png';
                    $scope.bulks[i].building_statusTxt = 'Дом построен';
                    break;
            }

            if (!$scope.bulks[i].parking) {
                $scope.bulks[i].ParkingIco = 'http://www.pik.ru/images/realty/icons/cars_off.png';
                $scope.bulks[i].ParkingTxt = 'Нет машиномест';
            } else {
                $scope.bulks[i].ParkingIco = 'http://www.pik.ru/images/realty/icons/cars_on.png';
                $scope.bulks[i].ParkingTxt = 'Есть машиноместа';
            }
        }
        console.log($scope.unicOffices);
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
    	$scope.realtyTypeFilter.type = type;
    };

    //проверка на активный фильтр типа недвиги
    $scope.isActive = function(type){
        return $scope.realtyTypeFilter.type == type;
    };

    //показывать только в реализации и в планах
    $scope.filterSaleStatus = function(bulk) {
         return (bulk.sale_status == 100000001 || bulk.sale_status == 100000003);
    };

    //вывод HTML
    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
    //Вывод цен
    $scope.printCost = function(bulk){
        if (bulk.sale_status == 100000003) return "В планах";
        if (bulk.minprice == 0) {
            return "Нет в наличии";
        } else {
            return "от " + bulk.minprice + ' руб.';
        }

    };

}]);
