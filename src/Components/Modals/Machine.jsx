import React from 'react';
import {Button ,Modal, Form, FormGroup, FormControl, ControlLabel, HelpBlock,} from 'react-bootstrap';
import { InOut} from './InOut.jsx';
export class Machine extends React.Component{

  constructor(props) {
  super(props);
    this.state = { show: false,
                    machine:'',
                    inputs: 1,
                    outputs: 1};
  var machines = [];
   this.getValidationState = this.getValidationState.bind(this);
   this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //Mostrar Modal
    if (this.state.show != nextProps.show){
       this.setState({ show: nextProps.show});
     }
  }
 //Valida que el nombre sea mayor a 5 caracteres(numero o letra)
  getValidationState() {
    const length = this.state.value.length;
    if (length > 5) return 'success';
    else if (length > 0) return 'error';
  }


//Manejo de entradas de eventos
  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  entrys(){

      for(let i = 0 ; i < this.state.inputs ; i++) {
        let type = 'Entrada ' + (i+1);
         <InOut type={type} />
      }
    }

  outcomes(){

      for(let i = 0 ; i < this.state.inputs ; i++) {
        let type = 'Salida ' + (i+1);
       <InOut type='Salida'/>
    }

  }



  render(){
    let close = () =>this.setState({show: false});
    return(
      <div id="machine" className="modal-container">
       <Modal
         show={this.state.show}
         onHide={close}
         container={this}
         aria-labelledby="contained-modal-title"
       >
         <Modal.Header closeButton>
           <Modal.Title id="contained-modal-title">Crear Máquina</Modal.Title>
         </Modal.Header>

         <Modal.Body>
            <Form horizontal>

                <FormGroup
                  controlId="formBasicText"
                >
                    <ControlLabel>Máquina</ControlLabel>
                    <FormControl
                      type="text"
                      name="machine"
                      value={this.state.machine}
                      placeholder="Nombre"
                      onChange={this.handleInputChange}
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
                  />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Salidas</ControlLabel>
                <FormControl
                  type="number"
                  name="outputs"
                  value= {this.state.outputs}
                  onChange={this.handleInputChange}
                  />
              </FormGroup>

              <FormGroup>
                  {this.entrys}
              </FormGroup>

              <FormGroup>
                  {this.outcomes}
              </FormGroup>

            </Form>

         </Modal.Body>
         <Modal.Footer>
           <Button  type="submit" onClick={close}>Crear</Button>
         </Modal.Footer>
       </Modal>

      </div>);
  }

}
