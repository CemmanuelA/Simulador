import React from 'react';
import { connect } from 'react-redux';
import {Button ,Modal} from 'react-bootstrap';

class OtherProcess extends React.Component{

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
           <Modal.Title id="contained-modal-title">Agregar proceso</Modal.Title>
         </Modal.Header>
         <Modal.Body className="modalContent">
           Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={this.props.close} bsStyle="success" className="btn-submit" >Close</Button>
         </Modal.Footer>
       </Modal>

      </div>);
  }

}

const mapStateToProps = state =>{
    
       return{
            show: state.show.showProcess,
            
       };
} ;

const mapDispatchToProps = dispatch =>{
  
    return{
         close(){
            dispatch({type:"SHOW_OTHER_PROCESS",show:false});
        }
    };  
};

export default connect(mapStateToProps,mapDispatchToProps)(OtherProcess);