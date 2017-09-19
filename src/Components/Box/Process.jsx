import React from 'react';
import { Col } from 'react-bootstrap';
import { Properties } from './Properties.jsx';
import { Processes } from './Processes.jsx';

export class Process extends React.Component{

    constructor(props){
        super(props);
        this.state = { properties: false,
                        name:''
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(){
        this.setState(prevState =>({
          properties: !prevState.properties
        }));
    }
    
    componentWillReceiveProps(nextProps){
        this.setState = ({
            name: nextProps.nameM
        });
        
    }
    
    render(){
        return(
            <Col md={2} lg={2} className="container">
           
                <h3 className="Title">{this.props.nameM}</h3>
                <h4 className="Item" onClick={this.handleToggle }>{this.state.name}</h4>
                <h4 className="Item" >Máquina 2</h4>
                <h4 className="Item">Máquina 3</h4>
                <Processes  />
                <Properties show={this.state.properties}/>
            </Col>);
    }
}
