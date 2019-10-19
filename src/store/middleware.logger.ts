import { Dispatch, Action, Middleware, MiddlewareAPI } from 'redux'


export const logger: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    console.log('dispatching', action)
    let result = next(action)
    //console.log('next state', store.getState())
    return result
}
