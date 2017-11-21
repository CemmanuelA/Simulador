import React from 'react';
import { connect } from 'react-redux';


import Process  from '../Presentational/Process.jsx';






const mapStateToProps = state => {
    
    return{
        collection: state.machine.collection,
        dragItem: state.machine.dragItem
    };
    
};


const mapDispatchToProps = dispatch =>{
    
    return{
        
        handleProperties(id){
            dispatch({type:'ON_CLICK_LIST_ITEM'}),
            dispatch({type:"SHOW_PROPERTIES",
                      id:id});
        },
       updateMachine(id){
           
                dispatch({type:"UPDATE_MACHINE",
                      id:id}),
                      
                dispatch({type:"SHOW_MACHINE",show:true});
        },        
       
       deleteMachine(index,idToDelete,source){
           dispatch({type:'DELETE_CONNECTOR',id:0,idToDelete:idToDelete,source:source}),
           
           dispatch({type:'DELETE_LINE',id:0,idToDelete:idToDelete,source:source}),
           
           dispatch({type:"DELETE_MACHINE",
                     index:index});
        }
    
    };
};



const ContainerProcess = connect(mapStateToProps,mapDispatchToProps)(Process);

export default ContainerProcess;