import React from 'react';
import MyCustomRenderer from "./renderer";
// import { render } from "react-dom";
import './index.css';
import App from './App';

MyCustomRenderer.render(<App />, document.getElementById('root'),() => {
    console.log('aftercommit');
});
// render(<App />, document.getElementById('root'));