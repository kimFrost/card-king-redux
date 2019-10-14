import { ICard } from "../App.Types";

interface IDataEntry {
    key: string;
}

export interface ITileData extends IDataEntry {
    slots: Array<any>
}

export interface IRecipeData extends IDataEntry {
    time: number;
}

export interface ITokenData extends IDataEntry {

}


let DATA_Cards = {
    'blood': {
        key: 'blood',
        elements: [],
    },
    'bones': {
        key: 'bones',
        elements: [],
    },
    'fat': {
        key: 'fat',
        elements: [],
    },
    'fur': {
        key: 'fur',
        elements: [],
    },
    'hide': {
        key: 'hide',
        elements: [],
    },
    'plantfiber': {
        key: 'plantfiber',
        elements: [],
    },
    'wood': {
        key: 'wood',
        elements: ['plantfiber'],
    },
    'lumber': {
        key: 'lumber',
        elements: ['wood'],
    },
    'planks': {
        key: 'planks',
        elements: ['wood'],
    },
    'stone': {
        key: 'stone',
        elements: [],
    },
    'deer': {
        key: 'deer',
        elements: ['meat', 'fur', 'bones'],
    },
    'rats': {
        key: 'rats',
        elements: ['meat', 'bones', 'fur'],
    },
    'mushrooms': {
        key: 'mushrooms',
        elements: ['plantfiber'],
    },
};

// forrest => unlock lumberjack recipe

const DATA_Resources = {
    'wood': {
        key: 'wood'
    },
    'food': {
        key: 'food'
    },
    'health': {
        key: 'health'
    },
    'stone': {
        key: 'stone'
    },
    'labour': {
        key: 'labour'
    },
}

const DATA_Tokens = {
    'production': {
        key: 'production'
    },
    'wellness': {
        key: 'wellness'
    },
    'faith': {
        key: 'faith'
    },
    'science': {
        key: 'science'
    },
    'military': {
        key: 'military'
    },
    'wealth': {
        key: 'wealth'
    }
}

const DATA_EffectCards: { [key: string]: ICard } = {
    'collectScrap': {
        key: 'collectScrap',
        title: 'Collect scrap',
        effects: [
            {
                output: {
                    key: 'scrap',
                    value: 1
                }
            },
            {
                output: {
                    key: 'health',
                    value: -1
                }
            },
        ]
    },
    'harvestSlugs': {
        key: 'harvestSlugs',
        title: 'Harvest slugs',
        effects: [
            {
                output: {
                    key: 'food',
                    value: 2
                }
            }
        ]
    },
    'intoTheDark': {
        key: 'intoTheDark',
        title: 'Into the Dark',
        effects: [
            {
                output: {
                    key: 'newLocation',
                    value: 1
                }
            },
        ]
    },
    'praiseTheMessenger': {
        key: 'praiseTheMessenger',
        title: 'Praise the Messenger',
        effects: [
            {
                unplayable: true
            },
            {
                endOfTurn: {
                    output: {
                        key: 'hope',
                        value: 1
                    }
                }
            },
        ]
    },
    'somethingIsWatching': {
        key: 'somethingIsWatching',
        title: 'Something is watching',
        effects: [
            {
                endOfTurn: {
                    output: {
                        key: 'fear',
                        value: 1
                    }
                }
            },
        ]
    },
}

const DATA_Locations:  { [key: string]: ICard } = {
    'scrapPile': {
        key: 'scrapPile',
        title: 'Scrap Pile',
        effects: [
            {
                output: {
                    key: 'collectScrap',
                    value: 2
                }
            }
        ]
    }
}

const DATA_Structures:  { [key: string]: ICard } = {
    'tent': {
        key: 'tent',
        title: 'Tent',
        effects: [
            {
                output: {
                    key: 'actions',
                    value: 1
                }
            }
        ]
    },
    'tavern': {
        key: 'tavern',
        title: 'Tavern',
        cost: [
            {
                key: 'scrap',
                value: 3
            }
        ],
        effects: [
            {
                input: {
                    key: 'actions',
                    value: 1
                },
                suppress: {
                    key: 'fear',
                    value: 1
                }
            }
        ]
    }
}

class Data {
    readonly cards:{[key:string]: any} = {
        ...DATA_Resources,
        ...DATA_EffectCards,
        ...DATA_Structures
    };

    findEntryByID(ID: string): IDataEntry | null {
        if (this.cards[ID]) {
            return Object.assign({}, this.cards[ID]);
        }
        return null;
    }

}
let data = new Data();
export default data;