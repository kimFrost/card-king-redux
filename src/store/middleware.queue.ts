import { Dispatch, Action, Middleware, MiddlewareAPI, AnyAction } from 'redux'

export const queueActions: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => {
    const queuedActions: AnyAction[] = [];
    let blocked = false;
    return (action: AnyAction) => {
        switch (action.type) {
            case 'ANIMATION_DONE': {
                if (queuedActions.length) {
                    const queuedAction = queuedActions.shift();
                    if (queuedAction) {
                        next(queuedAction);
                    }
                }
                else {
                    blocked = false;
                }
                break;
            }
            default:
                if (blocked) {
                    queuedActions.push(action);
                }
                else {
                    blocked = true;
                    next(action);
                }
                break;
        }
    }
}