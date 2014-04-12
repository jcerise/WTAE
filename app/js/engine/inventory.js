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

    },

    /**
     * Display the players inventory screen
     */
    displayInventory : function() {
        Game.Engine.Display.echoClear("In your inventory you have the following: ", false);
        for (var i = 0; i < this.contents.length; i ++) {
            Game.Engine.Display.echo(Items[this.contents[i]].name);
        }
        Game.Engine.Display.echoBlank();
    },

    /**
     * Examine an item in the players inventory. This will show the description of the item, as well as 
     * any extra information about the item (if the pre-requisites are met)
     * @param itemName The name of the item
     */
     examineItem : function(itemName) {
        var item = Items[itemName];
        var displayDescription = item.description.basic.text;

        //Check to see if this item has an advanced description
        if (item.description.hasOwnProperty('advanced')) {
            //item has advanced description, check if player meets prereqs to see it
            if (this.checkDescriptionConditions(item.description.advanced.requires)) {
                //player meets prereqs, show the advanced description
                displayDescription += ' ' + item.description.advanced.text;

                //Since the player passed the advanced check, see if they can see the complete description, if there is one
                if (item.description.hasOwnProperty('complete')) {
                    if (this.checkDescriptionConditions(item.description.complete.requires)) {
                        //Player meets prereqs for complete description, display it as well
                        displayDescription +=  ' ' + item.description.complete.text;
                    }
                }
            }
            
        }

        //Output the description as a whole
        Game.Engine.Display.echoBlank();
        Game.Engine.Display.echo(displayDescription);
        Game.Engine.Display.echoBlank();
     },

     /**
      * Check the pre-requisites for displaying certain portions of an item description. If the 
      * player meets the conditions, then display the portion of the description.
      */
    checkDescriptionConditions : function(conditions) {
        var conditionsMet = false;

        for(var conditionType in conditions) {
            switch (conditionType) {
                case 'inventory':
                    //Player must have a certain item in their inventory
                    break;
                case 'perception':
                    //Player must have perception at or above level
                    var perceptionThreshold = conditions[conditionType];
                    //Check if perception is high enough
                    conditionsMet = true;
                    break;
                case 'intelligence':
                    //Player must have perception at or above level
                    var intelligenceThreshold = conditions[conditionType];
                    //Check if intelligence is high enough
                    conditionsMet = true;
                    break;
            }
        }

        return conditionsMet;
    }

};