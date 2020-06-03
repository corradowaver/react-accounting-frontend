import React, {Component} from 'react';
import './App.css';

import AccountingApp from './component/AccountingApp';

const PORT = process.env.PORT

class App extends Component {
    render() {
        return (
            <div className="container">
                <AccountingApp/>
            </div>
        );
    }
}

export default App;
