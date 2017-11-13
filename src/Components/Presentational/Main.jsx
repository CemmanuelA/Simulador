import React from 'react';
import ReactDOM from 'react-dom';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { DragDropContext, DropTarget} from 'react-dnd';
import { Stage, Layer } from 'react-konva';
import HTML5Backend from 'react-dnd-html5-backend';
import {Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Row, Col } from 'react-bootstrap';

import  { ItemTypes }       from '../../ItemTypes.jsx';
import  DragItemZone        from './DragItemZone.jsx';
import  DragItemWater       from './DragItemWater.jsx';
import  DragItemGas         from './DragItemGas.jsx';
import  DragItemElectricity from './DragItemElectricity.jsx';
import  ContainerProcess    from  '../Containers/ContainerProcess.jsx';
import  ContainerMachine    from '../Containers/Modals/ContainerMachine.jsx';
import  OtherProcess        from './Modals/OtherProcess.jsx';
import  Water               from './Modals/Water.jsx';
import  Gas                 from './Modals/Gas.jsx';
import Electricity          from './Modals/Electricity.jsx';







class Main extends React.Component{
    
    
        constructor(props){
            super(props);
            this.state={dragMachineRefsIn:[],
                        dragWaterRefsIn:[],
                        dragGasRefsIn:[],
                        dragElectricityRefsIn:[],
                        dragMachineRefsOut:[],
                        dragWaterRefsOut:[],
                        dragGasRefsOut:[],
                        dragElectricityRefsOut:[]
                        
            }
            this.handleRefs = this.handleRefs.bind(this);
        }
 
    handleRefs(valsIn,valsOut,source){
        if(source === 'machine'){
            this.setState({dragMachineRefsIn:valsIn,
                           dragMachineRefsOut:valsOut});
        }else{
            if(source === 'water'){
                this.setState({dragWaterRefsIn:valsIn,
                               dragWaterRefsOut:valsOut});
            }else{ 
                if(source === 'gas'){
                    this.setState({dragGasRefsIn:valsIn,
                                   dragGasRefsOut:valsOut});
                }else{
                    if(source === 'electricity'){
                        this.setState({dragElectricityRefsIn:valsIn,
                                       dragElectricityRefsOut:valsOut});
                    }
                }
            }
        }
    }

       render(){
              const {handleSelected,connectDropTarget,isOver,dragItem,lines,dragItemWater,dragItemGas,dragItemElectricity,update} = this.props;

              return (<div id="mainContainer">
                  
                            <Row>
                                <Col sm={12} md={12} lg={12}>
                                 
                                         <Nav id="nav" bsStyle="tabs" onSelect={(SelectedKey)=>handleSelected(SelectedKey)}>
                                             <NavDropdown  className="tab" eventKey={1} title="Proyecto" id="navDropdown">
                                                        
                                                <MenuItem  eventKey={1.1} >Nuevo</MenuItem>
                                                <MenuItem  eventKey={1.2} >Abrir</MenuItem>
                                                <MenuItem  eventKey={1.3} >Guardar</MenuItem>
                                             </NavDropdown>
                                             <NavItem eventKey={2}><Glyphicon glyph="print"/> Agregar máquina </NavItem>
                                             <NavItem eventKey={3}><Glyphicon glyph="plus-sign"/> Agregar proceso</NavItem>
                                             <NavItem eventKey={4}><Glyphicon glyph="tint"/>Sumador de agua </NavItem>
                                             <NavItem eventKey={5}><Glyphicon glyph="fire"/> Sumador de gas </NavItem>
                                             <NavItem eventKey={6}><Glyphicon glyph="flash"/> Sumador de electricidad </NavItem>
                                             <NavItem eventKey={7} disabled><Glyphicon glyph="play"/> Simular </NavItem>
                                        </Nav>
                              
                                </Col>
                            </Row>
                             <ContainerMachine/>
                             <OtherProcess/>
                             <ContainerProcess />
                             <Water/>
                             <Gas/>
                             <Electricity />
                            {connectDropTarget(
                                        <div className="dropZone" >
                                            {list(dragItem).map( i =>{
                                
                                                return <DragItemZone dragItem={dragItem} key={i} index={i} top={dragItem[i].top} 
                                                                      left={dragItem[i].left} handleRefs={this.handleRefs} update={update}/>})}
                                            {list(dragItemWater).map( i =>(
                                
                                                <DragItemWater dragItemWater={dragItemWater} key={i} index={i} top={dragItemWater[i].top} 
                                                               left={dragItemWater[i].left} handleRefs={this.handleRefs}/>))}
                                                              
                                            {list(dragItemGas).map( i =>(
                                
                                                <DragItemGas dragItemGas={dragItemGas}  key={i} index={i} top={dragItemGas[i].top} 
                                                              left={dragItemGas[i].left} handleRefs={this.handleRefs}/>))}
                                           
                                            {list(dragItemElectricity).map( i =>(
                                                <DragItemElectricity dragItemElectricity={dragItemElectricity} key={i} index={i} 
                                                                     top={dragItemElectricity[i].top} left={dragItemElectricity[i].left}
                                                                     handleRefs={this.handleRefs}/>))}
                                                              
                                        <svg height="100%" width="100%">
                                            {list(lines).map(i =>(
                                                <line key={i} x1={lines[i].x0} y1={lines[i].y0} 
                                                          x2={lines[i].x1} y2={lines[i].y1} 
                                                          style={{stroke:"rgb(255,0,0)",strokeWidth:"2"}} />
                                                            ))}
                                        </svg>
                                        </div>
                                   
                                )}
                 
                   
                 </div>);
           
           
       }

}


