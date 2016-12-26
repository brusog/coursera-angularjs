(function() {
    'use strict';

    var app = angular.module('myFirstApp', []);
    app.controller('LunchController', lunchController);
    lunchController.inject = ['$scope'];

    function lunchController($scope) {
        $scope.lunchItems = "";
        $scope.verdict = "";
        $scope.checkIfTooMuch = function() {
            var lunchItemsCount = getCountOfLunchItems($scope.lunchItems);
            if (lunchItemsCount === 0) {
                $scope.verdict = "";
            } else if (lunchItemsCount <= 3) {
                $scope.verdict = "Enjoy";
            } else {
                $scope.verdict = "Too Much";
            }
        };

    };

    function getCountOfLunchItems(lunchItems) {
        var arrayOfLunchItems = lunchItems.split(",");
        var numberOfItems = 0;
        for (var i = 0; i < arrayOfLunchItems.length; i++) {
            var lunchItem = arrayOfLunchItems[i].trim();
            if (lunchItem.length > 0 ) {
                numberOfItems++;
            }
        }
        return numberOfItems;
    };


})();
