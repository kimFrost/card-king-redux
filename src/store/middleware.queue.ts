import { Dispatch, Action, Middleware, MiddlewareAPI, AnyAction } from 'redux'
import { drawCard } from './actions';

export const queueActions: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => {
    const queuedActions: AnyAction[] = [];
    let blocking = false;
    return (action: AnyAction) => {
        switch (action.type) {
            case 'START_GAME': {
                next(action);
                dispatch({
                    type: 'DRAW_HAND'
                });
                break;
            }
            case 'DRAW_HAND': {
                dispatch(drawCard());
                dispatch(drawCard());
                dispatch(drawCard());
                break;
            }
            case 'DRAW_HAND_DONE': {

                break;
            }
            case 'DRAW': {
                dispatch({
                    type: 'QUEUE_ACTION',
                    payload: action
                })
                break;
            }
            case 'DRAW_DONE': {
                dispatch({
                    type: 'ANIMATION_DONE'
                })
                break;
            }
            case 'QUEUE_ACTION': {
                if (blocking) {
                    queuedActions.push(action.payload);
                }
                else {
                    blocking = true;
                    next(action.payload);
                }
                break;
            }
            case 'ANIMATION_DONE': {
                if (queuedActions.length) {
                    const queuedAction = queuedActions.shift();
                    if (queuedAction) {
                        next(queuedAction);
                    }
                }
                else {
                    blocking = false;
                }
                break;
            }
            default:
                if (blocking) {
                    queuedActions.push(action);
                }
                else {
                    next(action);
                }
                break;
        }
    }
}