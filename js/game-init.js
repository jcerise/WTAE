//Initialize the game object
Game.Data = {
    titleScreen: {
        title: 'Test Text Adventure Game',
        author: 'Jeremy Cerise',
        description: 'A short text based adventure game to showcase the Web Text Adventure Engine.',
        instructions: 'Type start to begin, or help for further instructions.',
        commands: {
            start: function(){
                Game.Engine.switchRooms('tavern');
            }
        }
    },
    areas: {
        tavern: {
            title: 'Village tavern',
            description: 'You find yourself in the village tavern. The only exit is the door you came in by, which ' +
                'sits to your north. A storeroom is to the east.',
            commands: {
                north: function(){
                    Game.Engine.switchRooms('townSquare');
                },
                east: function() {
                    Game.Engine.switchRooms('storeRoom');
                }
            }
        },
        storeRoom: {
            title: 'Store Room',
            description: 'This is a simple store room for the tavern, there is nothing special here. The exit is to the west.',
            commands: {
                west: function(){
                    Game.Engine.switchRooms('tavern');
                }
            }
        },
        townSquare: {
            title: 'Town Square',
            description: 'The town square is more or less abandoned at this hour. The tavern is to the south.',
            commands: {
                south: function(){
                    Game.Engine.switchRooms('tavern');
                }
            }
        }
    }
};