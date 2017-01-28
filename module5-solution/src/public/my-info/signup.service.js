(function (){
  'use strict';
  var publicModule = angular.module('public');
  publicModule.service('SignUpService', SignUpService);
  function SignUpService(){
    var svc = this;
    var signedUpUserInfo = {};
    svc.signUp = function ( signUpInfo){
      console.log('signed up the user', signUpInfo);
      signedUpUserInfo = signUpInfo;
    }
    svc.getSignedUpUserInfo = function (){
      return signedUpUserInfo;
    }
  };
})();
