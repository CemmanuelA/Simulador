import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';


import Process  from '../Presentational/Process.jsx';






const mapStateToProps = state => {
    
    return{
        collection: state.machine.collection,
    };
    
};


const  updateMachine = id => dispatch =>{
           
                dispatch({type:"UPDATE_MACHINE",
                      id:id}).then(()=>dispatch({type:"SHOW_MACHINE",show:true}));
        }

const mapDispatchToProps = dispatch =>{
    
    return{
        
        handleProperties(id){
            dispatch({type:"SHOW_PROPERTIES",
                      id:id});
        },
       updateMachine(id){
           
                dispatch({type:"UPDATE_MACHINE",
                      id:id}),
                      
                dispatch({type:"SHOW_MACHINE",show:true});
        },        
       
       deleteMachine(id){
            dispatch({type:"DELETE_MACHINE",
                      id:id})
        }
    
    };
};



const ContainerProcess = connect(mapStateToProps,mapDispatchToProps)(Process);

export default ContainerProcess;