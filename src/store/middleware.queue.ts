import { Dispatch, Action, Middleware, MiddlewareAPI } from 'redux'

export const middleware: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
    const queuedActions = [];
    next(action);
    switch (action.type) {
        case 'FETCH_PAGE_DATA': {
            /*
            fetchPageData().then((response) => {
                next({
                    type: 'FETCH_PAGE_DATA_SUCCESS',
                    payload: response
                });
            }).catch(() => {
                next({
                    type: 'FETCH_PAGE_DATA_FAILURE'
                })
            })
            */
            break;
        }
        default:
            break;
    }
}