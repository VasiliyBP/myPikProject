bulklistControllers.controller('maplist', ['$scope', '$http','$sce',
    function($scope,$http,$sce) {


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
        var getNewsLink = 'http://news.services.dev.vendelevas.dev3.pikweb.net/api/news?method=getNewsList&tags=pik.ru^realty&format=json&domain=localhost%3A63342&private_key=uXd3YY4!lptkarvQG8roywJW';

       // $scope.news = null;
        $scope.block = null;

       // if(!$scope.news)$http.get(getNewsLink).success(function(data) {$scope.news = data});

        if (!$scope.block) $http.get(getBlockLink).success(function(data) {

            $scope.block = data

            $scope.block.mapurl = 'http://0.db-estate.cdn.pik-service.ru/attachment_pikru/0/79f31948-c434-e311-8507-001ec9d5643c/map9_f66abf52d4896ababe45b9f8cf3f7ce8.jpg'

        });


        $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };


    }
]);