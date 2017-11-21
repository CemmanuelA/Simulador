import React from 'react';
import ReactDOM from 'react-dom';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { DragDropContext, DropTarget} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Parser } from 'expr-eval';
import * as  firebase from 'firebase'

import Main  from '../Presentational/Main.jsx';
import  { ItemTypes }       from '../../ItemTypes.jsx';
import { saveproceso } from '../../config.jsx'




const list = (array) =>{
    let List = [];
    if(array.length > 0){
  
    for (let i = 0 ; i < array.length ; i++){
        
        List[i] = i;
    }
    return List;
    
    }
    
    return List;
   
};
/*-------------------------------------------------------------------------------------------------------------------*/
function collect (connect,monitor){
    return{
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/
const boxTarget = {
	drop(props, monitor, component) {
	 	    const item = monitor.getItem();
    		if(item.source === 'list'){
    		    const delta1 = monitor.getDifferenceFromInitialOffset()
    		    const delta = monitor.getInitialSourceClientOffset();
    		    const left = Math.round(delta1.x);
    		    const top = Math.round(delta1.y);
    		    props.createDragItem(item,left,top);
    		}else{
        	        if(item.source === 'machineZone'){
        	            	const delta = monitor.getDifferenceFromInitialOffset();
                    		const left = Math.round(props.dragItem[item.index].left + delta.x);
                    		const top = Math.round(props.dragItem[item.index].top + delta.y);
                    		props.updateMachinePosition(left,top,item);
                    		let indexC;
                    		let id = props.dragItem[item.index].id
                    	    for (let i = 0; i< props.Connectors.length; i++) {
                                    if(props.Connectors[i].id === props.dragItem[item.index].id){
                                        indexC = i;
                                       break;
                                    }
                            }
                    	    list(props.Connectors[indexC].inConnectors).map((i) =>{
                    	           
                                    const topChild = ReactDOM.findDOMNode(component.state.dragMachineRefsIn[item.index][i]).offsetTop;
                                    const leftChild = ReactDOM.findDOMNode(component.state.dragMachineRefsIn[item.index][i]).offsetLeft;
                    		        props.updateConnectorPosition(id,i,'input',top+topChild,left+leftChild);
                    		    });
                    	    list(props.Connectors[item.index].outConnectors).map((i) =>{
                                    const topChild = ReactDOM.findDOMNode(component.state.dragMachineRefsOut[item.index][i]).offsetTop;
                                    const leftChild = ReactDOM.findDOMNode(component.state.dragMachineRefsOut[item.index][i]).offsetLeft;
                    		        props.updateConnectorPosition(id,i,'output',top+topChild,left+leftChild);    
                    		    });
        	            props.updateLinePosition(id,indexC);
        	        }else{
        	            if(item.source === 'waterZone'){
        	                
        	                const delta = monitor.getDifferenceFromInitialOffset();
                    		const left = Math.round(props.dragItemWater[item.index].left + delta.x);
                    		const top = Math.round(props.dragItemWater[item.index].top + delta.y);
                    	    props.updateAdderPosition(left,top,item,'water');
                    	    let indexC;
                    	    let id = props.dragItemWater[item.index].id
                    	    for (let i = 0; i< props.Connectors.length; i++) {
                                    if(props.Connectors[i].id === props.dragItemWater[item.index].id){
                                        indexC = i;
                                       break;
                                    }
                            }
                    	    list(props.Connectors[indexC].inConnectors).map((i) =>{
                                    const topChild = ReactDOM.findDOMNode(component.state.dragWaterRefsIn[item.index][i]).offsetTop;
                                    const leftChild = ReactDOM.findDOMNode(component.state.dragWaterRefsIn[item.index][i]).offsetLeft;
                    		        props.updateConnectorPosition(id,i,'input',top+topChild,left+leftChild);
                    		    });
                                    const topChild = ReactDOM.findDOMNode(component.state.dragWaterRefsOut[item.index][0]).offsetTop;
                                    const leftChild = ReactDOM.findDOMNode(component.state.dragWaterRefsOut[item.index][0]).offsetLeft;
                    		        props.updateConnectorPosition(id,0,'output',top+topChild,left+leftChild);    
                    	    props.updateLinePosition(id,indexC);
        	            }else{
            	                if(item.source === 'gasZone'){
            	                
                	                const delta = monitor.getDifferenceFromInitialOffset();
                            		const left = Math.round(props.dragItemGas[item.index].left + delta.x);
                            		const top = Math.round(props.dragItemGas[item.index].top + delta.y);
                            	    props.updateAdderPosition(left,top,item,'gas');
                            	    let indexC;
                            	    let id = props.dragItemGas[item.index].id;
                            	    for (let i = 0; i< props.Connectors.length; i++) {
                                            if(props.Connectors[i].id === props.dragItemGas[item.index].id){
                                                indexC = i;
                                               break;
                                            }
                                    }
                            	    list(props.Connectors[indexC].inConnectors).map((i) =>{
                                            const topChild = ReactDOM.findDOMNode(component.state.dragGasRefsIn[item.index][i]).offsetTop;
                                            const leftChild = ReactDOM.findDOMNode(component.state.dragGasRefsIn[item.index][i]).offsetLeft;
                            		        props.updateConnectorPosition(id,i,'input',top+topChild,left+leftChild);
                            		    });
                                            const topChild = ReactDOM.findDOMNode(component.state.dragGasRefsOut[item.index][0]).offsetTop;
                                            const leftChild = ReactDOM.findDOMNode(component.state.dragGasRefsOut[item.index][0]).offsetLeft;
                            		        props.updateConnectorPosition(id,0,'output',top+topChild,left+leftChild);    
                            	    props.updateLinePosition(id,indexC);
            	                }else{
                	                    if(item.source === 'electricityZone'){
                    	                
                        	                const delta = monitor.getDifferenceFromInitialOffset();
                                    		const left = Math.round(props.dragItemElectricity[item.index].left + delta.x);
                                    		const top = Math.round(props.dragItemElectricity[item.index].top + delta.y);
                                    	    props.updateAdderPosition(left,top,item,'electricity');
                                    	    let indexC;
                                    	    let id = props.dragItemElectricity[item.index].id;
                                    	    for (let i = 0; i< props.Connectors.length; i++) {
                                                    if(props.Connectors[i].id === props.dragItemElectricity[item.index].id){
                                                        indexC = i;
                                                       break;
                                                    }
                                            }
                                    	    list(props.Connectors[indexC].inConnectors).map((i) =>{
                                                    const topChild = ReactDOM.findDOMNode(component.state.dragElectricityRefsIn[item.index][i]).offsetTop;
                                                    const leftChild = ReactDOM.findDOMNode(component.state.dragElectricityRefsIn[item.index][i]).offsetLeft;
                                    		        props.updateConnectorPosition(id,i,'input',top+topChild,left+leftChild);
                                    		    });
                                                    const topChild = ReactDOM.findDOMNode(component.state.dragElectricityRefsOut[item.index][0]).offsetTop;
                                                    const leftChild = ReactDOM.findDOMNode(component.state.dragElectricityRefsOut[item.index][0]).offsetLeft;
                                    		        props.updateConnectorPosition(id,0,'output',top+topChild,left+leftChild);    
                                    		   
                                    		props.updateLinePosition(id,indexC);
                    	                }
        	                    }
        	            }
        	        }
        	    
       
    		}
	    
	}
};



/*-------------------------------------------------------------------------------------------------------------------*/
const mapStateToProps = state => {
    return{
       
       dragItem: state.machine.dragItem,
       collection: state.machine.collection,
       update: state.machine.update,
       dragItemWater: state.adder.dragItemWater,
       dragItemGas: state.adder.dragItemGas,
       dragItemElectricity: state.adder.dragItemElectricity,
       lines: state.connector.lines,
       Connectors: state.connector.Connectors,
       v: state.connector.v,
       process:state.machine.process
    };
    
};

/*-------------------------------------------------------------------------------------------------------------------*/
const mapDispatchToProps = dispatch => {
    return{
        handleSelected(SelectedKey,process,collection){
            
             switch (SelectedKey) {
                 case 1.2:
                     const ref = firebase.database().ref().child("procesos/"+process)
                     ref.on("value" , (snapshot) => {
                         const objeto = snapshot.key;
                         console.log(objeto) ;
                     }) ;
                     break;
                 case 1.3:
                     saveproceso(process,collection)
                     break;
                 case 2:
                     dispatch({type:"SHOW_MACHINE",show:true});
                     break;
                case 3: 
                    dispatch({type:"SHOW_OTHER_PROCESS",show:true});
                    break;
                case 4: 
                    dispatch({type:"SHOW_WATER",show:true});
                    break;
                case 5: 
                    dispatch({type:"SHOW_GAS",show:true});
                    break;
                 case 6: 
                    dispatch({type:"SHOW_ELECTRICITY",show:true});
                    break;
                case 8: 
                     dispatch({type:"SHOW_HELP",show:true});
                    break;
                 
                 default:
                     // code
             }
            },
        updateMachinePosition(left,top,item){
            dispatch({type:"UPDATE_POSITION",left:left,top:top,index:item.index});
        },
        updateAdderPosition(left,top,item,source){
            dispatch({type:"UPDATE_ADDER_POSITION",left:left,top:top,index:item.index,source:source});
        },
        createDragItem(item,left,top){
            dispatch({type:"CREATE_DRAG_ITEM",id:item.index,left:left,top:top});
        },
        updateConnectorPosition(id,index,source,top,left){
            dispatch({type:'UPDATE_CONNECTOR_POSITION',
                            id:id,
                            index:index,
                            source:source,
                            top:top,
                            left:left
            });
        },
        updateLinePosition(id,indexC){
            dispatch({type:'UPDATE_LINE_POSITION',id:id,indexC:indexC});
        },
        updateParamsConnectors(indexC,index,param1,param2,source){
            dispatch({type:'UPDATE_PARAMS_CONNECTORS',indexC:indexC,index:index,param1:param1,param2:param2,source:source});
        },
        updateLabel(){
            dispatch({type:'UPDATE_LABEL'});
        },
        updateIndexValue(v){
            dispatch({type:'UPDATE_INDEX_VALUE',v:v});
        },
        newSimulation(){
            dispatch({type:'NEW_SIMULATION'});
        },
        deleteLine(index){
            dispatch({type:'DELETE_LINE',id:index,idToDelete:[],source:'line'})
        }
        
        
    };
    
};



const ContainerMain = flow(DropTarget([ItemTypes.MACHINE,ItemTypes.ADDER_WATER,ItemTypes.ADDER_GAS,ItemTypes.ADDER_ELECTRICITY],
                    boxTarget,collect),connect(mapStateToProps,mapDispatchToProps,null,{ withRef: true }),DragDropContext(HTML5Backend))(Main);

export default ContainerMain;