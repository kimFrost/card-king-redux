import * as React from 'react';
import Token from './../Token/Token';
import { ICard, IValueSet } from '../../App.Types';


const srcPath = 'images/cards/';

interface IProps {
    card: ICard;
    onClick?: (uniqueID: string) => void;
}

interface IState {

}

class Card extends React.Component<IProps, IState> {

    renderValueSet = (valueSet:IValueSet) => {
        const tokens = [];
        for (let i = 0; i < valueSet.value; i++) {
            tokens.push(<Token token={{
                key: valueSet.key
            }}></Token>)
        }
        return tokens;

        /*
        return movies.map((movie) => {
            return (
                <Movie movie={movie} />
            );
        });
        */

       //movies.map((movie) => <Movie movie={movie} />)
    }

    public render() {
        const {
            card
        } = this.props;
        return (

            <div className="card" key={card.uniqueID} data-id={card.uniqueID} onClick={() => {
                if (this.props.onClick && card.uniqueID) {
                    this.props.onClick(card.uniqueID)
                }
            }}>
                <div className="card__cost">
                    {card.cost &&
                        card.cost.map((valueSet) => {
                            return this.renderValueSet(valueSet);
                        })
                    }
                </div>

                <div className="card__title">{card.key}</div>

                {card.imageSrc &&
                    <img src={srcPath + card.imageSrc} alt={card.key} className="card__image" />
                }

                {card.effects ? (
                    card.effects.map((effect, index) => {
                        return (
                            <div key={index}>
                                {effect.input &&
                                    <div>{effect.input.key}:{effect.input.value}</div>
                                }
                                {effect.output &&
                                    <div>{effect.output.key}:{effect.output.value}</div>
                                }
                            </div>
                        )
                    }
                    )
                ) : null
                }
            </div>
        );
    }
}

export default Card;