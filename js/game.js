var Game = {
    init: function() {
        Game.Engine.Area.loadTitle();
    }
};

window.onload = function() {

    //Set up the command set to use
    Game.BaseCommands = {
        commands: [GameCommands.Commands.Go,
                   GameCommands.Commands.North,
                   GameCommands.Commands.East,
                   GameCommands.Commands.South,
                   GameCommands.Commands.West,
                   GameCommands.Commands.Look,
                   GameCommands.Commands.Talk,
                   GameCommands.Commands.Inventory]
    };

    //Intialize the global terminal object
    wtaeTerminal = $('.terminal').terminal(function() { }, { });

    //Initialize the game
    Game.init();
};
