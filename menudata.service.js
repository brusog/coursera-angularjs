(function(){
  'use strict';
  var data = angular.module('data');
  data.constant('baseUrl', 'https://davids-restaurant.herokuapp.com');
  data.service('MenuDataService', MenuDataService);
  MenuDataService.$inject=['$http', 'baseUrl'];

  function MenuDataService($http, baseUrl){
    var menuSvc = this;
    menuSvc.getAllCategories = function (){
      return $http({
        method: 'GET',
        url:baseUrl + '/categories.json'
      });
    };

    menuSvc.getItemsForCategory = function (categoryShortName){
      return $http({
        method: 'GET',
        params: {
          category: categoryShortName
        },
        url: baseUrl + '/menu_items.json'
      });
    };
  };
})();
