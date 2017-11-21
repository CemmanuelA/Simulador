import React from 'react';
import ReactDOM from 'react-dom';
import  ContainerMain from './Components/Containers/ContainerMain.jsx';
import { Provider } from 'react-redux';
import Store from './Store.jsx'


class App extends React.Component {
    
    render(){
        
        return <ContainerMain />;
    }
}

ReactDOM.render(<Provider store={Store}>
                    <App />
                </Provider>,
                document.getElementById('app'));