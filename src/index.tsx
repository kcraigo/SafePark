import * as React from 'react';
import App from './components/App';
import { HashRouter } from 'react-router-dom';
import { initializeIcons } from '@uifabric/icons';
import { render } from 'react-dom';

initializeIcons();

var topComponent =
    <HashRouter>
        <App/>
    </HashRouter>;

var target = document.getElementById('react-target');

render(topComponent, target);
