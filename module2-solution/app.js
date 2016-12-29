(function(){
    var app = angular.module("ShoppingListCheckOff", []);

    app.controller('ToBuyController', ToBuyController);
    app.controller('AlreadyBoughtController', AlreadyBoughtController);
    app.service('ShoppingListService', ShoppingListService);

    ToBuyController.$inject = ['ShoppingListService'];
    AlreadyBoughtController.$inject = ['ShoppingListService'];

    function ToBuyController(ShoppingListService)
    {
        var buyCtrlr = this;
        buyCtrlr.itemsToBuy =  ShoppingListService.getItemsToBuy();
        buyCtrlr.markItemAsBought = function (indexOfBoughtItem){
            ShoppingListService.markThisItemAsBought(indexOfBoughtItem);
        };
    }
    function AlreadyBoughtController(ShoppingListService)
    {
        var boughtCtrlr = this;
        boughtCtrlr.boughtItems = ShoppingListService.getBoughtItems();

    }
    function ShoppingListService()
    {
        var shopListSvc = this;
        var itemsToBuy = [{name:"Cookies", qty:10},
                          {name:"Pepsi", qty:4},
                          {name:"Coke", qty:3},
                          {name:"Fries", qty:1},
                          {name:"Chips", qty:10}];
        var itemsAlreadyBought  = [];
        shopListSvc.getItemsToBuy = function(){ return itemsToBuy;};
        shopListSvc.getBoughtItems = function(){return itemsAlreadyBought;};
        shopListSvc.markThisItemAsBought = function (index){
            itemsAlreadyBought.push(itemsToBuy[index] );
            itemsToBuy.splice(index, 1);
        };
    }

})();
