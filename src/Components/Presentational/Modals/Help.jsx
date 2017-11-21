import React from 'react';
import { connect } from 'react-redux';
import {Button , Modal} from 'react-bootstrap';

class Help extends React.Component{

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
           <Modal.Title id="contained-modal-title">Ayuda</Modal.Title>
         </Modal.Header>
         <Modal.Body className="modalContent">
          <p><strong>Expresiones:</strong></p><br/>
          <p>Para escribir tu propia expresión para cada salida de la máquina debes tener en cuenta que para cada recurso 
          existen 2 tipos de variables las cuales se explican a continuacion:</p><br/>
           <p><strong>-</strong> Para agua existe la variable TA = Temperatura y FA = Flujo</p><br/>
           <p><strong>-</strong> Para gas existe la variable TG = Temperatura y FG = Flujo</p><br/>
           <p><strong>-</strong> Para electricidad existe la variable A = Amperaje y V = Voltaje</p><br/>
          <p>Hay que tener en cuenta que el uso de estas variables esta asociada a la cantidad de entradas que tenga la máquina, 
          es decir, si se quiere utilizar los parametros de la entrada 1 y que esta sea de tipo agua, entonces en las propiedades
          de la máquina, en el cuadro de expresiones se debe poner las variables TA0 y FA0. Con esto dicho si quieres utilizar
          cualquiera de los parametros de entrada de la máquina debes especificar la variable depediendo del tipo y su entrada </p><br/>
          
          <strong>Gramatica de las expresiones</strong><br/>
          <p>El uso de expresiones para este aplicativo esta basado en una gramatica muy basica como + , - , *, / , ^  para realizar
          las operaciones</p><br/>
          <p>Además de lo anterior se permite el uso de algunas funciones como:</p><br/>
          <p><strong>sin(x):</strong> seno de x (x en radianes)</p><br/>
          <p><strong>cos(x):</strong> seno de x (x en radianes)</p><br/>
          <p><strong>tan(x):</strong> seno de x (x en radianes)</p><br/>
          <p><strong>sqrt(x):</strong> Raíz cuadrada de x </p><br/>
          <p><strong>log(x):</strong> logaritmo natural x</p><br/>
          <p><strong>abs(x):</strong> valor absoluto de x</p><br/>
          <p><strong>exp(x):</strong> exponencial <strong>e</strong> de x </p><br/>
          <p>Para mas información consulta: <a href="https://silentmatt.com/javascript-expression-evaluator/" target="_blank">silentmatt</a></p>
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={this.props.close} bsStyle="success" className="btn-submit" >Cerrar</Button>
         </Modal.Footer>
       </Modal>

      </div>);
  }

}

const mapStateToProps = state =>{
    
       return{
            show: state.show.showHelp,
            
       };
} ;

const mapDispatchToProps = dispatch =>{
  
    return{
         close(){
            dispatch({type:"SHOW_HELP",show:false});
        }
    };  
};

export default connect(mapStateToProps,mapDispatchToProps)(Help);