import React from 'react';
import {Button ,Modal} from 'react-bootstrap';

export class OtherProcess extends React.Component{

  constructor(props) {
  super(props);
    this.state = { show: false};
  }

  componentWillReceiveProps(nextProps) {
    //Mostrar las propiedades
    if (this.state.show != nextProps.show){
       this.setState({ show: nextProps.show});
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
           <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={close}>Close</Button>
         </Modal.Footer>
       </Modal>

      </div>);
  }

}