/*-------------------------------------------------------------------------------------------------------------------*/
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
    		    console.log("LIST")
    		    console.log(left)
    		    console.log(top)
    		    props.createDragItem(item,left,top);
    		}else{
        	        if(item.source === 'machineZone'){
        	            	const delta = monitor.getDifferenceFromInitialOffset();
                    		console.log(item.index)
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
                            console.log(props.updateConnectorPosition)
                    	    list(props.Connectors[indexC].inConnectors).map((i) =>{
                    	           
                                    const topChild = ReactDOM.findDOMNode(component.state.dragMachineRefsIn[i]).offsetTop;
                                    const leftChild = ReactDOM.findDOMNode(component.state.dragMachineRefsIn[i]).offsetLeft;
                    		        props.updateConnectorPosition(id,i,'input',top+topChild,left+leftChild);
                    		    });
                    	    list(props.Connectors[item.index].outConnectors).map((i) =>{
                                    const topChild = ReactDOM.findDOMNode(component.state.dragMachineRefsOut[i]).offsetTop;
                                    const leftChild = ReactDOM.findDOMNode(component.state.dragMachineRefsOut[i]).offsetLeft;
                    		        props.updateConnectorPosition(id,i,'output',top+topChild,left+leftChild);    
                    		    });
        	            props.updateLinePosition(id,indexC);
        	        }else{
        	            if(item.source === 'waterZone'){
        	                
        	                const delta = monitor.getDifferenceFromInitialOffset();
                    		console.log(item.index)
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
                                    const topChild = ReactDOM.findDOMNode(component.state.dragWaterRefsIn[i]).offsetTop;
                                    const leftChild = ReactDOM.findDOMNode(component.state.dragWaterRefsIn[i]).offsetLeft;
                    		        props.updateConnectorPosition(id,i,'input',top+topChild,left+leftChild);
                    		    });
                    	    list(props.Connectors[item.index].outConnectors).map((i) =>{
                                    const topChild = ReactDOM.findDOMNode(component.state.dragWaterRefsOut[i]).offsetTop;
                                    const leftChild = ReactDOM.findDOMNode(component.state.dragWaterRefsOut[i]).offsetLeft;
                    		        props.updateConnectorPosition(id,i,'output',top+topChild,left+leftChild);    
                    		    });
                    	    props.updateLinePosition(id,indexC);
        	            }else{
            	                if(item.source === 'gasZone'){
            	                
                	                const delta = monitor.getDifferenceFromInitialOffset();
                            		console.log(item.index)
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
                                            const topChild = ReactDOM.findDOMNode(component.state.dragGasRefsIn[i]).offsetTop;
                                            const leftChild = ReactDOM.findDOMNode(component.state.dragGasRefsIn[i]).offsetLeft;
                            		        props.updateConnectorPosition(id,i,'input',top+topChild,left+leftChild);
                            		    });
                            	    list(props.Connectors[item.index].outConnectors).map((i) =>{
                                            const topChild = ReactDOM.findDOMNode(component.state.dragGasRefsOut[i]).offsetTop;
                                            const leftChild = ReactDOM.findDOMNode(component.state.dragGasRefsOut[i]).offsetLeft;
                            		        props.updateConnectorPosition(id,i,'output',top+topChild,left+leftChild);    
                            		    });
                            	    props.updateLinePosition(id,indexC);
            	                }else{
                	                    if(item.source === 'electricityZone'){
                    	                
                        	                const delta = monitor.getDifferenceFromInitialOffset();
                                    		console.log(item.index)
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
                                                    const topChild = ReactDOM.findDOMNode(component.state.dragElectricityRefsIn[i]).offsetTop;
                                                    const leftChild = ReactDOM.findDOMNode(component.state.dragElectricityRefsIn[i]).offsetLeft;
                                    		        props.updateConnectorPosition(id,i,'input',top+topChild,left+leftChild);
                                    		    });
                                    	    list(props.Connectors[item.index].outConnectors).map((i) =>{
                                                    const topChild = ReactDOM.findDOMNode(component.state.dragElectricityRefsOut[i]).offsetTop;
                                                    const leftChild = ReactDOM.findDOMNode(component.state.dragElectricityRefsOut[i]).offsetLeft;
                                    		        props.updateConnectorPosition(id,i,'output',top+topChild,left+leftChild);    
                                    		    });
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
       update: state.machine.update,
       dragItemWater: state.adder.dragItemWater,
       dragItemGas: state.adder.dragItemGas,
       dragItemElectricity: state.adder.dragItemElectricity,
       lines: state.connector.lines,
       Connectors: state.connector.Connectors
    };
    
};
/*-------------------------------------------------------------------------------------------------------------------*/
const mapDispatchToProps = dispatch => {
    return{
        handleSelected(SelectedKey){
             switch (SelectedKey) {
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
        }
        
    };
    
};



export default flow(DropTarget([ItemTypes.MACHINE,ItemTypes.ADDER_WATER,ItemTypes.ADDER_GAS,ItemTypes.ADDER_ELECTRICITY],
                    boxTarget,collect),connect(mapStateToProps,mapDispatchToProps,null,{ withRef: true }),DragDropContext(HTML5Backend))(Main);