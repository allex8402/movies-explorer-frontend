import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/App';

function Root() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default Root;