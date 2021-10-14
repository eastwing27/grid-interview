import React from 'react';
import { matrixServise } from '../../singletons';
import './cell.component.css'

type cellProps = {
    filled: boolean,
    x: number,
    y: number,
    onClick: () => void,
    onMouseIn: (group: number[][]) => void,
    onMouseOut: () => void
}

type cellState = {
    group: number[][],
    showCounter: boolean,
    hovered: boolean
}

export class Cell extends React.Component<cellProps, cellState> {
    private get counter() {
        return this.state?.showCounter 
            ? <span className="counter">{this.state.group.length}</span>
            : undefined;
    }

    private onMouseIn = async () => {
        if (!this.props.filled)  return;

        const group = await matrixServise.getGroup(this.props.x, this.props.y);
        this.setState({group})
            
        this.props.onMouseIn(this.state.group);
    }

    private onMouseOut = () => this.props.onMouseOut();

    private showCounter = () => {
        if (!this.props.filled)  return;

        this.props.onClick();
        this.setState({showCounter: true})
    }

    componentDidMount() {
        this.setState({showCounter: false, group: []})
    }

    render() {
        const cellClass = this.state?.hovered 
            ? "hover" 
            : this.props.filled 
                ? "filled" 
                : "empty";
        return (
            <button 
                className={`cell ${cellClass}`} 
                onMouseEnter={this.onMouseIn} 
                onMouseLeave={this.onMouseOut} 
                onClick={this.showCounter}
            >
                {this.counter}
            </button>
        )
    }

}