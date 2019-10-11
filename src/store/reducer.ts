import { Reducer, Action } from 'redux';
import { IGame, EGameState } from '../App.Types';

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
    cardCatalogue: new Array()
};

export const reducer: Reducer<IGame, IAction> = (state: IGame = defaultState, action: IAction): IGame => {
    switch (action.type) {
        /*
        case 'FETCH_PAGE_DATA': {
            return {
                ...state,
                isFetchingPageData: true
            }
        }
        */
        default: {
            console.warn('Unexpected action', action.type);
            return state
        }
    }
}