import React from 'react';
import {Nav, NavItem, NavDropdown, MenuItem, } from 'react-bootstrap';
import { Machine } from './Modals/Machine.jsx';
import { OtherProcess } from './Modals/OtherProcess.jsx';

export class Navbar extends React.Component{
    constructor(props){
      super(props);
      this.state= { ModalMachine: false,
                    ModalProcess: false,};
      this.handleSelect = this.handleSelect.bind(this);
    }

handleSelect(selectedKey){
     switch (selectedKey) {
       case 2.1:
           this.setState(prevState => ({
                 ModalMachine: !prevState.ModalMachine
               }));
         break;
       case 2.2:
            this.setState(prevState => ({
                 ModalProcess: !prevState.ModalProcess
                 }));
         break;
       default:

     }
}
    render(){
      return(
        <div>
        <Nav bsStyle="tabs" onSelect={this.handleSelect} >

        <NavDropdown  eventKey={1} title="Proyecto" id="nav-dropdown">
            <MenuItem eventKey={1.1} >Nuevo</MenuItem>
            <MenuItem eventKey={1.2} >Abrir</MenuItem>
            <MenuItem eventKey={1.3} >Guardar</MenuItem>
        </NavDropdown>
        <NavDropdown  eventKey={2} title="Agregar" id="nav-dropdown">
            <MenuItem eventKey={2.1}>Agregar máquina</MenuItem>
            <MenuItem eventKey={2.2}>Nuevo proceso</MenuItem>
        </NavDropdown>
       <NavItem eventKey={3}> Sumadores </NavItem>
       <NavItem eventKey={4}> Simular </NavItem>
    </Nav>

     <OtherProcess show={this.state.ModalProcess}/>
    <div id="time"> </div>

    </div>
      );
    }
}
