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

GameCommands.CommandSet.prototype.hasCommand = function(obj) {
    //Allow passing the command object itself or the name of the command as a string
    if (typeof obj === 'object') {
        return this._attachedCommands[obj.name];
    } else {
        return this._attachedCommands[obj];
    }
};