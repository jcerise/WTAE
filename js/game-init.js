//Initialize the game object
Game.Data = {
    titleScreen: {
        title: 'Test Text Adventure Game',
        author: 'Jeremy Cerise',
        description: 'A short text based adventure game to showcase the Web Text Adventure Engine.',
        instructions: 'Type start to begin, or help for further instructions.',
        start: function(){
            Game.Engine.switchRooms('tavern');
        },
        help: function() {

        }
    },
    areas: {
        tavern: {
            title: 'Village tavern',
            description: 'You find yourself in the village tavern. The only exit is the door you came in by, which ' +
                'sits to your north.',
            north: function(){
                Game.Engine.switchRooms('townSquare');
            }
        },
        townSquare: {
            title: 'Town Square',
            description: 'The town square is almost devoid of life at this hour. The tavern is to the south, and the ' +
                'market is to the east.',
            south: function() {
                Game.Engine.switchRooms('tavern');
            },
            east: function() {
                Game.Engine.switchRooms('market');
            }
        },
        market: {
            title: 'Marketplace',
            description: 'The market is more or less closed up for the evening, but you still see a few booths that ' +
                'look open. The town square lies to the west.',
            west: function() {
                Game.Engine.switchRooms('townSquare');
            }
        }
    }
};