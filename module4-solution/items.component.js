(function (){
'use strict';
  var menuApp = angular.module('MenuApp');
  menuApp.component('items', {
    bindings:{
      menuItems: '<'
    },
    templateUrl: 'items.template.html',
    controller: 'ItemsDisplayController'
  });

  menuApp.controller('ItemsDisplayController', ItemsDisplayController);
  //We dont neeed this controller.
  function ItemsDisplayController(){
    var $ctrl = this;
    console.log('Inside items display controller..', $ctrl);
  }
})();
