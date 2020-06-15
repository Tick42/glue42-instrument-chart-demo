import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Glue, { Glue42 } from 'tick42-glue';

const render = (glue: Glue42.Glue) => ReactDOM.render(<App glue={glue} />, document.getElementById('root'));

Glue().then(render)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
