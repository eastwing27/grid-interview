import React from 'react';
import { matrixServise, apiUrl } from '../../singletons';
import { Cell } from "../cell/cell.component"

import './matrix.component.css'

type matrixProps = {}

type matrixState = {
    matrixData: number[][],
    cellRefs: React.Ref<Cell>[][]
}

export class Matrix extends React.Component<matrixProps, matrixState> {
    async componentDidMount() {
        await this.generateNewMatrix(5);
    }

    private generateNewMatrix = async (side: number) => {
        console.log(`Getting new matrix ${side}x${side} from ${apiUrl}...`);
        try {
            const data = await matrixServise.generateMatrix(side);
            const cellRefs = data.map(row => row.map(_ => React.createRef<Cell>()))
            this.setState({matrixData: data, cellRefs});
        } catch(err) {
            console.error(err);
        }
    }

    private onCellClick = () => 
        this.state.cellRefs
            .flat()
            .forEach((ref: any) => ref.current.setState({showCounter: false}))

    private onMouseInCell = (group: number[][]) => 
       this.state.cellRefs
            .flat()
            .filter((ref: any) => group.some(cell => ref.current.props.x === cell[0] && ref.current.props.y === cell[1]))
            .forEach((ref: any) => ref.current.setState({hovered: true}));
    
    private onMouseOutCell = () => 
        this.state.cellRefs
            .flat()
            .forEach((ref: any) => ref.current.setState({hovered: false}));

    private renderCell = (isFilled: boolean, x: number, y: number) => 
        <Cell 
            filled={isFilled} 
            x={x} 
            y={y} 
            onClick={this.onCellClick} 
            onMouseIn={this.onMouseInCell}
            onMouseOut={this.onMouseOutCell}
            ref={this.state.cellRefs[x][y]} 
            key={`${x}${y}`}
        />;

    private renderRow = (x: number, row: number[]) =>
        (row.map((cell, y) => this.renderCell(cell !== 0, x, y)));

    private renderMatrix = () => {
      const data = this.state?.matrixData || [];
      return data.map((row, x) => (
        <div className="board-row" key={`${x}${row}`}>
            {this.renderRow(x, row)}
        </div>
      ));
    }

    render() {
        return (
            <div className="matrix">
                {this.renderMatrix()}
            </div>
        )
    }
}