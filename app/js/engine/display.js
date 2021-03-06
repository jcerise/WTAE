Game.Engine.Display = {

    /*
     Text Output handling
     */

    /**
     * Clear the entire display
     */
    clearDisplay : function() {
        wtaeTerminal.clear();
    },

    /**
     * Echo text to the terminal without clearing the terminal, or re-outputting the titles. The output will be
     * broken into lines.
     * @param text The text to output
     */
    echo : function(text, formatString) {
        formatString = formatString || '';
        var cols = wtaeTerminal.cols() - 5;
        var lines = this.createTextLines(text, cols);
        for (var i = 0; i < lines.length; i++) {
            if (formatString != '') {
                wtaeTerminal.echo('[' + formatString + lines[i] + ']');
            } else {
                wtaeTerminal.echo(lines[i]);
            }
        }
    },

    /**
     * Echo a blank line to the terminal, useful for separating chunks of text
     */
    echoBlank : function() {
        wtaeTerminal.echo('');
    },

    /**
     * Echo text to the terminal, clearing the terminal, and outputting the area title as well. The output will be
     * broken into lines, but not paragraphs.
     *
     * @param text The text to output
     * @param displayInfo Whether or not to display NPC, Item, and Direction info on the new screen
     */
    echoClear : function(text, displayInfo) {
        if (displayInfo == null) {
            displayInfo = true;
        }
        //Clear the terminal of other input and output, except the area description and name
        Game.Engine.Area.displayTitle();

        this.echoParagraphs(text);

        if (displayInfo) {
            Game.Engine.Conversation.echoNpcs();
        }

    },

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

    /**
     * Take a string of text and break it into paragraphs (denoted by a <p> tag), and output the individual paragraphs
     * to the terminal
     * @param text The text string to break into paragraphs
     */
    echoParagraphs : function(text) {
        var paragraphs = text.split('<p>');

        for (var i = 0; i < paragraphs.length; i ++) {
            this.echo(paragraphs[i]);
            //Add a space between this paragraph and the next
            this.echoBlank();
        }
    }
};