import React from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { DragDropContext, DropTarget, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Row, Col } from 'react-bootstrap';

import  { ItemTypes }     from '../../ItemTypes.jsx';
import  DragItemZone      from './DragItemZone.jsx';
import  ContainerProcess  from    '../Containers/ContainerProcess.jsx';
import  ContainerMachine  from '../Containers/Modals/ContainerMachine.jsx';
import  OtherProcess      from './Modals/OtherProcess.jsx';
import  Water             from  './Modals/Water.jsx';







class Main extends React.Component{
    
  
    

       render(){
              const {handleSelected,createDragItem,connectDropTarget,connectDragSource,isOver,dragItem} = this.props;
              return (<div>
                  
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Nav id="nav" bsStyle="tabs" onSelect={(SelectedKey)=>handleSelected(SelectedKey)} >
                                 <NavDropdown  className="tab" eventKey={1} title="Proyecto" id="nav-dropdown">
                                            
                                    <MenuItem  eventKey={1.1} >Nuevo</MenuItem>
                                    <MenuItem  eventKey={1.2} >Abrir</MenuItem>
                                    <MenuItem  eventKey={1.3} >Guardar</MenuItem>
                                 </NavDropdown>
                                 <NavItem eventKey={2}><Glyphicon glyph="print"/> Agregar máquina </NavItem>
                                 <NavItem eventKey={3}><Glyphicon glyph="plus-sign"/> Agregar proceso</NavItem>
                                 <NavItem eventKey={4}><Glyphicon glyph="tint"/>Sumador de agua </NavItem>
                                 <NavItem eventKey={5}><Glyphicon glyph="fire"/> Sumador de gas </NavItem>
                                 <NavItem eventKey={6}><Glyphicon glyph="flash"/> Sumador de electricidad </NavItem>
                                 <NavItem eventKey={7}><Glyphicon glyph="play"/> Simular </NavItem>
                        </Nav>
                    </Col>
                    

                </Row>
                 <ContainerMachine/>
                 <OtherProcess/>
                 <ContainerProcess />
                 <Water/>
      
                {connectDropTarget( 
                    <div className="dropZone">{list(dragItem).map( i =>(<DragItemZone dragItem = {dragItem} key={i} id={i}/>))}</div>)}
                 
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
    		    const delta = monitor.getClientOffset();
    		    const left = Math.round(delta.x);
    		    const top = Math.round(delta.y);
    		    console.log("LIST")
    		    console.log(left)
    		    console.log(top)
    		    props.createDragItem(item,left,top);
    		}else{
        		const delta = monitor.getDifferenceFromInitialOffset();
        		const left = Math.round(component.props.dragItem[item.id].left + delta.x);
        		const top = Math.round(component.props.dragItem[item.id].top + delta.y);
        	    props.updatePosition(left,top,item);
       
    		}
	    
	}
};

/*-------------------------------------------------------------------------------------------------------------------*/
const mapStateToProps = state => {
    return{
       
       dragItem: state.machine.dragItem,
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
                 
                 default:
                     // code
             }
            },
        updatePosition(left,top,item){
            dispatch({type:"UPDATE_POSITION",left:left,top:top,id:item.id});
        },
        createDragItem(item,left,top){
            dispatch({type:"CREATE_DRAG_ITEM",id:item.id,left:left,top:top});
        }
        
    };
    
};



export default flow(DropTarget(ItemTypes.MACHINE,boxTarget,collect),connect(mapStateToProps,mapDispatchToProps),DragDropContext(HTML5Backend))(Main);