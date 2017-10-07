import React from 'react';
import  showMachine  from '../../actionCreators.jsx';
import { connect } from 'react-redux';
import { Process } from    './Process.jsx';
import   ContainerMachine  from '../Containers/Modals/ContainerMachine.jsx';
import  OtherProcess  from './Modals/OtherProcess.jsx';
import {Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Row, Col } from 'react-bootstrap';



class Main extends React.Component{
    
    
    
    
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------  
       render(){

              return (<div>
                  
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Nav id="nav" bsStyle="tabs" onSelect={(SelectedKey)=>this.props.handleSeleted(SelectedKey)} >
                                 <NavDropdown  className="tab" eventKey={1} title="Proyecto" id="nav-dropdown">
                                            
                                    <MenuItem  eventKey={1.1} >Nuevo</MenuItem>
                                    <MenuItem  eventKey={1.2} >Abrir</MenuItem>
                                    <MenuItem  eventKey={1.3} >Guardar</MenuItem>
                                 </NavDropdown>
                                 <NavItem eventKey={2}><Glyphicon glyph="print"/> Agregar máquina </NavItem>
                                 <NavItem eventKey={3}><Glyphicon glyph="plus-sign"/> Agregar proceso</NavItem>
                                 <NavItem eventKey={4}><Glyphicon glyph="tint"/>Sumador de agua </NavItem>
                                 <NavItem eventKey={5}><Glyphicon glyph="fire"/> Sumador de gas </NavItem>
                                 <NavItem eventKey={6}><Glyphicon glyph="flash"/> Sumador de electricidad </NavItem>
                                 <NavItem eventKey={7}><Glyphicon glyph="play"/> Simular </NavItem>
                        </Nav>
                    </Col>
                </Row>
                
                 <ContainerMachine/>
                 <OtherProcess/>
                 <Process />
                 
              </div>);
   
       }

}


const mapDispatchToProps = dispatch => {
    return{
        handleSeleted(SelectedKey){
             switch (SelectedKey) {
                 case 2:
                     dispatch({type:"SHOW_MACHINE",show:true});
                     break;
                case 3: 
                    dispatch({type:"SHOW_OTHER_PROCESS",show:true});
                    break;
                 
                 default:
                     // code
             }
            }
        
    };
    
};

export default connect(null,mapDispatchToProps)(Main);

