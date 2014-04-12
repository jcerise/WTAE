//Initialize the game object
Game.Data = {
    titleScreen: {
        title: 'Terror of the Northern Mountains',
        author: 'Jeremy Cerise',
        description: 'A short text based adventure game to showcase the Web Text Adventure Engine.',
        instructions: 'Type start to begin, or help for further instructions.',
        commands: {
            start: function(){
                Game.Engine.Area.loadIntroduction();
            }
        }
    },
    introduction: {
      title: 'Late evening in the village of Halstead, deep in the Northern Mountains',
      description: 'The village of Halstead is largely unremarkable. The last glitter of the setting sun is disappearing ' +
          'behind the peaks to the west, and storm clouds are building above you. Looks like snow. The small collection ' +
          'of houses and the dirt main street that make up the town look small beneath the looming, pine covered mountains that form ' +
          'the valley the town sits in. As you make your way along the road into the village, the creek bubbling to your left, ' +
          'you hear the faint howl of a wolf somewhere in the distance. The muddy track that serves as the main street is ' +
          'frozen solid, and your breath frosts in front of you as approach what passes for the town square. A larger building ' +
          'to your right is clearly the local tavern and inn, and a warm glow is emanating from the two front windows. As ' +
          'you approach the tavern, intent on something warm to drink, and maybe a place to stay the night, you think back ' +
          'on the rumours that brought you to this small mining outpost in the first place.<p>A ragged traveler with a strange ' +
          'tale, and even stranger map. If it hadn\'t been for the handful of solid gold dwarven coins he had, you never ' +
          'would have believed his tale. And what a tale it was: A lost dwarven stronghold deep in the Northern mountains, ' +
          'a secret entrance and a lost key, terrible guardians, and massive caches of masterfully ' +
          'crafted dwarven weapons, piles of coins, gems and other treasures. And most importantly of all, a seeing stone ' +
          'straight out of legend, the likes of which could turn the tide of the current war and reign in an age of peace ' +
          'across the land.<p>It was armed with these rumours, and the travellers map (bought at a fair price, of course), ' +
          'that you set off for the Northern mountains. Finally, after several weeks of hard travel, you arrived here, Halstead, ' +
          'the last bit of civilization before you start your search in earnest. You push open the door of the tavern, ' +
          'warmth washing over you as you step across the threshold.',
        instructions: 'Type begin to start your adventure...',
        commands: {
            begin: function() {
                Game.Engine.Area.switchAreas('tavern');
            }
        }
    },
    areas: {
        tavern: {
            title: 'Halstead Village tavern',
            description: 'You find yourself in the village tavern. There are five tables with a few chairs each, and ' +
                'a large fireplace is casting a warm heat into the room. At the rear is the bar, with a few stools ' +
                'in front of it. There are few patrons at this time of night, and those that are sitting around the ' +
                'the tables are keeping to themselves in low conversation. The barkeep is standing behind the bar, ' +
                'busying himself cleaning. There is also a cloaked man hunched over a mug at the far end of the bar.' +
                ' You see a sword hilt poking out from under the edge of his cloak. To your north is the door you ' +
                'came in by, which leads to the town square. To your east is a small door, slightly ajar, which looks' +
                ' to lead to a storeroom.',
            directions : {
                north: {
                    leadsTo : 'townSquare',
                    blockedBy : null
                },
                east : {
                    leadsTo : 'storeRoom',
                    blockedBy : Objects.storeroomdoor
                }
            },
            commands: {
                order: function(item) {
                    item = item || '';

                    switch (item) {
                        case '':
                            Game.Engine.Display.echoClear('What would you like to order?')
                            break;
                        case 'ale':
                            Game.Engine.Display.echoClear('You wave the barkeep over and order an ale. He returns shortly with ' +
                                'a tall pewter mug of dark brown ale. As he sets it in front of you, you catch a whiff ' +
                                'of the stuff. Its extremely strong, most likely dwarven, by the smell and color.');
                            break;
                        case 'meat':
                            Game.Engine.Display.echoClear('You signal to the barkeep that you would like something to eat. He ' +
                                'disappears into the back for a few moments, and returns with a plate piled with some ' +
                                'sort of meat on it. As he sets it in front of you, you think you recognize it as deer' +
                                ', but you\'re not quite sure. It smells good enough, at any rate, so you try not to ' +
                                'think too much about its origins.');
                            break;
                        default:
                            Game.Engine.Display.echoClear('You wave the barkeep over and ask him for ' + item + '. He gives you ' +
                                'a quizzical look, and then responds, "We only got meat and ale here, nothing fancy, ' +
                                'but it should serve for the likes of you. Now, which can I get you?"');
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
            },
            npcs : {
                barkeep: [Conversations.barkeep, 'Barkeep'],
                cloakedfigure: [Conversations.cloakedFigure, 'Cloaked Figure']
            },
            items : {
                wantedposter: Items.wantedposter,
                irondagger: Items.dagger,
                flask: Items.flask,
                tavernkey: Items.tavernkey
            }
        },
        storeRoom: {
            title: 'Store Room',
            description: 'This is a simple store room for the tavern, there is nothing special here. The exit is to the west.',
            directions: {
                west: 'tavern'
            },
            commands: {
            },
            npcs: {},
            items: {}
        },
        townSquare: {
            title: 'Town Square',
            description: 'The town square is more or less abandoned at this hour. You see a man, obviously drunk, ' +
                            'slouching against the side of the tavern. The tavern is to your south.',
            directions: {
                south: 'tavern'
            },
            commands: {
            },
            npcs: {
                drunk: [Conversations.drunk, 'Drunk']
            },
            items: {}
        }
    }
};