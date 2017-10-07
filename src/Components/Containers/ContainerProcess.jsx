import React from 'react';
import { Process } from '../Presentational/Process.jsx'

export class ContainerProcess extends React.Component{
    
     constructor(props){
        super(props);
        this.state = { properties: false,
                        name:''
        };
        this.handleToggle = this.handleToggle.bind(this);
    }
//---------------------------------------------------------------------------------------------------------------------------------------------------

    handleToggle(){
        this.setState(prevState =>({
          properties: !prevState.properties
        }));
    }
    
    
    
    
    render(){
        return <Process />
    }
}