import React, { Component } from 'react';
import './App.css';
import Counter from './Counter';

class App extends Component {
  render() {
    return (
      <Counter initialCount={1} />
    );
  }
}

export default App;
