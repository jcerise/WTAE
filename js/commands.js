GameCommands.Commands = {};

GameCommands.Commands.North = {
    north: function() {
        wtaeTerminal.echo("You cannot go that way...");
    },
    n: function() {
        wtaeTerminal.exec("north", true);
    }
};

GameCommands.Commands.South = {
    south: function() {
        wtaeTerminal.echo("You cannot go that way...");
    },
    s: function() {
        wtaeTerminal.exec("south", true);
    }
};

GameCommands.Commands.East = {
    east: function() {
        wtaeTerminal.echo("You cannot go that way...");
    },
    e: function() {
        wtaeTerminal.exec("east", true);
    }
};

GameCommands.Commands.West = {
    west: function() {
        wtaeTerminal.echo("You cannot go that way...");
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