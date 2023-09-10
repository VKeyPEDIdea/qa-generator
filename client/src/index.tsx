import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'app/index';
import store from 'features/store';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <HashRouter>
            <App store={store} />
        </HashRouter>
    </React.StrictMode>
);

