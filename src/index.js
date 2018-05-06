import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import Api from '../src/lib/Api'

Api.initApi()

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
