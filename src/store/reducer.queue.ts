import { Reducer, Action } from 'redux';
import { IGame, EGameState, ICard } from '../App.Types';
import { shuffle, structureToEffects, genCardByID } from '../Util/util';

interface IQueueEntry {
    action: IAction;
}

export interface IState {
    queue: Array<IQueueEntry>
}

interface IAction extends Action {
    payload?: any;
}

const defaultState: IState = {
    queue: []
};

export const reducer: Reducer<IState, IAction> = (state: IState = defaultState, action: IAction): IState => {
    switch (action.type) {
        case 'DRAW': {
            return {
                ...state,
            }
        }
        default: {
            return state
        }
    }
}