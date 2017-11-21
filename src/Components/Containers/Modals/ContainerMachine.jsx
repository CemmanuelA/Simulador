import React from 'react';
import { connect } from 'react-redux';

import  Machine  from '../../Presentational/Modals/Machine.jsx';







//----------------------------------------------------------------------------------------------------------------------------------------------
 //Valida que el nombre sea mayor a 5 caracteres(numero o letra)
 
 const getValidationState= () => {
    const length = this.state.value.length;
    if (length > 5) return 'success';
    else if (length > 0) return 'error';
  }
  
 
//----------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------- 



const mapStateToProps = state =>{
        return{
              
              show: state.show.showMachine,
              name: state.machine.name,
              inputs: state.machine.inputs,
              outputs: state.machine.outputs,
              inSelected: state.machine.inSelected,
              outSelected: state.machine.outSelected,
              update: state.machine.update,
              disable: state.machine.disable
                      
        };
};

const mapDispatchToProps = dispatch =>{
   
        return {
                    handleInputChange(event,key){
                      
                        dispatch({type:"CHANGE_MACHINE",event:event,key:key});
                        
                    },
                    
                    close() {
                              dispatch({type:"SHOW_MACHINE",show:false});
                            },
                    handleSubmit(event){
                        dispatch({type:"CREATE_MACHINE", event:event});
                    }
                    
                };
        
    
};

const ContainerMachine = connect(mapStateToProps,mapDispatchToProps)(Machine);

export default ContainerMachine;