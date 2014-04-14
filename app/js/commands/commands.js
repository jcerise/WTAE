GameCommands.Commands = {};

GameCommands.Commands.Functions = {
    move : function(direction) {
        //Check to ensure the current area has the direction  stated
        if (Game.Engine.Area.curArea['directions'].hasOwnProperty(direction)) {
            //Check to see if there is an object blocking the desired direction
            if (Game.Engine.Area.curArea['directions'][direction]['blockedBy'] == null) {
                //Nothing was blocking the way, continue with the movement
                var newArea = Game.Engine.Area.curArea['directions'][direction]['leadsTo'];
                Game.Engine.Area.switchAreas(newArea);
            } else {
                //There is an object blocking the desired direction
                var blockingObject = Game.Engine.Area.curArea['directions'][direction]['blockedBy'];
                //Check if the object is active or not (previously bypassed)
                if (!blockingObject.active) {
                    //The object is active
                    var activationItem = blockingObject.activates_with;
                    //Check what activates the object. If the player has that item in their inventory, 
                    //activate the object
                    if (Game.Engine.Inventory.inInventory(activationItem.system_name) > -1) {
                        //The player has the activation item, activate the object, and continue with movement
                        var message = 'You attempt to head ' + direction + '. ' + blockingObject.description + ' ' +
                            blockingObject.activation_text;
                        blockingObject.active = true;
                        var newArea = Game.Engine.Area.curArea['directions'][direction]['leadsTo'];
                        Game.Engine.Area.switchAreas(newArea, message);
                    } else {
                        //The player cannot activate the object, block the movement
                        wtaeTerminal.echo('You attempt to head ' + direction + '. ' + blockingObject.non_active_text);
                    }
                } else {
                    //The object is already active, continue with the movement
                    var message = 'You head ' + direction + '. ' + blockingObject.active_text;
                    var newArea = Game.Engine.Area.curArea['directions'][direction]['leadsTo'];
                    Game.Engine.Area.switchAreas(newArea, message);
                }
            }
        } else {
            //An invalid or non-existant target was supplied
            wtaeTerminal.echo("You cannot go that way...");
        }
    }
}

/* Movement Commands */
GameCommands.Commands.Direction = {
    go: function(direction) {
        direction = direction || null;
        if (direction) {
            wtaeTerminal.exec(direction, true);
        } else {
            wtaeTerminal.echo("Which direction would you like to go?");
        }
    },
    north: function() {
        GameCommands.Commands.Functions.move('north');
    },
    n: function() {
        wtaeTerminal.exec("north", true);
    },
    south: function() {
        GameCommands.Commands.Functions.move('south');
    },
    s: function() {
        wtaeTerminal.exec("south", true);
    },
    east: function() {
        GameCommands.Commands.Functions.move('east');
    },
    e: function() {
        wtaeTerminal.exec("east", true);
    },
    west: function() {
        GameCommands.Commands.Functions.move('south');
    },
    w: function() {
        wtaeTerminal.exec("west", true);
    }

};

GameCommands.Commands.Look = {
    look: function() {
        Game.Engine.Area.displayDescription();
    }
};

/* NPC Interaction Commands */
GameCommands.Commands.Talk = {
    talk: function(target) {
        target = target || null;

        //Check if a target was supplied
        if (target) {
            //Check if the target supplied is an NPC that can be conversed with
            if (Game.Engine.Area.curArea['npcs'].hasOwnProperty(target)) {
                var npc = Game.Engine.Area.curArea['npcs'][target]
                Game.Engine.Conversation.initiateConversation(npc[0], npc[1]);
            } else {
                //An invalid or non-existant target was supplied
                wtaeTerminal.echo("You can't talk to someone who's not here...");
            }
        } else {
            //No target was supplied
            wtaeTerminal.echo("Hmm? Who would you like to talk to?");
        }
    }
}

/* Inventory Commands */
GameCommands.Commands.Inventory = {
    take: function(target) {
        target = target || null;

        //Check if a target has been supplied
        if (target) {
            if (Game.Engine.Area.curArea['items'].hasOwnProperty(target)) {
                var item = Game.Engine.Area.curArea['items'][target];
                //Add the item to the players inventory
                Game.Engine.Inventory.addItem(target);
                //Remove the item from the area
                delete Game.Engine.Area.curArea['items'][target];
                //Update the area description to reflect the item no longer being there
                Game.Engine.Area.displayDescription();
                Game.Engine.Display.echo('You have added the ' + item.name + ' to your inventory.');
            } else {
                //An invalid or non-existant item was supplied
                wtaeTerminal.echo("There is no such item here...");
            }
        } else {
            //No target supplied
            wtaeTerminal.echo('Hmm? What would you like to take?');
        }
    },
    drop: function(target) {
        target = target || null;
        //Check if a target item has been supplied
        if (target) {
            //Check the player actually has the item in their inventory
            if (Game.Engine.Inventory.inInventory(target) > -1) {
                var item = Items[target];
                //Change the suffix to reflect the item being dropped
                item['desc_suffix'] = 'lying on the ground.';
                //remove the item from the inventory
                Game.Engine.Inventory.removeItem(target);
                //Add the item to the world
                Game.Engine.Area.curArea['items'][target] = item;
                //Update the area description
                Game.Engine.Area.displayDescription();
                Game.Engine.Display.echo('You have dropped the ' + item.name + '.');
            } else {
                //An invalid item was supplied (non-existant or not in inventory)
                wtaeTerminal.echo('You don\'t seem to have that item in your inventory...');
            }
        } else {
            //No target supplied
            wtaeTerminal.echo('Hmm? What would you like to drop?');
        }
    },
    inventory: function() {
        Game.Engine.Inventory.displayInventory();
    },
    i: function() {
        GameCommands.Commands.Inventory.inventory();
    },
    examine: function(target) {
        target = target || null;
        //Check if a target has been supplied
        if (target) {
            //Check the player actually has the item in their inventory
            if (Game.Engine.Inventory.inInventory(target) > -1) {
                Game.Engine.Inventory.examineItem(target);
            } else {
                //An invalid choice was supplied (either non-existant, or not in inventory)
                wtaeTerminal.echo('You don\'t seem to have that item in your inventory...');
            }
        } else {
            //No target supplied
            wtaeTerminal.echo('Hmm? What would you like to examine?');
        }
    },
    use: function(item, target) {
        target = target || null;
        item = item || null;
        //First, check if an item has been supplied
        if (item) {
            if (target) {

            } else {
                wtaeTerminal.echo('Hmm? What would you like to use the ' + item + ' on?')
            }
        } else {
            wtaeTerminal.echo("Hmm? What would you like to use?")
        }
    }
};