import * as React from 'react';

interface IProps {
    symbol: string,
    label?: string
}

const Emoji = (props:IProps) => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);

export default Emoji;
