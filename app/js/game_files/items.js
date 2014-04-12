Items = {
    flask : {
        name : 'Flask',
        system_name : 'flask',
        description : {
            basic: {
                text: 'This is a simple flask made of steel. It is empty.'
            },
            advanced: {
                requires: {
                    perception: 10
                },
                text: 'You notice, almost imperceptibly, worn dawrven runes carven into the surface.'
            },
            complete: {
                requires: {
                    intelligence: 15
                },
                text: 'Despite their wear, you can just barely make out the runes, which read "Khelzelad".'
            }
        },
        prerequisite : null,
        desc_suffix : 'sitting on the mantle above the fireplace.'
    },
    wantedposter : {
        name : 'Wanted Poster',
        system_name : 'wantedposter',
        description : {
            basic: {
                text: 'A tattered piece of faded paper with some text scrawled across it. It reads: "WANTED: Any information ' +
                      'regarding the recent thefts of tools occuring around the village. Reward: 10 Silver. See the Marshall for ' +
                      'information."'
            },
            advanced : {},
            complete : {}
        },
        prerequisite : null,
        desc_suffix : 'hanging on one wall.'
    },
    dagger : {
        name : 'Iron dagger',
        system_name : 'dagger',
        description : {
            basic : {
                text : 'A simple iron dagger with a wooden handle and rusty cross guard, it looks like its seen years of ' +
                       'use, and is none too sharp.'
            },
            advanced : {
                requires : {
                    perception : 10
                },
                text : 'There are faded dwarwven runes etched into the blade.'
            },
            complete : {}
        },
        prerequisite : null,
        desc_suffix : 'laying on a table.'
    },
    tavernkey : {
        name : 'Tavern Key',
        system_name : 'tavernkey',
        description : {
            basic : {
                text : 'This is a simple iron key. There is nothing overly special about it. What could it open?'
            },
            advanced : {
                requires : {
                    perception : 10
                },
                text : 'You notice, just barely, the initials "TW" carved into the key.'
            },
            complete : {}
        },
        prerequisite : null,
        desc_suffix : 'hanging by a string on one wall.'
    }
};