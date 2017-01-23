(function(){
  'use strict';
  var menuApp = angular.module('MenuApp');


  menuApp.component('categories', {
    templateUrl:'categories.html',
    bindings: {
      categories: '<'
    },
    controller: 'CategoryController'
  });

  menuApp.controller('CategoryController', CategoryController);

  //We dont need this controller.
  function CategoryController(){
    var $ctrl = this;
    console.log( "The category controller category is:", $ctrl);
  };
})();
