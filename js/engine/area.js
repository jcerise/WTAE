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
        wtaeTerminal.clear();
        Game.Engine.Display.echoCenteredText(titleArea.title, '[iub;#aaa;#000]');
        Game.Engine.Display.echoCenteredText('Created and Written by: ' + titleArea.author);
        wtaeTerminal.echo('');
        Game.Engine.Display.echoParagraphs(description);
        wtaeTerminal.echo(titleArea.instructions);
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
        wtaeTerminal.clear();
        Game.Engine.Display.echoCenteredText(introArea.title, '[iub;#aaa;#000]');
        wtaeTerminal.echo('');
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

        if (!look) {
            wtaeTerminal.pop();
            wtaeTerminal.push(this.loadCommands(area['commands']), {
                prompt: '>'
            });
        }

        wtaeTerminal.clear();
        var description = area.description;
        var lines = Game.Engine.Display.createTextLines(description, 105);

        wtaeTerminal.echo('[[iub;#aaa;#000]' + area.title +']');
        wtaeTerminal.echo('');
        for (var i = 0; i < lines.length; i++) {
            wtaeTerminal.echo(lines[i]);
        }
        wtaeTerminal.echo('');
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
        wtaeTerminal.clear();
        wtaeTerminal.echo('[[iub;#aaa;#000]' + this.curArea.title +']');
        wtaeTerminal.echo('');
    },

    displayDescription : function() {
        this.loadArea(this.curArea, true);
    }
};