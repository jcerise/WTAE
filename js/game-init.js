//Initialize the game object
Game.Data = {
    titleScreen: {
        title: 'Test Text Adventure Game',
        author: 'Jeremy Cerise',
        description: 'A short text based adventure game to showcase the Web Text Adventure Engine.',
        instructions: 'Type start to begin, or help for further instructions.',
        commands: {
            start: function(){
                Game.Engine.Area.switchAreas('tavern');
            }
        }
    },
    areas: {
        tavern: {
            title: 'Village tavern',
            description: 'You find yourself in the village tavern. There are five tables with a few chairs each, and ' +
                'a large fireplace is casting a warm heat into the room. At the rear is the bar, with a few stools ' +
                'in front of it. There are few patrons at this time of night, and those that are sitting around the ' +
                'the tables are keeping to themselves in low conversation. The barkeep is standing behind the bar, ' +
                'busying himself cleaning. There is also a cloaked man hunched over a mug at the far end of the bar.' +
                ' You see a sword hilt poking out from under the edge of his cloak. To your north is the door you ' +
                'came in by, which leads to the town square. To your east is a small door, slightly ajar, which looks' +
                ' to lead to a storeroom.',
            commands: {
                north: function(){
                    Game.Engine.Area.switchAreas('townSquare');
                },
                east: function() {
                    Game.Engine.Area.switchAreas('storeRoom');
                },
                order: function(item) {
                    item = item || '';

                    switch (item) {
                        case '':
                            Game.Engine.Text.echo('What would you like to order?')
                            break;
                        case 'ale':
                            Game.Engine.Text.echo('You wave the barkeep over and order an ale. He returns shortly with ' +
                                'a tall pewter mug of dark brown ale. As he sets it in front of you, you catch a whiff ' +
                                'of the stuff. Its extremely strong, most likely dwarven, by the smell and color.');
                            break;
                        case 'meat':
                            Game.Engine.Text.echo('You signal to the barkeep that you would like something to eat. He ' +
                                'disappears into the back for a few moments, and returns with a plate piled with some ' +
                                'sort of meat on it. As he sets it in front of you, you think you recognize it as deer' +
                                ', but you\'re not quite sure. It smells good enough, at any rate, so you try not to ' +
                                'think too much about its origins.');
                            break;
                        default:
                            Game.Engine.Text.echo('You wave the barkeep over and ask him for ' + item + '. He gives you ' +
                                'a quizzical look, and then responds, "We only got meat and ale here, nothing fancy, ' +
                                'but it should serve for the likes of you. Now, which can I get you?"');
                            break;
                    }
                },
                talk: function(target) {
                    target = target || '';

                    switch (target) {
                        case '':
                            Game.Engine.Text.echo('Who would you like to talk to?');
                            break;
                        default:
                            Game.Engine.Text.echo('You see two people of interest to talk to, the barkeep, and the ' +
                                'cloaked figure siting alone at the bar. Who would you like to talk to?');
                            break;
                    }
                }
            },
            synonyms : {
                drink: 'order',
                eat: 'order',
                ale: 'order ale',
                meat: 'order meat',
                converse: 'talk'
            }
        },
        storeRoom: {
            title: 'Store Room',
            description: 'This is a simple store room for the tavern, there is nothing special here. The exit is to the west.',
            commands: {
                west: function(){
                    Game.Engine.Area.switchAreas('tavern');
                }
            }
        },
        townSquare: {
            title: 'Town Square',
            description: 'The town square is more or less abandoned at this hour. The tavern is to the south.',
            commands: {
                south: function(){
                    Game.Engine.Area.switchAreas('tavern');
                }
            }
        }
    }
};