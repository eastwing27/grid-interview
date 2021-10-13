import React from "react";
import { Matrix } from './matrix/matrix.component';

import './app.component.css'

export class App extends React.Component {
    render() {
        return (
            <div className="app">
                <h1 className='title'>Pick a dark blue cell to count its group members</h1>
                <Matrix />
            </div>
        )
    }
}