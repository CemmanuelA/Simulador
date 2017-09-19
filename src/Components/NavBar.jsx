import React from 'react';
import {Nav, NavItem, NavDropdown, MenuItem, inverse } from 'react-bootstrap';
import { Machine } from './Modals/Machine.jsx';
import { OtherProcess } from './Modals/OtherProcess.jsx';
//----------------------------------------------------------------------------------------------------------------------------------------------
export class Navbar extends React.Component{
    constructor(props){
      super(props);
      this.state= { showModalM: false,
                    showModalP: false,
                    
      };
      this.handleSelect = this.handleSelect.bind(this);
      this.updateProcess = this.updateProcess.bind(this);
      var handleM;
    }
//----------------------------------------------------------------------------------------------------------------------------------------------
handleSelect(selectedKey){
     switch (selectedKey) {
       case 2:
           this.setState(prevState => ({
                 showModalM: !prevState.showModalM,
               }));
               
         break;
       case 3:
            this.setState(prevState => ({
                 showModalP: !prevState.showModalP,
                 }));
         break;
       default:

     }
}
//----------------------------------------------------------------------------------------------------------------------------------------------
updateProcess(nameM, inputs, outputs){
    
    this.props.updateProcess(nameM, inputs,outputs);
}

//----------------------------------------------------------------------------------------------------------------------------------------------
    render(){
      return(
        <div>
        <Nav id="nav" bsStyle="tabs" onSelect={this.handleSelect} >
            <NavDropdown  className="tab" eventKey={1} title="Proyecto" id="nav-dropdown">
                <MenuItem  eventKey={1.1} >Nuevo</MenuItem>
                <MenuItem  eventKey={1.2} >Abrir</MenuItem>
                <MenuItem  eventKey={1.3} >Guardar</MenuItem>
            </NavDropdown>
            <NavItem eventKey={2}>Agregar máquina</NavItem>
            <NavItem eventKey={3}>Nuevo proceso</NavItem>
            <NavItem eventKey={4}> Sumador de agua </NavItem>
            <NavItem eventKey={5}> Sumador de gas </NavItem>
            <NavItem eventKey={6}> Sumador de electricidad </NavItem>
            <NavItem eventKey={7}> Simular </NavItem>
        </Nav>
    
    <Machine showModalM={this.state.showModalM} handleSelect={this.handleSelect} newMachine={this.updateProcess}/>
    <OtherProcess showModalP={this.state.showModalP} handleSelect={this.handleSelect} />
    

    </div>
      );
    }
}
