import React from 'react';
import  showMachine  from '../../../actionCreators.jsx';
import {Button ,Modal, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Col, Row} from 'react-bootstrap';
import { InOut } from './InOut.jsx';




function range(num) {
    const result = [];
    for (let i = 0; i < num; i += 1) {
        result.push(i);
    }
    return result;
}

export const Machine = ({show, inputs, outputs, name, inSelected,outSelected,close, handleInputChange, handleSubmit}) =>{

    return(
    
      <div>
       <Modal
         show={show}
         onHide={close}
         
         aria-labelledby="contained-modal-title"
         >
         
            <Modal.Header closeButton>
                <Modal.Title>Crear Máquina</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modalContent" >
         
             
                <Form horizontal onSubmit={(event) => handleSubmit(event)}>
                    
                     <Row>
                         <Col sm={11} md={11} lg={11}>
                            <FormGroup>
                                <ControlLabel>Máquina</ControlLabel>
                                <FormControl
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Nombre"
                                    onChange={(event) => handleInputChange(event,0)}
                                   
                                   
                                />
                                <FormControl.Feedback />
                                <HelpBlock>Validation is based on string length.</HelpBlock>
                            </FormGroup>
                        </Col>
                     </Row>
                    
                   
                   <Row>
                   
                         <Col md={5} lg={5}>
                             <FormGroup>
                              <ControlLabel>Entradas</ControlLabel>
                              <FormControl
                                type="number"
                                name="inputs"
                                value= {inputs}
                                onChange={(event) => handleInputChange(event,0)}

                                />
                            </FormGroup>
                         </Col>
                     
                        <Col md={5} lg={5} mdOffset={1} lgOffset={1}>
                            <FormGroup>
                                <ControlLabel>Salidas</ControlLabel>
                              <FormControl
                                type="number"
                                name="outputs"
                                value= {outputs}
                                onChange={(event) => handleInputChange(event,0)}
                                 
                                />
                            </FormGroup>
                        </Col>
                   </Row>
                    
                   <Row>
                        <Col md={4} lg={4} mdOffset={1} lgOffset={1}>
                        {
                            range(inputs).map((i) => (
                                  <InOut key={i} index={i} type={'Entrada '+i} name="inSelected" value={inSelected[i] || "agua"} handleInputChange={handleInputChange}/> ))}
                                  
                        </Col>
                    
                        <Col md={4} lg={4} mdOffset={1} lgOffset={1}>
                        {
                            range(outputs).map((i) => (
                                  <InOut key={i} index={i} type={'Salida '+i} name="outSelected" value={outSelected[i] || "agua"} handleInputChange={handleInputChange}/>))}
                        </Col>
                  </Row>
                    
                  
                   <Button type="submit"  value="Submit" bsStyle="success" className="btn-submit">Crear</Button>
                  
                </Form>

            </Modal.Body>
            
            <Modal.Footer>
           
            </Modal.Footer>
       </Modal>

      </div>);

};



export default Machine;
