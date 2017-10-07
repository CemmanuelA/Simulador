import React from 'react';
import ReactDOM from 'react-dom';
import  Main from './Components/Presentational/Main.jsx';
import { Provider } from 'react-redux';
import Store from './Store.jsx'


class App extends React.Component {
    
    render(){
        
        return <Main />;
    }
}

ReactDOM.render(<Provider store={Store}>
                    <App />
                </Provider>,
                document.getElementById('app'));