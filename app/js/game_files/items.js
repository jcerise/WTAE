Items = {
    flask : {
        name : 'Flask',
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
        description : 'A tattered piece of faded paper with some text scrawled across it. It reads: "WANTED: Any information ' +
            'regarding the recent thefts of tools occuring around the village. Reward: 10 Silver. See the Marshall for ' +
            'information."',
        prerequisite : null,
        desc_suffix : 'hanging on one wall.'
    },
    dagger : {
        name : 'Iron dagger',
        description : 'A simple iron dagger with a wooden handle and rusty cross guard, it looks like its seen years of ' +
            'use, and is none too sharp. There are faded darwven runes etched into the blade.',
        prerequisite : null,
        desc_suffix : 'laying on a table.'
    }
};