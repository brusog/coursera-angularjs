(function (){
  'use strict';
  var publicModule = angular.module('public');
  publicModule.controller('SignUpController', SignUpController);

  SignUpController.$inject=['MenuService', 'SignUpService'];
  function SignUpController(MenuService,SignUpService ){
    var signupCtrl = this;


    signupCtrl.firstName = '';
    signupCtrl.lastName = '';
    signupCtrl.email= '';
    signupCtrl.phone = '';
    signupCtrl.favoriteMenu='';

    signupCtrl.menuItemNotFoundMessage ='';

    signupCtrl.signUpSuccessMsg = '';
    signupCtrl.signUp = function (){
      console.log('sign up function.');
      var menuItemPromise= MenuService.getMenuItemWithShortName(signupCtrl.favoriteMenu)
      menuItemPromise.then(
        function ( response){
          console.log( response.data);
          signupCtrl.menuItemNotFoundMessage ='';
          signupCtrl.signUpSuccessMsg = 'Your info is saved succesfully.';
          SignUpService.signUp({
            "firstName" : signupCtrl.firstName,
            "lastName": signupCtrl.lastName,
            "email": signupCtrl.email,
            "phone": signupCtrl.phone,
            "favoriteMenu":signupCtrl.favoriteMenu
          });

        }, function (error){

          signupCtrl.menuItemNotFoundMessage = 'Could not find this Menu Item';
          signupCtrl.signUpSuccessMsg = '';
        }
        );

    }

  }
})();
