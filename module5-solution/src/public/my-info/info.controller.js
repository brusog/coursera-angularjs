(function() {
    'use strict';
    var publicModule = angular.module('public');
    publicModule.controller('InfoController', InfoController);
    InfoController.$inject = ['SignUpService', 'favoriteMenuItem'];

    function InfoController(SignUpService, favoriteMenuItem) {
        var infoCtrl = this;
        console.log('inside info controller..', favoriteMenuItem);
        var signedUpInfo = SignUpService.getSignedUpUserInfo();

        if (signedUpInfo &&signedUpInfo.firstName && signedUpInfo.firstName.length>1 ) {
            infoCtrl.firstName = signedUpInfo.firstName;
            infoCtrl.lastName = signedUpInfo.lastName;
            infoCtrl.email = signedUpInfo.email;
            infoCtrl.phone = signedUpInfo.phone;
            infoCtrl.favMenuItem = favoriteMenuItem.data;
        }else
        {
          infoCtrl.notYetSignedUpMsg = 'Not Signed Up Yet. Sign up Now!';
        }
    };

})();
