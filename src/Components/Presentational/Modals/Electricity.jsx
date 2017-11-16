import React from 'react';
import { connect } from 'react-redux';
import {Button ,Modal, Form, FormGroup, FormControl, ControlLabel, Row, Col} from 'react-bootstrap';

class Electricity extends React.Component{

  render(){
    return(
        
      <div>
       <Modal
         show={this.props.show}
         onHide={this.props.close}
         container={this}
         aria-labelledby="contained-modal-title"
         className="modal-container"
       >
         <Modal.Header closeButton>
           <Modal.Title id="contained-modal-title">Agregar sumador de Electricidad</Modal.Title>
         </Modal.Header>
         <Modal.Body className="modalContent">
            <Form onSubmit={(event) => {this.props.handleSubmit(event); this.props.close()}}>
                
                <FormGroup>
                  <Row>
                     <Col sm={12} md={12} lg={12}>
                        <ControlLabel>Entradas</ControlLabel>
                        <FormControl
                            type="number"
                            name="inAdderElectricity"
                            value={this.props.inAdderElectricity}
                            placeholder="Entradas"
                            onChange={(event) =>this.props.handleInputChange(event)}
                        />
                     </Col>
                  </Row>
                </FormGroup>
                <Button type="submit"  value="Submit" bsStyle="success" className="btn-submit">Crear</Button>
            </Form>
          
         </Modal.Body>
       </Modal>

      </div>);
  }

}

const mapStateToProps = state =>{
    
       return{
            show: state.show.showElectricity,
            inAdderElectricity: state.adder.inAdderElectricity,
       };
};

const mapDispatchToProps = dispatch =>{
  
    return{
         close(){
            dispatch({type:'SHOW_ELECTRICITY',show:false});
        },
        handleInputChange(event){
            dispatch({type:'CHANGE_ADDER',event:event});
        },
        handleSubmit(event){
            dispatch({type:'CREATE_ADDER_ELECTRICITY',event:event})
        }
    };  
};

export default connect(mapStateToProps,mapDispatchToProps)(Electricity);