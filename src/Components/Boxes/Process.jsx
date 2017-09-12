import React from 'react';
import { Properties } from './Properties.jsx';
import { Processes } from './Processes.jsx';

export class Process extends React.Component{

    constructor(props){
        super(props);
        this.state = { properties: false };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(){
        this.setState(prevState =>({
          properties: !prevState.properties
        }));
    }
    render(){
        return(
            <div className="box" >
                <h3 className="Title">{this.props.process}</h3>
                <h4 className="Item" onClick={this.handleToggle }>Máquina 1</h4>
                <h4 className="Item" >Máquina 2</h4>
                <h4 className="Item">Máquina 3</h4>
                <Processes  />
                <Properties show={this.state.properties}/>
            </div>);
    }
}
