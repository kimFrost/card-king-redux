import { Dispatch, Action, Middleware, MiddlewareAPI, AnyAction } from 'redux'
import { drawCard } from './actions';
import { IGame, ICard } from '../App.Types';
import { IRootState } from './reducer';



const getActionQueue = (card:ICard):Array<any> => {

    return []
}

export const logic: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => {
    return (action: AnyAction) => {

        const state = getState() as IRootState;
        if (action.type === 'DRAW' || (action.type === 'QUEUE' && action.payload.type === 'DRAW')) {
            const topCard = state.finalState.deck[0]
            if (topCard !== undefined) {

                dispatch({
                    type: 'QUEUE',
                    payload: {
                        type: 'ADD_CARD_TO_HAND', //Declare it as events, not commands ??
                    }
                });

                if (topCard.effects) {
                    topCard.effects.forEach(effect => {
                        if (effect.onDraw) {
                            if (effect.onDraw.key === 'draw') {
                                dispatch({
                                    type: 'QUEUE',
                                    payload: {
                                        type: 'EFFECT_ADDED'
                                    }
                                })

                                // bounce up/down card to indicate effect triggered

                                dispatch({
                                    type: 'QUEUE',
                                    payload: {
                                        type: 'DRAW', 
                                    }
                                });
                            }
                        }
                    })
                }

            }
            return
        }


        switch (action.type) {
            // case 'START_GAME': {
            //     next(action);
            //     dispatch({
            //         type: 'DRAW_HAND'
            //     });
            //     break;
            // }
            // case 'DRAW_HAND': {
            //     dispatch(drawCard());
            //     dispatch(drawCard());
            //     dispatch(drawCard());
            //     break;
            // }
            case 'DRAW': {
                break;
            }
            default:
                next(action);
                break;
        }
    }
}