import React from 'react';
import { Process } from './Process.jsx'; 


export class Box extends React.Component{
    constructor(props){
    super(props);
    this.state = {process: 'Este es el proceso Principal',
                  };

    }

    render(){
        return(
            <div className="container">
              <Process  process={this.state.process} />
            </div>);

    }
}
