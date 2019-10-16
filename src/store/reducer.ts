import { Reducer, Action } from 'redux';
import { IGame, EGameState, ICard } from '../App.Types';
import { shuffle, structureToEffects, genCardByID } from '../Util/util';

interface IRequestState {
    ID: string,
    status: string,
    data: any
}

export interface IState {
    requests: { [key: string]: IRequestState; };
}

interface IAction extends Action {
    payload?: any;
}

const defaultState: IGame = {
    deckList: new Array(),
    deck: new Array(),
    discardPile: new Array(),
    structures: new Array(),
    locations: new Array(),
    resources: new Array(),
    state: EGameState.GS_Setup,
    hand: new Array(),
    boardTokens: new Array(),
    cardPlayList: new Array(),
    cardCatalogueList: new Array(),
    cardCatalogue: new Array(),
    eventList: new Array()
};

export const reducer: Reducer<IGame, IAction> = (state: IGame = defaultState, action: IAction): IGame => {
    switch (action.type) {
        case 'START_GAME': {
            state.deck = state.deckList.reduce<ICard[]>((array, entry) => {
                for (let i = 0; i < entry.value; i++) {
                    let card = genCardByID(entry.key);
                    if (card) {
                        array.push(card)
                    }
                }
                return array
            }, [])
            const tokens = state.structures.reduce(structureToEffects, []);
            state.resources.length = 0;
            state.resources.push(...tokens);
            state.deck = shuffle(state.deck);
            state.state = EGameState.GS_Play;
            return {
                ...state
            }
        }
        case 'DRAW': {
            const card = state.deck.shift();
            if (card) {
                //card.effects
            }
            return {
                ...state,
                hand: state.hand.concat([card as any])
            }
        }
        case 'REDECK': {
            let newCards = state.structures.reduce(structureToEffects, []);
            state.deck.length = 0;
            state.deck.push(...newCards);
            state.deck = shuffle(state.deck);
            return {
                ...state
            }
        }
        default: {
            console.warn('Unexpected action', action.type);
            return state
        }
    }
}