import React from 'react';
import MyCustomRenderer from "./renderer";
import './index.css';
import App from './App';

MyCustomRenderer.render(<App />, document.getElementById('root'));
