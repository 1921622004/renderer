import React, { Component } from "react";

export default class Counter extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: props.initialCount
        }
    }
    render(){
        const { count } = this.state;
        return (
            <div>
                <button> - </button>
                <span>{count}</span>
                <button> + </button>
            </div>
        )
    }
}