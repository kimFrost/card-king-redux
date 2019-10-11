import { IState } from "./reducer";
import { IGame, EGameState } from "../App.Types";


export const initialState: IGame = {
    //requests: {}
    deckList: new Array(),
    deck: new Array(),
    discardPile: new Array(),
    structures: new Array(),
    locations: new Array(),
    resources: new Array(),
    state: EGameState.GS_Setup,
    hand: new Array(),
    boardTokens: new Array(),
    cardPlayList: new Array(),
    cardCatalogueList: new Array(),
    cardCatalogue: new Array()
}