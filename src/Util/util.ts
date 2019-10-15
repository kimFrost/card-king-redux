import { IResult, ICard, IEffect, IToken } from "../App.Types";
import data from "../data/data";
import registry from './../Services/Registry';

export const shuffle = function (array: Array<any>) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

export const groupBy = (list: Array<any>, keyGetter: Function) => {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}



export const structureToEffects = (newCards: Array<ICard>, structure: ICard) => {
    if (structure.effects) {
        structure.effects.reduce(effectGenNewCards, newCards);
    }
    return newCards;
}

export const effectGenNewCards = (newCards: Array<ICard>, effect: IEffect) => {
    if (effect.output) {
        for (let i = 0; i < effect.output.value; i++) {
            let card = genCardByID(effect.output.key);
            if (card) {
                newCards.push(card);
            }
        }
    }
    return newCards;
}

export const effectGenNewTokens = (newTokens: Array<IToken>, effect: IEffect) => {
    if (effect.output) {
        for (let i = 0; i < effect.output.value; i++) {
            let token = {
                key: effect.output.key
            } as IToken;
            //token.uniqueID = registry.register(token);
            newTokens.push(token);
        }
    }
    return newTokens;
}

export const genCardByID = (key: string): ICard | null => {
    let entry = data.findEntryByID(key); // Not pure!!
    if (entry) {
        let card = <unknown>Object.assign({}, entry) as ICard;
        card.uniqueID = registry.register(card); // Side effect!!
        return card;
    }
    return null;
}

export const cardGenResult = (result: IResult, card: ICard) => {
    if (card.effects) {
        card.effects.forEach(effect => {
            let valid = true;
            if (effect.input) {
                let key = effect.input.key;
                let count = result.newTokens.filter(entry => entry.key === key).length;
                if (count < effect.input.value) {
                    valid = false;
                }
                else {
                    // Remove tokens
                    let leftToRemove = effect.input.value;
                    result.newTokens = result.newTokens.filter(entry => {
                        if (entry.key === key && leftToRemove > 0) {
                            leftToRemove--;
                            return false;
                        }
                        return true;
                    })
                }
            }
            if (valid) {
                effectGenNewTokens(result.newTokens, effect);
                effectGenNewCards(result.newCards, effect);
            }
        });
    }
}