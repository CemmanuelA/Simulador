import React from 'react';
import { connect } from 'react-redux';
import {Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';


function range(num,op) {
    const result = [];
    for (let i = 0; i < num; i += 1) {
        
       if( op == 0 ){
            result.push("Entrada " + i);
       }else{
           
            result.push("Salida " + i);
       }
    }
    return result;
}

function type(op){
    switch (op) {
        
        case 'agua':
             return(
                 <FormGroup>
                    <ControlLabel>Temperatura</ControlLabel>
                    <FormControl
                         type="text"
                         name="name"
                         value=''/>
                    <ControlLabel>Flujo</ControlLabel>
                    <FormControl
                         type="text"
                         name="flow"
                         value=''/>
              </FormGroup>)
        case 'gas':
             return(
                 <FormGroup>
                    <ControlLabel>Temperatura</ControlLabel>
                    <FormControl
                         type="text"
                         name="name"
                         value=''/>
                    <ControlLabel>Flujo</ControlLabel>
                    <FormControl
                         type="text"
                         name="flow"
                         value=''/>
              </FormGroup>)

        case 'electricidad':
             return(
                 <FormGroup>
                    <ControlLabel>Amperios</ControlLabel>
                    <FormControl
                         type="text"
                         name="amperage"
                         value=''/>
                    <ControlLabel>Voltaje</ControlLabel>
                    <FormControl
                         type="text"
                         name="volts"
                         value=''/>
              </FormGroup>)

        
    }
}

var Properties = ({show, collection,valueIn,valueOut, handleInputChange,indexIn,indexOut}) => {
        
    

    
     if(collection.length > 0 && show != null){
       return (
           <Form>
              <h4>Propiedades de máquina<strong>{" " + collection[show].name }</strong></h4>
              <FormGroup>
                 
                  <FormControl componentClass="select" name="valueIn" value={valueIn} onChange={(event) => handleInputChange(event,collection[show].inputs)}>
                    {range(collection[show].inputs,0).map(i=>{
                    
                        return <option key={i} value={i}>{i}</option>;
                    })}
                    
                 </FormControl>
                 <ControlLabel>Tipo: {" "+collection[show].inSelected[indexIn].toUpperCase()} </ControlLabel>
              </FormGroup>
              {type(collection[show].inSelected[indexIn])}
              
              <FormGroup>
                  <FormControl componentClass="select" name="valueOut" value={valueOut} onChange={(event) => handleInputChange(event,collection[show].outputs)}>
                        {range(collection[show].outputs,1).map(i=>{
                        
                            return <option key={i} value={i}>{i}</option>;
                        })}
                    
                  </FormControl>
                  <ControlLabel>Tipo: {" "+collection[show].outSelected[indexOut].toUpperCase()} </ControlLabel>
              
              </FormGroup>
                         
           </Form>
          );

     }
     
   return null;
  
 
};


const mapStateToProps = state =>{
    
    return{
      show: state.show.showProperties,
      valueIn: state.properties.valueIn,
      valueOut: state.properties.valueOut,
      indexIn: state.properties.indexIn,
      indexOut: state.properties.indexOut,
      collection: state.machine.collection
      
    };
    
};

const mapDispatchToProps = dispatch =>{
    
    return{
        handleInputChange(event,limit){
            dispatch({type:"CHANGE_INPUTS_PROPERTIES",
                      event:event,
                      limit:limit
            })
        }
        
    };
    
};

export default connect(mapStateToProps,mapDispatchToProps)(Properties);

