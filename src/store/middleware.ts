import { Dispatch, Action, Middleware, MiddlewareAPI } from 'redux'


export const logger: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

export const middleware: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
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