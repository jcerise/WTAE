Game.Engine.Area = {

    /*
     Area Handling
     */

    curArea : null,

    /**
     * Load the title screen(area). This differs from other areas in formatting, and a more limited command set
     */
    loadTitle : function() {
        var titleArea = Game.Data['titleScreen'];
        this.curArea = titleArea;
        var description = titleArea.description;

        wtaeTerminal.push(this.loadCommands(titleArea['commands'], true), {
            prompt: '>'
        });
        Game.Engine.Display.clearDisplay();
        Game.Engine.Display.echoCenteredText(titleArea.title, '[iub;#aaa;#000]');
        Game.Engine.Display.echoCenteredText('Created and Written by: ' + titleArea.author);
        Game.Engine.Display.echoBlank();
        Game.Engine.Display.echoParagraphs(description);
        Game.Engine.Display.echoParagraphs(titleArea.instructions);
    },

    /**
     * Load the introduction area. This is very similar to the title, but does not contain author or adventure
     * information. It is intended to set the scene.
     */
    loadIntroduction : function() {
        var introArea = Game.Data['introduction'];
        this.curArea = introArea;
        var description = introArea.description;

        wtaeTerminal.push(this.loadCommands(introArea['commands'], true), {
            prompt: '>'
        });
        Game.Engine.Display.clearDisplay();
        Game.Engine.Display.echoCenteredText(introArea.title, '[iub;#aaa;#000]');
        Game.Engine.Display.echoBlank();
        Game.Engine.Display.echoParagraphs(description);
        wtaeTerminal.echo(introArea.instructions);
    },

    /**
     * Load up a new area. Output the area title, the description, and any other relevant information.
     * Also, change out the command set to match the new area
     * @param area The new area to be loaded
     */
    loadArea : function(area, look) {

        var look = look || false;

        //If this wasn't triggered by a look command, load up the new command set, otherwise, the commands stay the same
        if (!look) {
            wtaeTerminal.pop();
            wtaeTerminal.push(this.loadCommands(area['commands']), {
                prompt: '>'
            });
        }

        var description = area.description;
        var itemDescriptions = '';

        //Load up dynamic item descriptions based on what is currently in the area (not in the player inventory)
        for (var item in Game.Engine.Area.curArea.items) {
            var curItem = Game.Engine.Area.curArea.items[item];
            if (curItem['prerequisite'] == null) {
                //There are no viewing prerequisites for this item, so display it
                itemDescriptions += ' You see a ' + curItem['name'] + ' ' + curItem['desc_suffix'];
            } else {
                if (Game.Engine.Inventory.checkItemPrerequisites(curItem)) {
                    //The player meets the prerequisites to view this item, so display it
                }
            }
        }

        //Display the description, with any visible items displayed below it
        Game.Engine.Display.echoClear(description + ' ' + itemDescriptions, true);
        Game.Engine.Display.echoBlank();
    },

    /**
     * Initiate an area switch
     * @param area The new Area to switch to
     */
    switchAreas : function(area) {
        this.curArea = Game.Data['areas'][area];
        this.loadArea(this.curArea);
    },

    /**
     * Load up a fresh command set. If this is for the title screen, or other admin screens, do not load the base
     * command sets, only load commands defined for the area.
     * Otherwise, load up the base commands, and extend them with the area specific command set.
     * @param commands List of Area specific commands to load
     * @param isTitle Is this an admin screen?
     * @returns {*} The CommandSet object to use for the loaded area
     */
    loadCommands : function(commands, isTitle) {
        isTitle = isTitle || false;
        var commandSet = null;

        //The title screen should not allow basic commands (movement, looking, etc), only the commands necessary
        //to start the game (defined as part of the title area)
        if (isTitle) {
            commandSet = new GameCommands.CommandSet();
        } else {
            commandSet = new GameCommands.CommandSet(Game.BaseCommands);
        }
        commandSet.addCommands(commands);
        return commandSet;
    },

    displayTitle : function() {
        Game.Engine.Display.clearDisplay();
        wtaeTerminal.echo('[[iub;#aaa;#000]' + this.curArea.title +']');
        Game.Engine.Display.echoBlank();
    },

    displayDescription : function() {
        this.loadArea(this.curArea, true);
    }
};