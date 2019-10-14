import * as React from 'react';

interface IProps {
    onChange?: (value: number) => void;
    value?: number;
    maxValue?: number;
}

interface IState {
    value: number;
}

class Counter extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            value: props.value || 0
        }
    }

    onChange = () => {
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: parseFloat(event.target.value) }, () => {
            this.onChange();
        });
    }

    decreaseItem = () => {
        if (this.state.value > 0) {
            this.setState({
                value: this.state.value - 1
            }, () => {
                this.onChange()
            });
        }
    }

    incrementItem = () => {
        if (this.props.maxValue && this.state.value === this.props.maxValue) {
            return;
        }
        this.setState({
            value: this.state.value + 1
        }, () => {
            this.onChange()
        });
    }


    public render() {
        const {
            value
        } = this.state;
        return (
            <div>

                <button onClick={this.decreaseItem}>-</button>
                <input type="number" value={this.state.value} onChange={this.handleChange} />
                <button onClick={this.incrementItem}>++</button>
                {/*
                    onChange={(event) => {
                        this.setValue()
                    }} 
                */}

            </div>
        );
    }
}

export default Counter;