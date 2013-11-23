GameCommands.Commands = {};

/* Movement Commands */
GameCommands.Commands.Go = {
    go: function(direction) {
        direction = direction || null;
        if (direction) {
            wtaeTerminal.exec(direction, true);
        } else {
            wtaeTerminal.echo("Which direction would you like to go?");
        }
    }
};

GameCommands.Commands.North = {
    north: function() {
        if (Game.Engine.Area.curArea['directions'].hasOwnProperty('north')) {
            var newArea = Game.Engine.Area.curArea['directions']['north'];
            Game.Engine.Area.switchAreas(newArea);
        } else {
            //An invalid or non-existant target was supplied
            wtaeTerminal.echo("You cannot go that way...");
        }
    },
    n: function() {
        wtaeTerminal.exec("north", true);
    }
};

GameCommands.Commands.South = {
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
    }
};

GameCommands.Commands.East = {
    east: function() {
        if (Game.Engine.Area.curArea['directions'].hasOwnProperty('east')) {
            var newArea = Game.Engine.Area.curArea['directions']['east'];
            Game.Engine.Area.switchAreas(newArea);
        } else {
            //An invalid or non-existant target was supplied
            wtaeTerminal.echo("You cannot go that way...");
        }
    },
    e: function() {
        wtaeTerminal.exec("east", true);
    }
};

GameCommands.Commands.West = {
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

/* Interaction Commands */
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