import { Reducer, Action, combineReducers } from 'redux';
import { IGame, EGameState, ICard } from '../App.Types';
import { shuffle, structureToEffects, genCardByID } from '../Util/util';

interface IRequestState {
    ID: string;
    status: string;
    data: any;
}

export interface IRootState {
    //requests: { [key: string]: IRequestState; };
    //queuedStates: { [key: string]: IGame };
    queuedStates: Array<IGame>;
    currentState: IGame;
    finalState: IGame;
    random: number;
}

interface IAction extends Action {
    payload?: any;
    flow?: boolean;
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
}

const defaultRootState: IRootState = {
    //queuedStates: {},
    queuedStates: [],
    currentState: { ...defaultState },
    finalState: { ...defaultState },
    random: -1
}

//const storeReducer calls state reducer. store has queue and current state
//const stateReducer has IGame state

const combinedReducer = combineReducers({
    //a: sliceReducerA,
    //b: sliceReducerB
})


export const rootReducer: Reducer<IRootState, IAction> = (state: IRootState = defaultRootState, action: IAction): IRootState => {
    //const intermediateState = combinedReducer(state, action)
    if (action.type === 'DRAW_DONE') return state
    
    if (action.type === 'PROGRESS_STATE') {
        const nextState = state.queuedStates[1] || state.queuedStates[0] || state.finalState;
        const lowestIndex = (state.queuedStates.length > 1) ? 0 : -1;
        return {
            queuedStates: state.queuedStates.filter((value, index) => index > lowestIndex),
            currentState: nextState,
            finalState: state.finalState,
            random: Math.random()
        }
    }
    if (action.type === 'QUEUE') {
        const newState = reducer(state.finalState, action.payload);
        const newQueue = [...state.queuedStates, newState];
        const currentState = newQueue[0];
        const finalState = newQueue[newQueue.length - 1];
        return {
            queuedStates: newQueue,
            currentState: currentState,
            finalState: finalState,
            random: Math.random()
        }
    }
    else {
        const newState = reducer(state.currentState, action);
        return {
            queuedStates: [],
            currentState: newState,
            finalState: newState,
            random: Math.random()
        }
    }
}

export const reducer: Reducer<IGame, IAction> = (state: IGame = defaultState, action: IAction): IGame => {
    switch (action.type) {
        case 'START_GAME': {
            return {
                ...state,
                deck: shuffle(state.deckList.reduce<ICard[]>((array, entry) => {
                    for (let i = 0; i < entry.value; i++) {
                        let card = genCardByID(entry.key);
                        if (card) {
                            array.push(card)
                        }
                    }
                    return array
                }, [])),
                state: EGameState.GS_Play
            }
            /*
            const tokens = state.structures.reduce(structureToEffects, []);
            state.resources.length = 0;
            state.resources.push(...tokens);
            */
            //state.deck = shuffle(state.deck);
        }
        case 'ADD_CARD_TO_HAND': {
            const card = state.deck.shift();
            return {
                ...state,
                hand: state.hand.concat([card as any])
            }
            break;
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