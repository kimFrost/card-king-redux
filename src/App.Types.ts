
interface IState {
    uniqueID?: string;
}

export interface IValueSet {
    key: string;
    value: number;
}

export interface IEffect {
    unplayable?: boolean;
    input?: IValueSet;
    output?: IValueSet;
    storage?: IValueSet;
    endOfTurn?: IEffect;
    suppress?: IValueSet;
}


export interface IMutator {

}

export interface IResult {
    newCards: Array<ICard>;
    newTokens: Array<IToken>;
}

export interface ICard extends IState {
    key: string;
    title: string;
    req?: Array<IEffect>;
    cost?: Array<IValueSet>;
    effects?: Array<IEffect>;
    imageSrc?: string;
}

export interface IToken extends IState {
    key: string;
}

export interface ITokenCopy extends IToken {
    refID: string;
}

export enum EGameState {
    GS_Setup = "Setup",
    GS_Manage = "Manage",
    GS_Play = "Play",
    GS_Event = "Event",
}

export interface IGame extends IState {
    deckList: Array<IValueSet>;
    deck: Array<ICard>;
    discardPile: Array<ICard>;
    resources: Array<IToken>;
    structures: Array<ICard>;
    locations: Array<ICard>;
    state: EGameState;
    hand: Array<ICard>;
    boardTokens: Array<IToken>;
    cardPlayList: Array<ICard>;
    cardCatalogueList: Array<IValueSet>;
    cardCatalogue: Array<ICard>;
    eventList: Array<any>;
}