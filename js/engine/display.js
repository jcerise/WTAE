Game.Engine.Display = {

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

    /**
     * Echo text to the terminal, clearing the terminal, and outputting the area title as well. The output will be
     * broken into lines, but not paragraphs.
     * @param text The text to output
     */
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
     * Echo text to the terminal without clearing the terminal, or re-outputting the titles. The output will be
     * broken into lines.
     * @param text The text to output
     */
    straightEcho : function(text) {
        var cols = wtaeTerminal.cols() - 5;
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
    },

    echoParagraphs : function(text) {
        var paragraphs = text.split('<p>');

        for (var i = 0; i < paragraphs.length; i ++) {
            this.straightEcho(paragraphs[i]);
            wtaeTerminal.echo('');
        }
    }
};