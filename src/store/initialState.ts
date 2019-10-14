import { IState } from "./reducer";
import { IGame, EGameState } from "../App.Types";


export const initialState: IGame = {
    //requests: {}
    deckList: [
        {
            key: 'harvestSlugs',
            value: 2
        },
        {
            key: 'collectScrap',
            value: 2
        },
        {
            key: 'praiseTheMessenger',
            value: 1
        }
    ],
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
    cardCatalogue: new Array(),
    eventList: new Array()
}