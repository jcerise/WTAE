Game.Engine = {

    loadTitle : function() {
        var titleArea = Game.Data['titleScreen'];
        var description = titleArea.description;
        var lines = this.createTextLines(description, 105);

        wtaeTerminal.push(this.loadCommands(titleArea['commands']), {
            prompt: '>'
        });
        wtaeTerminal.clear();
        wtaeTerminal.echo('[[iub;#aaa;#000]' + titleArea.title +']');
        wtaeTerminal.echo('Created and Written by: ' + titleArea.author);
        wtaeTerminal.echo('');
        for (var i = 0; i < lines.length; i++) {
            wtaeTerminal.echo(lines[i]);
        }
        wtaeTerminal.echo(titleArea.instructions);
    },

    loadArea : function(area) {

        wtaeTerminal.push(this.loadCommands(area['commands']), {
            prompt: '>'
        });
        wtaeTerminal.clear();
        var description = area.description;
        var lines = this.createTextLines(description, 105);

        wtaeTerminal.echo('[[iub;#aaa;#000]' + area.title +']');
        wtaeTerminal.echo('');
        for (var i = 0; i < lines.length; i++) {
            wtaeTerminal.echo(lines[i]);
        }
        wtaeTerminal.echo('');
    },

    switchRooms : function(area) {
        var curArea = Game.Data['areas'][area];
        this.loadArea(curArea);
    },

    loadCommands : function(commands) {
        var commandSet = new GameCommands.CommandSet(Game.BaseCommands);
        commandSet.addCommands(commands)

        console.log(commandSet);
        return commandSet;
    },

    centerText : function() {

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
}