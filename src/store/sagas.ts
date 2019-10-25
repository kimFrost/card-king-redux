import { put, takeEvery, all, take, actionChannel, call, select, cancel, fork } from 'redux-saga/effects'
import { buffers } from 'redux-saga'

function* onDrawCard() {
    //const state = yield select();
    /*
    yield put({type: 'QUEUE_ACTION', payload: {
        type: 'REVEAL_TOP_CARD'
    }})
    yield put({type: 'QUEUE_ACTION', payload: {
        type: 'PARSE_CARD_EFFECTS'
    }})
    */
    yield put({
        type: 'QUEUE_ACTION', payload: {
            type: 'ADD_CARD_TO_HAND'
        }
    })

    /*
    yield put({ type: 'REVEAL_TOP_CARD' })
    yield take('REVEAL_TOP_CARD_DONE')
    yield put({ type: 'PARSE_CARD_EFFECTS' })
    yield take('PARSE_CARD_EFFECTS_DONE')
    yield put({ type: 'ADD_CARD_TO_HAND' })
    */
}

/*
function* onParseEffects() {

    yield put({ type: 'PARSE_CARD_EFFECTS_DONE' })
}

function* watchEffects() {
    yield takeEvery('PARSE_CARD_EFFECTS', onParseEffects)
}
*/

function* watchDrawCard() {
    yield takeEvery('DRAW', onDrawCard)
}

function* onStartRound() {
    
    /*
     yield put({type: 'DRAW'})
     yield put({type: 'DRAW'})
     yield put({type: 'DRAW'})
     yield put({type: 'DRAW'})
     */

    //yield addToQue('REVEAL_TOP_CARD', 'PARSE_CARD_EFFECTS', 'ADD_CARD_TO_HAND');
    //yield addToQue('REVEAL_TOP_CARD', 'PARSE_CARD_EFFECTS', 'ADD_CARD_TO_HAND');
    //yield addToQue('REVEAL_TOP_CARD', 'PARSE_CARD_EFFECTS', 'ADD_CARD_TO_HAND');
    /*
    yield addToQue('ADD_CARD_TO_HAND');
    yield addToQue('ADD_CARD_TO_HAND');
    yield addToQue('ADD_CARD_TO_HAND');
    */

    /*
    yield put({ type: 'DRAW', flow: true })
    yield put({ type: 'DRAW', flow: true })
    yield put({ type: 'DRAW', flow: true })
    */

    yield put({type: 'QUEUE', payload: {
        type: 'DRAW'
    }})
    yield put({type: 'QUEUE', payload: {
        type: 'DRAW'
    }})
    yield put({type: 'QUEUE', payload: {
        type: 'DRAW'
    }})
    yield put({type: 'QUEUE', payload: {
        type: 'DRAW'
    }})

    // Draw
    // - REVEAL
    // - PARSE EFFECTS
    // - ADD_TO_HAND

    // I dont need to trigger actions. I need to generate actions for queue!
}

function* addToQue(...actions: string[]) {
    yield all(actions.map((action) => put({ type: 'QUEUE_ACTION', payload: { type: action } })));
}

function* watchStartRound() {
    yield takeEvery('START_GAME', onStartRound)
}

function* watchActionQueue() {
    //const buffer = buffers.expanding();
    const actionsChannel = yield actionChannel('QUEUE_ACTION')
    while (true) {
        const { payload } = yield take(actionsChannel) // on action in QUEUE_ACTION channel
        yield call(handleAction, payload)
    }
}

function* handleAction(payload: any) {
    // Middleware.queue will map actions to QUEUE_ACTION and add orig action as payload
    // Add action to queue
    //ex.1
    // yield on DRAW_DONE
    // how to allow actions queued under this action. Parse effect fx

    //yield put({ type: types.SUBSCRIBER_RECEIVED, data: subscriberDetails });
    yield put({ type: payload.type });
    yield take(`${payload.type}_DONE`)
    //yield put({ type: 'QUEUE_ACTION_DONE' });
}

function* watchCallBacks() {
    /*
    const task = yield fork(takeEvery as any, 'DRAW_DONE', function*() {
        yield put({type: 'PROGRESS_STATE'})
    })
    yield cancel(task)
    */
    const task = yield takeEvery('DRAW_DONE', function*() {
        yield put({type: 'PROGRESS_STATE'})
    })
}

/*
function* watchAction() {
    yield takeLatest('ACTION', workerSaga)
}

function* workerSaga(action) {
    try {
        const thingsFromReduxStore = yield select(state => state.data)
        const { things, from, action } = action.data
        const payload = { things, from, action, thingsFromReduxStore }
        const data = yield call(apiFetch, payload)
        yield put({ type: 'ACTION_SUCCESS', data })
    } catch (error) {
        yield put({ type: 'ACTION_ERROR', error })
    }
}
*/

export default function* rootSaga() {
    yield all([
        watchStartRound(),
        //watchDrawCard(),
        //watchEffects(),
        watchCallBacks(),
        watchActionQueue()
    ])
}