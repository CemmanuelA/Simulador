import React from 'react';
import {Button ,Modal} from 'react-bootstrap';

export class OtherProcess extends React.Component{

  constructor(props) {
  super(props);
    
  }

  componentWillReceiveProps(nextProps) {
    /*Mostrar las propiedades
    if (this.state.Modalp != nextProps.ModalProcess){
       this.setState({ Modalp: nextProps.ModalProcess});
     }*/
  }


  render(){
    let close = () => this.props.handleSelect(3);
    return(
      <div className="modal-container">
       <Modal
         show={this.props.showModalP}
         onHide={close}
         container={this}
         aria-labelledby="contained-modal-title"
         className="modal-container"
       >
         <Modal.Header closeButton>
           <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
         </Modal.Header>
         <Modal.Body className="modal-body">
           Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={close} bsStyle="success" className="btn-submit" >Close</Button>
         </Modal.Footer>
       </Modal>

      </div>);
  }

}
