
import { Dispatch } from 'redux';

export const drawCard = () => {
    return {
        type: 'DRAW',
        callback: (next:any, dispatch:Dispatch, getState:any) => {

        }
    }
}