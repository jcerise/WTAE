Game.Engine.Conversation = {

    startBranch : null,
    currentBranch : null,
    choiceCommands : null,
    conversationPartner : null,

    /**
     * Push the conversation command interpreter onto the console stack, and pop off the area commands. This will lock
     * the player into conversation mode until they exit the conversation.
     * @param conversationTree An object representing a branching conversation
     */
    initiateConversation : function(conversationTree, partner) {

        this.startBranch = conversationTree;
        this.currentBranch = conversationTree;
        this.conversationPartner = partner;

        Game.Engine.Display.echoClear('Conversation with ' + this.conversationPartner);
        Game.Engine.Display.echo(conversationTree.response);
        Game.Engine.Display.echoBlank();
        this.choiceCommands = this.echoConversation(conversationTree);

        wtaeTerminal.pop();
        wtaeTerminal.push(Game.Engine.Area.loadCommands(GameCommands.Conversations.Choices, true), {
            prompt: '>'
        });

    },

    switchConversationBranch : function(conversationBranch) {
        if (conversationBranch == 'end') {
            this.endConversation();
        } else {
            if (conversationBranch == 'restart') {
                conversationBranch = this.startBranch;
            }

            this.currentBranch = conversationBranch;
            Game.Engine.Display.echoClear('Conversation with ' + this.conversationPartner);
            Game.Engine.Display.echo(conversationBranch.response);
            Game.Engine.Display.echoBlank();
            this.choiceCommands = this.echoConversation(conversationBranch);
        }
    },

    /**
     * Display the conversation interface, with numbered topic choices. It won't display more than 4 choices,
     * for simplicitys sake
     * @param topics An array containing a list of conversation topics
     */
    echoConversation : function(tree) {
        var choices = tree.choices;
        Game.Engine.Display.echo('Enter your choice of conversation topic - ');
        var choiceNum = 1;
        var choiceCommands = {};
        for(var convChoice in choices) {
            if (this.checkChoiceConditions(tree.choices[convChoice]['requires'])) {
                Game.Engine.Display.echo(choiceNum + '. ' + convChoice);
                choiceCommands[choiceNum] = tree.choices[convChoice];
                choiceNum ++;
            }
        }
        if (this.currentBranch != this.startBranch) {
            choiceCommands[choiceNum] = 'restart';
            Game.Engine.Display.echo(choiceNum + '. ' + 'I would like to ask you about something else');
            choiceNum ++;
        }
        choiceCommands[choiceNum] = 'end';
        Game.Engine.Display.echo(choiceNum + '. ' + 'Nevermind...(End Conversation)');
        Game.Engine.Display.echoBlank();

        return choiceCommands;
    },

    checkChoiceConditions : function(conditions) {
        if (conditions == null) {
            return true;
        }

        var conditionsMet = false;

        for(var conditionType in conditions) {
            switch (conditionType) {
                case 'inventory':
                    conditionsMet = true;
                    break;
                case 'stat':
                    conditionsMet = true;
                    break;
                case 'follower':
                    conditionsMet = true;
                    break;
            }
        }

        return conditionsMet;
    },

    endConversation : function() {
        Game.Engine.Area.loadArea(Game.Engine.Area.curArea, false);
    }
}