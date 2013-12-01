Game.Engine.Inventory = {

    contents : [],

    /**
     * Add an item to the players inventory
     * @param itemName The name of the item to add
     */
    addItem : function(itemName) {
        this.contents.push(itemName);
    },

    /**
     * Remove an item from the players inventory
     * @param itemName The name of the item to remove
     */
    removeItem : function(itemName) {
        var index = this.contents.indexOf(itemName);
        if (index >= -1) {
            this.contents.splice(index, 1);
        }
    },

    /**
     * Check if an item is in the players inventory
     * @param itemName The name of the item
     * @returns {number|Number} The index of the item in the players inventory, or -1 if not present
     */
    inInventory : function(itemName) {
        return this.contents.indexOf(itemName);
    },


    checkItemPrerequisites : function(item) {

    }

};