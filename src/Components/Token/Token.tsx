import * as React from 'react';
import Emoji from '../Emoji';
import { IToken } from '../../App.Types';


const tokens: {[key:string]: any} = {
    labour: '👨',
    food: '🍗',
    wood: '🌲',
    wealth: '💰'
}

interface IProps {
    token: IToken,
}

const Token = (props: IProps) => (
    <div className="token">
        <Emoji symbol={tokens[props.token.key]} label={props.token.key}></Emoji>
    </div>

);

export default Token;
