Game.Engine.Inventory = {

    contents : [],

    /**
     * Add an item to the players inventory
     * @param itemName
     */
    addItem : function(itemName) {
        this.contents.push(itemName);
    },

    /**
     * Check if an item is in the players inventory
     * @param itemName The name of the item
     * @returns {number|Number} The index of the item in the players inventory, or -1 if not present
     */
    inInventory : function(itemName) {
        return this.contents.indexOf(itemName);
    },

    checkPrerequisites : function(item) {

    }

};