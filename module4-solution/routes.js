(function() {
    'use strict';
    var menuApp = angular.module('MenuApp');
    menuApp.config(ConfigFn);
    ConfigFn.$inject = ['$stateProvider', '$urlRouterProvider'];

    function ConfigFn($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        var homeState = {
            name: 'homeState',
            url: '/',
            template: '<h1>Welcome to the home</h1>'
        };
        $stateProvider.state(homeState);
        $stateProvider.state('categoriesState', {
            url: '/categories',
            component: 'categories',
            resolve: {
                categories: function(MenuDataService) {
                    console.log('FIlling up the categories property on the component.');
                    return MenuDataService.getAllCategories();
                }
            }
        });

        $stateProvider.state('categoriesState.itemsState', {
            url: '/{category}',
            component: 'items',
            resolve: {
                menuItems: function(MenuDataService, $stateParams) {
                    var categorySelectedByUser = $stateParams.category;
                    var promise = MenuDataService.getItemsForCategory(categorySelectedByUser);
                    var returnPromise = promise.then(function(response) {
                        console.log('Done with the items for category..', response.data);
                        return response.data.menu_items;
                    });
                    return returnPromise;
                }

            }
        });

    }

})();
