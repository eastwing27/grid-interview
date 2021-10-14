import React from 'react';
import { matrixServise } from '../../singletons';
import './cell.component.css'

type cellProps = {
    filled: boolean,
    x: number,
    y: number,
    onClick: () => void
}

type cellState = {
    group: number[][],
    showCounter: boolean
}

export class Cell extends React.Component<cellProps, cellState> {
    private get counter() {
        return this.state?.showCounter 
            ? <span className="counter">{this.state.group.length}</span>
            : undefined;
    }

    private getGroup = async () => {
        if (!this.props.filled)
            return;

        const group = await matrixServise.getGroup(this.props.x, this.props.y);
        this.setState({group})
    }

    private showCounter = () => {
        if (!this.props.filled)
            return;

        this.props.onClick();
        this.setState({showCounter: true})
    }

    componentDidMount() {
        this.setState({showCounter: false, group: []})
    }

    render() {
        const cellClass = this.props.filled ? "filled" : "empty";
        return (
            <button className={`cell ${cellClass}`} onMouseEnter={this.getGroup} onClick={this.showCounter}>
                {this.counter}
            </button>
        )
    }

}