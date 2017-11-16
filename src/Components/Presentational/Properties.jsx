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

function type(op,indexOut,collection,show,handleExpressionChange){
    switch (op) {
        
        case 'agua':
             return(<FormGroup>
                            <FormControl
                                    type="text"
                                    value={collection[show].expresions[indexOut].param1}
                                    name='param1'
                                    placeholder={"F" + indexOut}
                                    onChange={(event) => handleExpressionChange(event,show,indexOut)}
                                   
                                   
                                />
                            <FormControl
                                    type="text"
                                    value={collection[show].expresions[indexOut].param2}
                                    name='param2'
                                    placeholder={"T" + indexOut}
                                    onChange={(event) => handleExpressionChange(event,show,indexOut)}
                                   
                                   
                                />
                            
                    </FormGroup>)  
                
        case 'gas':
              return(<FormGroup>
                            <FormControl
                                    type="text"
                                    value={collection[show].expresions[indexOut].param1}
                                    name='param1'
                                    placeholder={"F" + indexOut}
                                    onChange={(event) => handleExpressionChange(event,show,indexOut)}
                                   
                                   
                                />
                            <FormControl
                                    type="text"
                                    value={collection[show].expresions[indexOut].param2}
                                    name='param2'
                                    placeholder={"T" + indexOut}
                                    onChange={(event) => handleExpressionChange(event,show,indexOut)}
                                   
                                   
                                />
                            
                    </FormGroup>)

        case 'electricidad':
              return(<FormGroup>
                            <FormControl
                                    type="text"
                                    value={collection[show].expresions[indexOut].param1}
                                    name='param1'
                                    placeholder={"V" + indexOut}
                                    onChange={(event) => handleExpressionChange(event,show,indexOut)}
                                   
                                   
                                />
                            <FormControl
                                    type="text"
                                    value={collection[show].expresions[indexOut].param2}
                                    name='param2'
                                    placeholder={"A" + indexOut}
                                    onChange={(event) => handleExpressionChange(event,show,indexOut)}
                                   
                                   
                                />
                            
                    </FormGroup>)

        
    }
    //{type(collection[show].inSelected[indexIn])}
}

var Properties = ({show, collection,valueIn,valueOut, handleInputChange,indexIn,indexOut,handleExpressionChange}) => {
        
    

    
     if(collection.length > 0 && show != null){
         const tipo = collection[show].outSelected[indexOut];
       return (
           <Form>
              <h4><strong>{collection[show].name }</strong></h4>
              <FormGroup>
                 
                  <FormControl componentClass="select" name="valueIn" value={valueIn} onChange={(event) => handleInputChange(event,collection[show].inputs)}>
                    {range(collection[show].inputs,0).map(i=>{
                    
                        return <option key={i} value={i}>{i}</option>;
                    })}
                    
                 </FormControl>
                 <ControlLabel>Tipo: {" "+collection[show].inSelected[indexIn].toUpperCase()} </ControlLabel>
              </FormGroup>
              
              
              <FormGroup>
                  <FormControl componentClass="select" name="valueOut" value={valueOut} onChange={(event) => handleInputChange(event,collection[show].outputs)}>
                        {range(collection[show].outputs,1).map(i=>{
                        
                            return <option key={i} value={i}>{i}</option>;
                        })}
                  </FormControl>
                  <ControlLabel>Tipo: {" "+ tipo.toUpperCase()} </ControlLabel>
              
              </FormGroup>
              
             { type(tipo,indexOut,collection,show,handleExpressionChange)}
                         
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
        },
        handleExpressionChange(e,indexM,indexO){
            dispatch({type:'CHANGE_EXPRESSION',e:e,indexM:indexM,indexO:indexO});
        }
        
    };
    
};

export default connect(mapStateToProps,mapDispatchToProps)(Properties);

