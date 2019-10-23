import React from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { IGame, EGameState } from './App.Types';
import Token from './Components/Token';
import Card from './Components/Card';
import { animateDrawCard, animateCardOut, addEndListener, animateDrawToken, offsetElementToTarget, reveal, moveHome } from './animations/animations';
import { drawCard } from './store/actions';
//import logo from './logo.svg';

const App: React.FC = () => {

    const state = useSelector((state: IGame) => state);
    const dispatch = useDispatch();

    return (
        <div>
            findme
            <div className="game">
                <div className="game__actions">
                    <button onClick={() => {
                        dispatch({
                            type: 'START_GAME'
                        })
                    }}>Start game</button>
                    <button onClick={() => {
                        dispatch(drawCard());
                        /*
                        dispatch({
                            type: 'DRAW',
                            // How should component resolve this promise??
                            promise: new Promise<void>(() => {}).then(() => {
                                dispatch({
                                    type: 'DRAW_DONE'
                                })
                            })
                        })*/
                    }}>Draw</button>
                    <button onClick={() => {
                        dispatch({
                            type: 'reDeck'
                        })
                    }}>Redeck</button>
                    <button onClick={() => {
                        dispatch({
                            type: 'build',
                            payload: 'tent'
                        })
                    }}>Build tent</button>
                    <button onClick={() => {
                        dispatch({
                            type: 'build',
                            payload: 'fisherman'
                        })
                    }}>Build Fisherman</button>
                    <button onClick={() => {
                        dispatch({
                            type: 'build',
                            payload: 'lumberjack'
                        })
                    }}>Build Lumberjack</button>
                    <button onClick={() => {
                        dispatch({
                            type: 'endTurn',
                        })
                    }}>End turn</button>
                </div>
                <div className="game__events">
                    {
                        state.eventList.map((event, index) => {
                            return (
                                <div className="event" key={index}>{event.type}:{JSON.stringify(event.payload)}</div>
                            )
                        })
                    }
                </div>
                <div className="game__resources">
                    <h1>Starting Resources</h1>
                    {
                        state.resources.map((token) => {
                            return (
                                <Token token={token} key={token.uniqueID}></Token>
                            )
                        })
                    }
                </div>
                <div className="game__structures">
                    <h1>Constructs</h1>
                    {
                        state.structures.map((card, index) => {
                            return (
                                <div key={index}>{card.key}</div>
                            )
                        })
                    }
                </div>

                {state.state === EGameState.GS_Manage &&
                    <div className="game__body">
                        <h1>Manage</h1>
                        <div className="manager">
                            <div>
                                {
                                    // Card backlog. List of cards to add. Some with max count
                                    <div className="catalogue">
                                        {
                                            // List of cards in deck
                                            state.cardCatalogue.map((card, index) => (
                                                <Card card={card} onClick={() => {
                                                    dispatch({
                                                        type: 'addCardToDeck',
                                                        payload: card.uniqueID
                                                    })
                                                }}></Card>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                            <div>
                                <div className="card-list">
                                    {
                                        state.deck.map(card => (
                                            <div className="card-list__item" key={card.uniqueID} onClick={() => {
                                                dispatch({
                                                    type: 'removeCardFromDeck',
                                                    payload: card.uniqueID
                                                })
                                            }}>{card.key}</div>
                                        ))
                                    }
                                </div>
                            </div>
                            <button onClick={() => {
                                dispatch({
                                    type: 'progressState'
                                })
                            }}>Start round</button>
                        </div>
                    </div>
                }
                {state.state === EGameState.GS_Play &&
                    <div className="game__body">
                        <h1>Play</h1>
                        <div className="game__deck">
                            <div className="card card_back" onClick={() => {
                                dispatch({
                                    type: 'draw'
                                })
                            }}>
                                <span className="count">{state.deck.length}</span>
                            </div>
                            <div className="card card_back">
                                <span className="count">{state.discardPile.length}</span>
                            </div>
                        </div>
                        <TransitionGroup component="div" className="game__board">
                            {
                                state.cardPlayList.map((card) => (
                                    <Transition
                                        key={card.uniqueID}
                                        onEnter={(node) => {
                                            animateDrawCard(node, card.uniqueID || '');
                                        }}
                                        onExit={animateCardOut}
                                        addEndListener={addEndListener}
                                        timeout={500}
                                    >
                                        <Card key={card.uniqueID} card={card} onClick={(uniqueID: string) => {
                                            dispatch({
                                                type: 'removeCardFromQue',
                                                payload: uniqueID
                                            })
                                        }}></Card>
                                    </Transition>
                                ))
                            }
                            {
                                state.boardTokens.map((token) => (
                                    <Transition
                                        key={token.uniqueID}
                                        //onEnter={animateCardIn}
                                        onEnter={(node) => {
                                            animateDrawToken(node, token.uniqueID || '');
                                        }}
                                        onExit={animateCardOut}
                                        addEndListener={addEndListener}
                                        timeout={500}
                                    >
                                        <Token token={token} key={token.uniqueID}></Token>
                                    </Transition>
                                ))
                            }
                        </TransitionGroup>

                        <TransitionGroup component="div" className="game__hand">
                            {
                                state.hand.map(card => (
                                    <Transition
                                        key={card.uniqueID}
                                        appear={true}
                                        onEnter={(node) => {
                                            // Flip card on deck
                                            // Parse effect
                                            // Add to hand
                                            /*
                                            let deck = document.querySelector('.game__deck');
                                            if (deck) {
                                                //offsetElementToTarget(node, deck);
                                                reveal(node).then(() => {
                                                    // Parse effect
                                                    dispatch({ type: 'REVEAL_TOP_CARD_DONE' })

                                                    //dispatch({ type: 'ADD_CARD_TO_HAND_DONE' })
                                                    // Move to hand slot
                                                    moveHome(node).then(() => {
                                                       
                                                    })
                                                })
                                            }
                                            */

                                            animateDrawCard(node, card.uniqueID || '').then(() => {
                                                dispatch({
                                                    type: 'DRAW_DONE'
                                                })
                                            });

                                        }}
                                        onExit={animateCardOut}
                                        addEndListener={addEndListener}
                                        timeout={500}
                                    >
                                        <Card key={card.uniqueID} card={card} onClick={(uniqueID: string) => {
                                            dispatch({
                                                type: 'playCard',
                                                payload: uniqueID
                                            })
                                        }}></Card>
                                    </Transition>
                                ))
                            }
                        </TransitionGroup>

                    </div>
                }


            </div>

            <pre className="code">{JSON.stringify(state, null, 2)}</pre>
        </div>

    );
}

export default App;
