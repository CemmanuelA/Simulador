import React from 'react';
import { connect } from 'react-redux';
import {Button ,Modal, Form, FormGroup, FormControl, ControlLabel, Row, Col} from 'react-bootstrap';

class Water extends React.Component{

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
           <Modal.Title id="contained-modal-title">Agregar sumador de agua</Modal.Title>
         </Modal.Header>
         <Modal.Body className="modalContent">
            <Form onSubmit={(event) => {this.props.handleSubmit(event); this.props.close()}}>
                
                <FormGroup>
                  <Row>
                     <Col sm={5} md={5} lg={5}>
                        <ControlLabel>Entradas</ControlLabel>
                        <FormControl
                            type="number"
                            name="inAdderWater"
                            value={this.props.inAdderWater}
                            placeholder="Entradas"
                            onChange={(event) =>this.props.handleInputChange(event)}
                        />
                     </Col>
                    
                     <Col sm={5} md={5} lg={5} smOffset={1} mdOffset={1} lgOffset={1}>
                         <ControlLabel>Salidas</ControlLabel>
                        <FormControl
                            type="number"
                            name="outAdderWater"
                            value={this.props.outAdderWater}
                            placeholder="Salidas"
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
            show: state.show.showWater,
            inAdderWater: state.adder.inAdderWater,
            outAdderWater: state.adder.outAdderWater,
       };
};

const mapDispatchToProps = dispatch =>{
  
    return{
         close(){
            dispatch({type:'SHOW_WATER',show:false});
        },
        handleInputChange(event){
            dispatch({type:'CHANGE_ADDER',event:event});
        },
        handleSubmit(event){
            dispatch({type:'CREATE_ADDER_WATER',event:event})
        }
    };  
};

export default connect(mapStateToProps,mapDispatchToProps)(Water);