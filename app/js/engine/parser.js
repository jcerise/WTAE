Game.Engine.Parser = {
    /*
     Command Parsing
     */

    /**
     * If there is not a primary command available for the current area, check the synonyms list for a match, and if
     * found run the match
     * @param command The entered command, along with any arguments passed ('talk to barkeep')
     */
    checkForSynonyms : function(command) {
        var arguments = this.simplifyCommand(command.args);
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
    },

    /**
     * Simplify a command to a verb and a noun, removing any superfluous text (prepositions), such as to, the,
     * about, for, at etc.
     * @param commandArgs The arguments passed to the command
     * @return cleanArgs A simplified list of command arguments
     */
    simplifyCommand : function(commandArgs) {
        var prepositions = ['about','above', 'across', 'after','against','around','at','before','behind','below',
            'beneath','beside','besides','between','beyond','by','down','during','except','for','from','in','inside',
            'into','like','near','of','off','on','out','outside','over','since','through','throughout','till','to',
            'toward','towards','under','until','up','upon','with','without', 'the'];
        var cleanArgs = commandArgs;

        for (var i = 0; i < prepositions.length; i ++) {
            for (var j = 0; j < commandArgs.length; j ++) {
                if (commandArgs[j] === prepositions[i]) {
                    cleanArgs.splice(j, 1);
                }
            }
        }

        //Combine all existing arguments into one argument (E.G. 'talk to cloaked figure' would become
        //'talk cloakedfigure'
        var smooshedCommand = '';
        for (var i = 0; i < commandArgs.length; i ++) {
            smooshedCommand += commandArgs[i];
        }
        cleanArgs = [smooshedCommand];
        return cleanArgs;
    }
};