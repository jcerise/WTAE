Game.Engine = {
    loadTitle : function() {
        var titleArea = Game.Data['titleScreen'];
        var description = titleArea.description;
        var lines = this.createTextLines(description, 105);

        $('.terminal').terminal(titleArea, {
            onInit : function(terminal) {
                terminal.echo('Created and Written by: ' + titleArea.author);
                terminal.echo('');
                for (var i = 0; i < lines.length; i++) {
                    terminal.echo(lines[i]);
                }
                terminal.echo(titleArea.instructions);
            },
            greetings : '[[iub;#aaa;#000]' + titleArea.title +']'
        });
    },

    loadArea : function(area) {
        var term = $('.terminal').terminal();
        term.pop();
        term.push(area, {
            prompt: '>'
        });
        term.clear();
        var description = area.description;
        var lines = this.createTextLines(description, 105);

        term.echo('[[iub;#aaa;#000]' + area.title +']');
        term.echo('');
        for (var i = 0; i < lines.length; i++) {
            term.echo(lines[i]);
        }
        term.echo('');
    },

    switchRooms : function(area) {
        var curArea = Game.Data['areas'][area];
        console.log(curArea);
        this.loadArea(curArea);
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