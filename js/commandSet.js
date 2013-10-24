GameCommands = {};

GameCommands.CommandSet = function(properties) {
    properties = properties || {};
    //Create an object that will keep track of what commands have been added to this command set based on name
    this._attachedCommands = {};
    var commands = properties['commands'] || [];
    for (var i = 0; i < commands.length; i++) {
        //Copy over all the properties from each command, as long as its not the init or name properties
        //Also check that we are not overriding a property that already exists
        for (var key in commands[i]) {
            if (key != 'init' && key != 'name' && !this.hasOwnProperty(key)) {
                this[key] = commands[i][key];
            }
        }
        //Add the name of this command to our attached commands
        this._attachedCommands[commands[i].name] = true;
        //And, lastly, call the init function, if there is one
        if (commands[i].init) {
            commands[i].init.call(this, properties);
        }
    }
};

/**
 * Add new commands this commandSet, extending the total list of commands. If a command already exists, it will be
 * overwritten by the new command
 * @param commands List of command objects to extend the base command set with
 */
GameCommands.CommandSet.prototype.addCommands = function(commands) {
        //Copy over all the properties from each command, as long as its not the init or name properties
        //This will overwrite commands, so that later defined commands can override defaults
        for (var key in commands) {
            if (key != 'init' && key != 'name') {
                this[key] = commands[key];
                var name = key;
            }
        }
        //Add the name of this command to our attached commands
        this._attachedCommands[name] = true;
        //And, lastly, call the init function, if there is one
        if (commands.init) {
            commands.init.call(this, commands);
        }
}

/**
 * Check if the commandSet has a certain command or not
 * @param obj Either the command object, or a string
 * @returns {*} true if the commandSet has the command
 */
GameCommands.CommandSet.prototype.hasCommand = function(obj) {
    //Allow passing the command object itself or the name of the command as a string
    if (typeof obj === 'object') {
        return this._attachedCommands[obj.name];
    } else {
        return this._attachedCommands[obj];
    }
};