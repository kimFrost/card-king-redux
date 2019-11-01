
import { Dispatch, MiddlewareAPI } from 'redux';
import { ICard, IEffect } from '../App.Types';
import { ThunkDispatch } from 'redux-thunk';

export const drawCard = () => {
    return {
        type: 'DRAW'
        // callback: (next:any, dispatch:Dispatch, getState:any) => {
        //     return {
        //         type: 'EXECUTE_QUEUE'
        //     }
        // }
    }
}

/*
export const drawCard = () => (dispatch: any) => {
    dispatch({ type: 'DRAW' })
}

export const parseCard = (card: ICard) => ({ dispatch }: MiddlewareAPI) => {
    dispatch({ type: 'PARSE_CARD_BEGIN' })

    if (card.effects) {
        card.effects.forEach(parseEffect);
    }

    dispatch({ type: 'PARSE_CARD_END' })
}

export const parseEffect = (effect: IEffect) => ({ dispatch }: MiddlewareAPI) => {
    dispatch({ type: 'PARSE_EFFECT_BEGIN' })




    dispatch({ type: 'PARSE_EFFECT_END' })
}
*/