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

        Game.Engine.Display.echoClear('Conversation with ' + this.conversationPartner, false);
        Game.Engine.Display.echo(conversationTree.response);
        Game.Engine.Display.echoBlank();
        this.choiceCommands = this.echoConversation(conversationTree);

        wtaeTerminal.pop();
        wtaeTerminal.push(Game.Engine.Area.loadCommands(GameCommands.Conversations.Choices, true), {
            prompt: '>'
        });

    },

    /**
     * Switch the conversation to the branch that the player selected, and display the new choices, if there are any
     *
     * @param conversationBranch The new branch of the conversation to load
     */
    switchConversationBranch : function(conversationBranch) {
        //If end conversation was selected, end the conversation
        if (conversationBranch == 'end') {
            this.endConversation();
        } else {
            //The player chose to reload the conversation tree from the start, so load up the root node
            if (conversationBranch == 'restart') {
                conversationBranch = this.startBranch;
            }

            //Set this branch as the current branch
            this.currentBranch = conversationBranch;

            //Output the boilerplate for this branch, including who the player is talking to
            Game.Engine.Display.echoClear('Conversation with ' + this.conversationPartner, false);
            Game.Engine.Display.echo(conversationBranch.response);
            Game.Engine.Display.echoBlank();
            //Output the choices for this branch
            this.choiceCommands = this.echoConversation(conversationBranch);
        }
    },

    /**
     * Display the conversation interface, with numbered topic choices. It will currently display any number of choices,
     * but in the future this will be limited to 10, to keep things manageable for the player. Also checks to see if
     * each choice has any conditions before displaying it. Uses the currently set conversation branch.
     */
    echoConversation : function() {
        var choices = this.currentBranch.choices;
        Game.Engine.Display.echo('Enter your choice of conversation topic - ');
        //List all choices for this branch, with accompanying numbers
        var choiceNum = 1;
        var choiceCommands = {};
        for(var convChoice in choices) {
            //Check to ensure all requirements are met to display this choice
            if (this.checkChoiceConditions(this.currentBranch.choices[convChoice]['requires'])) {
                Game.Engine.Display.echo(choiceNum + '. ' + convChoice);
                choiceCommands[choiceNum] = this.currentBranch.choices[convChoice];
                choiceNum ++;
            }
        }
        //If the conversation is not currently on the root node (the conversation starting point), give the player
        //an option to return to the starting point
        if (this.currentBranch != this.startBranch) {
            choiceCommands[choiceNum] = 'restart';
            Game.Engine.Display.echo(choiceNum + '. ' + 'I would like to ask you about something else');
            choiceNum ++;
        }
        //Always output an option to end the current conversation (reload the current area)
        choiceCommands[choiceNum] = 'end';
        Game.Engine.Display.echo(choiceNum + '. ' + 'Nevermind...(End Conversation)');
        Game.Engine.Display.echoBlank();

        return choiceCommands;
    },

    /**
     * Check if there are any conditions to the current conversation choice. If conditions does not exist, then the
     * choice can be displayed. If there are conditions for the choice (there can be multiple), check each one. If
     * any one condition fails, do not display the choice.
     *
     * @param conditions An object containing a list of conditions
     * @returns {boolean} True if the conversation choice should be displayed, based on any conditions
     */
    checkChoiceConditions : function(conditions) {
        if (conditions == null) {
            return true;
        }

        var conditionsMet = false;

        for(var conditionType in conditions) {
            switch (conditionType) {
                case 'inventory':
                    //Player must have a specific item in their inventory for this condition to be met
                    var itemName = conditions[conditionType];
                    var index = Game.Engine.Inventory.inInventory(itemName);
                    if (Game.Engine.Inventory.inInventory(itemName) > -1) {
                        conditionsMet = true;
                    } else {
                        conditionsMet = false;
                    }

                    break;
                case 'stat':
                    //Player must have a stat at a certain level for this condition to be met
                    conditionsMet = true;
                    break;
                case 'follower':
                    //Player must have a certain follower for this condition to be met
                    conditionsMet = true;
                    break;
            }
        }

        return conditionsMet;
    },

    /**
     * End the current conversation by re-loading the current area. This will remove the conversation commands from the
     * stack, and place the area commands interpreter back on the stack.
     */
    endConversation : function() {
        Game.Engine.Area.loadArea(Game.Engine.Area.curArea, false);
    },

    /**
     * Display a list of all NPCs which the player can interact with
     */
    echoNpcs : function() {
        Game.Engine.Display.echoBlank();

        Game.Engine.Display.echo('NPCs', '[iub;#aaa;#000]');
        for (var npc in Game.Engine.Area.curArea.npcs) {
            Game.Engine.Display.echo(Game.Engine.Area.curArea.npcs[npc][1]);
        }
    }

}