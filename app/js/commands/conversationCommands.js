GameCommands.Conversations = {};

GameCommands.Conversations.Choices = {
    one: function() {
        var currentChoices = Game.Engine.Conversation.choiceCommands;
        try {
            Game.Engine.Conversation.switchConversationBranch(currentChoices[1]);
        } catch (e) {
            wtaeTerminal.echo("That is not a valid choice...");
        }

    },
    1: function() {
        GameCommands.Conversations.Choices.one();
    },
    two: function() {
        var currentChoices = Game.Engine.Conversation.choiceCommands;
        try {
            Game.Engine.Conversation.switchConversationBranch(currentChoices[2]);
        } catch (e) {
            wtaeTerminal.echo("That is not a valid choice...");
        }
    },
    2: function() {
        GameCommands.Conversations.Choices.two();
    },
    three: function() {
        var currentChoices = Game.Engine.Conversation.choiceCommands;
        try {
            Game.Engine.Conversation.switchConversationBranch(currentChoices[3]);
        } catch (e) {
            wtaeTerminal.echo("That is not a valid choice...");
        }
    },
    3: function() {
        GameCommands.Conversations.Choices.three();
    },
    four: function() {
        var currentChoices = Game.Engine.Conversation.choiceCommands;
        try {
            Game.Engine.Conversation.switchConversationBranch(currentChoices[4]);
        } catch (e) {
            wtaeTerminal.echo("That is not a valid choice...");
        }
    },
    4: function() {
        GameCommands.Conversations.Choices.four();
    },
    five: function() {
        var currentChoices = Game.Engine.Conversation.choiceCommands;
        try {
            Game.Engine.Conversation.switchConversationBranch(currentChoices[5]);
        } catch (e) {
            wtaeTerminal.echo("That is not a valid choice...");
        }
    },
    5: function() {
        GameCommands.Conversations.Choices.five();
    }
};