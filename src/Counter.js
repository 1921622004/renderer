import React, { Component } from "react";

export default class Counter extends Component {
    state = {
        count: 1
    }

    increment = () => {
        this.setState((state) => {
            return { count: state.count + 1 }
        })
    }

    decrement = () => {
        this.setState((state) => {
            return { count: state.count - 1 }
        })
    }

    render() {
        const { count } = this.state;
        return (
            <div>
                <button onClick={this.decrement}> - </button>
                <span>{count}</span>
                <button onClick={this.increment}> + </button>
            </div>
        )
    }
}