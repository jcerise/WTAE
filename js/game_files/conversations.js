Conversations = {
    barkeep : {
        response: 'The barkeep looks your way as you address him, "Huh, whuzzat? Did you want something then?',
        choices: {
            'What can you tell me about Halstead?' : {
                response: 'What is there to tell? Its a small mining village in the mountains.',
                choices: {},
                requires: {
                    inventory: 'map'
                }
            },
            'Do you know anything about dwarven ruins in the area?': {
                response: 'Ruins, eh? Can\'t say that I\'ve heard anything about them...',
                choices: {
                    'Are you sure?' : {
                        response: 'Yeah, I\'m sure. Now order something or begone with you.',
                        choices: {}
                    }
                }
            }
        }
    },
    cloakedFigure : {
        response: 'You hail the cloaked man sitting at the bar, but he does not acknowledge you...',
        choices: {}
    }
};