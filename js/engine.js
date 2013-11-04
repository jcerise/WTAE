Game.Engine = {};

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
        var lines = Game.Engine.Text.createTextLines(description, 105);

        wtaeTerminal.push(this.loadCommands(titleArea['commands'], true), {
            prompt: '>'
        });
        wtaeTerminal.clear();
        Game.Engine.Text.echoCenteredText(titleArea.title, '[iub;#aaa;#000]');
        Game.Engine.Text.echoCenteredText('Created and Written by: ' + titleArea.author);
        wtaeTerminal.echo('');
        for (var i = 0; i < lines.length; i++) {
            wtaeTerminal.echo(lines[i]);
        }
        wtaeTerminal.echo(titleArea.instructions);
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
        var lines = Game.Engine.Text.createTextLines(description, 105);

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

Game.Engine.Parser = {
    /*
    Command Parsing
     */

    checkForSynonyms : function(command) {
        var arguments = command.args;
        var commandName = command.name;
        var synonyms = Game.Engine.Area.curArea.synonyms || {};
        var synonymFound = false;
        //Check the current area for any defined synonyms, and run one if it is found
        if (Object.keys(synonyms).length > 0) {
            for (var key in synonyms) {
                if (key == commandName) {
                    wtaeTerminal.exec(synonyms[key] + ' ' + arguments.toString(), true);
                    synonymFound = true;
                }
            }
        } else {
            //If a synonym was not found, then this command cannot be run in this area
            wtaeTerminal.echo('You cannot do that here...');
        }

        if (!synonymFound) {
            wtaeTerminal.echo('You cannot do that here...');
        }
    }
};

Game.Engine.Text = {

    /*
    Text Output handling
     */
    /**
     * Takes a string and centers its output on the terminal. Will also accept format strings.
     * @param text The string to be centered and output
     * @param formatString (Optional) The format string to apply to the centered text
     */
    echoCenteredText : function(text, formatString) {
        formatString = formatString || '';
        var cols = wtaeTerminal.cols();
        var precedingSpaces = Math.round((cols / 2) - (text.length / 2));

        var spaces = '';
        for(var i = 0; i <= precedingSpaces; i ++) {
            spaces += ' ';
        }

        if (formatString != '') {
            wtaeTerminal.echo(spaces + '[' + formatString + text + ']');
        } else {
            wtaeTerminal.echo(spaces + formatString + text);
        }
    },

    echo : function(text) {
        //Clear the terminal of other input and output, except the area description and name
        Game.Engine.Area.displayTitle();

        var cols = wtaeTerminal.cols();
        var lines = this.createTextLines(text, cols);
        for (var i = 0; i < lines.length; i++) {
            wtaeTerminal.echo(lines[i]);
        }
    },

    /**
     * Break a chunk of text into a series of lines of lineSize length
     *
     * @param text The text to break up
     * @param lineSize How long each line should be
     * @returns {Array} An array containing lines of length lineSize
     */
    createTextLines : function (text, lineSize) {
        var lines = text.split(' ');

        var newLines = [];
        var charCount = 0;
        var line = '';
        for (var i = 0; i < lines.length; i++) {
            charCount += lines[i].length + 1;
            if (charCount <= lineSize) {
                line += lines[i] + ' ';
            } else {
                newLines.push(line);
                line = '';
                charCount = lines[1].length;
                line += lines[i] + ' ';
            }
        }

        newLines.push(line);
        return newLines;
    }
};