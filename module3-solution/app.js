(function () {
    'use strict';
    var app = angular.module('NarrowItDownApp',[]);
    app.controller('NarrowItDownController', NarrowItDownController);
    app.constant('baseUrl', 'https://davids-restaurant.herokuapp.com');
    app.service( 'MenuSearchService', MenuSearchService);
    app.directive('foundItems', FoundItemsDirective);
    app.controller('FoundItemsController', FoundItemsController);
    function FoundItemsDirective(){
        var ddo = {
            templateUrl:'lunch-items.html',
            restrict: 'E',
            scope: {
                found: '=',
                onRemove: '&'
            },
            controller: 'FoundItemsController',
            controllerAs: 'fndItmsCtrlr',
            bindToController: true
        };

        return ddo;
    }
    function FoundItemsController (){
        var fndItmsCtrlr = this;
        console.log( fndItmsCtrlr);
    }
    NarrowItDownController.$inject =['$q', 'MenuSearchService'];

    function NarrowItDownController($q,MenuSearchService ){
        var nidCtrlr = this;
        nidCtrlr.itemToSearchFor ="";
        nidCtrlr.errorMessage ="";
        nidCtrlr.listItems = [];
        nidCtrlr.remove = function ( index){
            console.log("Removing index" , index);
            nidCtrlr.listItems.splice(index, 1);
        };
        nidCtrlr.search = function (){
            if( nidCtrlr.itemToSearchFor.trim().length <= 0)
            {
                nidCtrlr.errorMessage ="You need to enter some text";
                return;
            }
            nidCtrlr.errorMessage ="Searching for lunch items with description -" + nidCtrlr.itemToSearchFor;
            var promise = MenuSearchService.getMatchedMenuItems(nidCtrlr.itemToSearchFor);
            promise.then(function (foundItems){
                nidCtrlr.listItems = foundItems;
                console.log("Found items..", foundItems);
                if( foundItems.length <= 0)
                {
                  nidCtrlr.errorMessage ="No lunch item has a description of: "+nidCtrlr.itemToSearchFor ;
                }
                else
                {
                 nidCtrlr.errorMessage ="Found " + foundItems.length + " items matching:"+ nidCtrlr.itemToSearchFor;
                }
            }, function (error){
                nidCtrlr.errorMessage ="Something went wrong";
            });
        };
    }
    MenuSearchService.$inject=['baseUrl','$http', '$q'];

    function MenuSearchService(baseUrl, $http, $q){
        var srchSvc = this;
        srchSvc.getMatchedMenuItems = function (searchTerm){
            var promise = $http({
                method:'GET',
                url: baseUrl+ '/menu_items.json'
            });

            var deferred = $q.defer();
            promise.then(function (response){
                var data = response.data.menu_items;
                var foundItems = [];
                data.forEach( function (menuItem){
                    var desc = menuItem.description.toLowerCase();
                    if( desc.indexOf(searchTerm.toLowerCase()) !== -1)
                    {
                        foundItems.push(menuItem);
                    }
                });
                deferred.resolve( foundItems);
            }, function (error){
                deferred.reject( error);
            });
            return deferred.promise;
        };
    }

})();
