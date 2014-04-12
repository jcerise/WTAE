GameCommands.Commands = {};

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
        if (Game.Engine.Area.curArea['directions'].hasOwnProperty('north')) {
            if (Game.Engine.Area.curArea['directions']['north']['blockedBy'] == null) {
                var newArea = Game.Engine.Area.curArea['directions']['north'];
                Game.Engine.Area.switchAreas(newArea);
            } else {
                var blockingObject = Game.Engine.curArea['directions']['north']['blockedBy'];
                if (!blockingObject.active) {
                    wtaeTerminal.echo('You attempt to head North. ' + blockingObject.non_active_text);
                } else {
                    wtaeTerminal.echo('You head North. ' + blockingObject.active_text);
                    var newArea = Game.Engine.Area.curArea['directions']['north'];
                    Game.Engine.Area.switchAreas(newArea);
                }
            }
        } else {
            //An invalid or non-existant target was supplied
            wtaeTerminal.echo("You cannot go that way...");
        }
    },
    n: function() {
        wtaeTerminal.exec("north", true);
    },
    south: function() {
        if (Game.Engine.Area.curArea['directions'].hasOwnProperty('south')) {
            var newArea = Game.Engine.Area.curArea['directions']['south'];
            Game.Engine.Area.switchAreas(newArea);
        } else {
            //An invalid or non-existant target was supplied
            wtaeTerminal.echo("You cannot go that way...");
        }
    },
    s: function() {
        wtaeTerminal.exec("south", true);
    },
    east: function() {
        if (Game.Engine.Area.curArea['directions'].hasOwnProperty('east')) {
            if (Game.Engine.Area.curArea['directions']['east']['blockedBy'] == null) {
                var newArea = Game.Engine.Area.curArea['directions']['east']['leadsTo'];
                Game.Engine.Area.switchAreas(newArea);
            } else {
                var blockingObject = Game.Engine.Area.curArea['directions']['east']['blockedBy'];
                if (!blockingObject.active) {
                    var activationItem = blockingObject.activates_with;
                    if (Game.Engine.Inventory.inInventory(activationItem.system_name) > -1) {
                        var message = 'You attempt to head East. ' + blockingObject.description + ' ' +
                            blockingObject.activation_text;
                        blockingObject.active = true;
                        var newArea = Game.Engine.Area.curArea['directions']['east']['leadsTo'];
                        Game.Engine.Area.switchAreas(newArea, message);
                    } else {
                        wtaeTerminal.echo('You attempt to head East. ' + blockingObject.non_active_text);
                    }
                } else {
                    var message = 'You head East. ' + blockingObject.active_text;
                    var newArea = Game.Engine.Area.curArea['directions']['east']['leadsTo'];
                    Game.Engine.Area.switchAreas(newArea, message);
                }
            }
        } else {
            //An invalid or non-existant target was supplied
            wtaeTerminal.echo("You cannot go that way...");
        }
    },
    e: function() {
        wtaeTerminal.exec("east", true);
    },
    west: function() {
        if (Game.Engine.Area.curArea['directions'].hasOwnProperty('west')) {
            var newArea = Game.Engine.Area.curArea['directions']['west'];
            Game.Engine.Area.switchAreas(newArea);
        } else {
            //An invalid or non-existant target was supplied
            wtaeTerminal.echo("You cannot go that way...");
        }
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