(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.myInfo', {
      url: '/myInfo',
      templateUrl: 'src/public/my-info/my-info.html',
      controller: 'InfoController',
      controllerAs: 'infoCtrl',
      resolve: {
        favoriteMenuItem: ['SignUpService', 'MenuService', function (SignUpService,MenuService ){
          //Get the user info
          var signedUpUser = SignUpService.getSignedUpUserInfo();
          if( signedUpUser && signedUpUser.favoriteMenu){
            console.log('getting favorite menu item before moving to my-info');
            var menuItemPromise = MenuService.getMenuItemWithShortName(signedUpUser.favoriteMenu);
            return menuItemPromise;
          }
        }]
      }
    })
    .state('public.signUp',{
      url:'/signUp',
      templateUrl: 'src/public/my-info/sign-up.html',
      controller: 'SignUpController',
      controllerAs:'signupCtrl'
    });
}
})();
