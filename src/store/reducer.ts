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
    finalState: { ...defaultState }
}

//const storeReducer calls state reducer. store has queue and current state
//const stateReducer has IGame state

const combinedReducer = combineReducers({
    //a: sliceReducerA,
    //b: sliceReducerB
})


export const rootReducer: Reducer<IRootState, IAction> = (state: IRootState = defaultRootState, action: IAction): IRootState => {
    //const intermediateState = combinedReducer(state, action)
    if (action.type === 'PROGRESS_STATE') {
        // use action.type in payload as ways of getting state. I think that it might not be reliable.
        const firstState = state.queuedStates[0];
        return {
            queuedStates: state.queuedStates.filter((value, index) => index > 0),
            currentState: firstState,
            finalState: state.finalState
        }
    }

    const newState = reducer(state.currentState, action);

    if (action.flow) {
        return {
            queuedStates: [...state.queuedStates, newState],
            currentState: state.currentState,
            finalState: newState
        }
    }
    else {
        return {
            queuedStates: state.queuedStates,
            currentState: newState,
            finalState: newState
        }
    }
}

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