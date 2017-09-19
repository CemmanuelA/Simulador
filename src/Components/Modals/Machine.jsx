import React from 'react';
import {Button ,Modal, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Col, Row, bsStyle} from 'react-bootstrap';

import { InOut} from './InOut.jsx';

function range(num) {
    const result = [];
    for (let i = 0; i < num; i += 1) {
        result.push(i);
    }
    return result;
}

export class Machine extends React.Component{

  constructor(props) {
    
  
  super(props);
    this.state = {  name:'',
                    inputs: 1,
                    outputs: 1};
  
   var inputM = null;
   var inputI = null;
   var inputO = null;
   this.getValidationState = this.getValidationState.bind(this);
  // this.getSelectedForms = this.getSelectedForms.bind(this);
   this.handleInputChange = this.handleInputChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   
  }
//----------------------------------------------------------------------------------------------------------------------------------------------
  componentWillReceiveProps(nextProps) {
    /*Mostrar Modal
    if (this.state.modalm != nextProps.ModalMachine){
       this.setState({ modalm: nextProps.ModalMachine});
     }*/
  }
  //----------------------------------------------------------------------------------------------------------------------------------------------
 //Valida que el nombre sea mayor a 5 caracteres(numero o letra)
 
  getValidationState() {
    const length = this.state.value.length;
    if (length > 5) return 'success';
    else if (length > 0) return 'error';
  }
//----------------------------------------------------------------------------------------------------------------------------------------------

//Manejo de entradas de eventos
  handleInputChange(e) {
    e.preventDefault()
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
 //----------------------------------------------------------------------------------------------------------------------------------------------
  handleSubmit(event){
      
     this.props.newMachine(this.inputM.value, this.inputI.value, this.inputO.value);
     event.preventDefault;
  
  }
//----------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------------------------------
  render(){
    let close = () =>this.props.handleSelect(2);
    return(
      <div id="machine" >
       <Modal
         show={this.props.showModalM}
         onHide={close}
         container={this}
         aria-labelledby="contained-modal-title"
         
         
       >
         <Modal.Header closeButton>
          <Modal.Title>Crear Máquina</Modal.Title>
         </Modal.Header>

         <Modal.Body >
         
         
            <Form horizontal onSubmit={this.handleSubmit}>
                
                 
                <FormGroup>
                    <ControlLabel>Máquina</ControlLabel>
                    <FormControl
                        type="text"
                        name="name"
                        value={this.state.machine}
                        placeholder="Nombre"
                        onChange={this.handleInputChange}
                        inputRef={ input => { this.inputM = input;}}
                       
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Validation is based on string length.</HelpBlock>
                </FormGroup>
               
                <FormGroup>
                  <ControlLabel>Entradas</ControlLabel>
                  <FormControl
                    type="number"
                    name="inputs"
                    value= {this.state.inputs}
                    onChange={this.handleInputChange}
                     inputRef={ input => { this.inputI = input;}}
                    />
                </FormGroup>
             
                <FormGroup>
                    <ControlLabel>Salidas</ControlLabel>
                  <FormControl
                    type="number"
                    name="outputs"
                    value= {this.state.outputs}
                    onChange={this.handleInputChange}
                     inputRef={ input => { this.inputO = input;}}
                    />
                </FormGroup>
                
                <Row className="row-container">
                    <Col md={4} lg={4} mdOffset={1} lgOffset={1}>
                    {
                        range(this.state.inputs).map(() => (
                              <InOut type='Entrada'/> ))}
                    </Col>
                
                    <Col md={4} lg={4} mdOffset={1} lgOffset={1}>
                    {
                              range(this.state.outputs).map(() => (
                              <InOut type='Salida'/>))}
                    </Col>
                </Row>
               <Button type="submit"  value="Submit" bsStyle="success" className="btn-submit">Crear</Button>
              
            </Form>

         </Modal.Body>
         <Modal.Footer>
           
         </Modal.Footer>
       </Modal>

      </div>);
  }

}
