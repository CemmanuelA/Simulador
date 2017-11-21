import React from 'react';
import ReactDOM from 'react-dom';
import flow from 'lodash/flow';
import { DragSource } from 'react-dnd';
import { connect }    from 'react-redux';
import { Glyphicon } from 'react-bootstrap';

import { ItemTypes } from '../../ItemTypes.jsx';
import DragItemCout from './DragItemCout.jsx';
import DragItemCin from './DragItemCin.jsx';

class DragItemZone extends React.Component{

    
    componentWillMount(){
             const {dragItem, index, createConnector,createCollection} = this.props;
             const id = dragItem[index].id;
             range(dragItem[index].inSelected.length).map((i) => createConnector(id,'input',i));
             range(dragItem[index].outSelected.length).map((i) => createConnector(id,'output',i));
             createCollection(id);
             this.dragRefIn = [];
             this.dragRefOut = [];
             
        }
/*--------------------------------------------------------------------------------------------------------*/
    /*componentWillReceiveProps(nextProps){
        if(this.props.dragItem != nextProps.dragItem){
             const {dragItem, index, createConnector,createCollection} = this.props;
             const id = dragItem[index].id;
             range(dragItem[index].inSelected.length).map((i) => createConnector(id,'input',i));
             range(dragItem[index].outSelected.length).map((i) => createConnector(id,'output',i));
             createCollection(id);
            
        }
    }*/
/*-------------------------------------------------------------------------------------------------------*/
    componentDidMount(){
             const {dragItem, index, updateConnectorPosition} = this.props;
             const id = dragItem[index].id;
             const topParent = ReactDOM.findDOMNode(this).offsetTop;
             const leftParent = ReactDOM.findDOMNode(this).offsetLeft;
            range(dragItem[index].inSelected.length).map((i) => {
                 const topChild = ReactDOM.findDOMNode(this.dragRefIn[i]).offsetTop;
                 const leftChild = ReactDOM.findDOMNode(this.dragRefIn[i]).offsetLeft;
                 updateConnectorPosition(id,i,'input',topParent+topChild,leftParent+leftChild)});
                 
             range(dragItem[index].outSelected.length).map((i) => {
                 const topChild = ReactDOM.findDOMNode(this.dragRefOut[i]).offsetTop;
                 const leftChild = ReactDOM.findDOMNode(this.dragRefOut[i]).offsetLeft;
                 updateConnectorPosition(id,i,'output',topParent+topChild,leftParent+leftChild)});
            this.props.handleRefs(this.dragRefIn,this.dragRefOut,index,'machine');
           

        }
/*-------------------------------------------------------------------------------------------------------*/
    shouldComponentUpdate(nextProps){
            if((nextProps.top != this.props.top || nextProps.left != this.props.left) ||
                nextProps.Connectors != this.props.Connectors || (nextProps.update == false && this.props.update == true)){
            
                return true
            }else{
                return false;
            }
    }
/*-------------------------------------------------------------------------------------------------------*/
    
    componentDidUpdate(prevProps){
        if(prevProps != null){
            const {dragItem, index, updateConnectorPosition} = this.props;
            if((prevProps.update == true && this.props.update == false)){
                const id = dragItem[index].id;
                const topParent = ReactDOM.findDOMNode(this).offsetTop;
                const leftParent = ReactDOM.findDOMNode(this).offsetLeft;
                range(dragItem[index].inSelected.length).map((i) => {
                 const topChild = ReactDOM.findDOMNode(this.dragRefIn[i]).offsetTop;
                 const leftChild = ReactDOM.findDOMNode(this.dragRefIn[i]).offsetLeft;
                 updateConnectorPosition(id,i,'input',topParent+topChild,leftParent+leftChild)});
                 
             range(dragItem[index].outSelected.length).map((i) => {
                 const topChild = ReactDOM.findDOMNode(this.dragRefOut[i]).offsetTop;
                 const leftChild = ReactDOM.findDOMNode(this.dragRefOut[i]).offsetLeft;
                 updateConnectorPosition(id,i,'output',topParent+topChild,leftParent+leftChild)});
            }
            this.props.handleRefs(this.dragRefIn,this.dragRefOut,index,'machine'); 
        }
    }
/*-------------------------------------------------------------------------------------------------------*/
	
    render(){
        const {connectDragSource,index,dragItem,createLine,Connectors,deleteDragMachine} = this.props;
        const id = dragItem[index].id;
        console.log(Connectors,'CONNECTORS')
        return(connectDragSource(<div style={style(dragItem[index])} key={index}> 
    
    							<div className='containerFlex'>
        							   <div>{range(dragItem[index].inSelected.length).map( i =>
                							   {
                							    return  <DragItemCin key={i}  ref={(ref) => this.dragRefIn[i] = ref} index={i} 
                							                         indexDragI={index} Connectors={Connectors}
                							                         itemSource={dragItem} createLine={createLine}
                							                         type={dragItem[index].inSelected[i]}>
                							             </DragItemCin>;

                							   })}
        							   </div>
    							   
    							 </div>
    							 
    							 <div className='containerFlex center'>
        							   <div><strong>{dragItem[index].name}</strong></div>
        							   <div><strong>{dragItem[index].id.substr(4,5)}</strong></div>
        							   <div className="icons">
        							        <Glyphicon glyph="trash" onClick={() => deleteDragMachine(id,index,'zone')} />
        							   </div>
    							 </div>
    							 
    							 <div className='containerFlex'>
    							 
        							 <div>{range(dragItem[index].outSelected.length).map( i =>
                							   {
                							    return  <DragItemCout key={i} ref={(ref) => this.dragRefOut[i] = ref} index={i} 
                							                          indexDragI={index} Connectors={Connectors}
                							                          itemSource={dragItem} type={dragItem[index].outSelected[i]}>
                							            </DragItemCout>;   
                							   })}
    							    </div>
    							 </div>
    							
    						</div>));
    }
    						
    						
    						
};




const range = (num) =>{
    let array = [];

    for (let i = 0 ; i < num ; i++){
        
        array[i] = i;
    }
    return array;

};


const style = (array) => {
	let height = 60;
	let left = array.left.toString();
	let top = array.top.toString();
	
	if(array.inSelected.length > array.outSelected.length ){
	    for (let i = 1 ;i < array.inSelected.length ; i++ ) {
	        height = height + 14;
	    }
	}else{
	    for (let i = 1 ;i < array.outSelected.length ; i++ ) {
	        height = height + 14;
	    }
	}
	return{
      
    	display:'flex',
    	flexDirection:'row',
    	position: 'absolute',
    	border: '1px solid gray',
    	padding: '0.5rem 1rem',
    	textAlign: 'center',
    	padding:'0px',
    	cursor: 'move',
    	width: '140px',
    	height: height.toString() + 'px',
	    left: left +'px',
	    top: top +'px'
	    
	};
	
};


const zoneSource = {
    beginDrag(props){
        let source = 'machineZone';
        let id;
        const { index, dragItem } = props;
        id = dragItem[index].id;
        return { id, index, source};
    }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const mapStateToProps = state =>{
    
    return{
        Connectors: state.connector.Connectors,
        inConnectors: state.connector.inConnectors,
        outConnectors: state.connector.outConnectors
         
    };
    
};

const mapDispatchToProps = dispatch =>{
    
    return{
        
        createConnector(id,source,index){
                dispatch({type:'CREATE_CONNECTOR',id:id,source:source,index:index});
         },
        createCollection(id){
            dispatch({type:'CREATE_COLLECTION',id:id});
        },
        
        createLine(indexIn,idOut,idSourceIn,idSourceOut,x0,x1,y0,y1){
            dispatch({type:'CREATE_LINE',
                            indexIn:indexIn,
                            idOut:idOut,
                            idSourceIn:idSourceIn,
                            idSourceOut:idSourceOut,
                            x0:x0,
                            x1:x1, 
                            y0:y0,
                            y1:y1});
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
       deleteDragMachine(id,index,source){
           dispatch({type:'DELETE_DRAG_MACHINE',index:index}),
           dispatch({type:'DELETE_CONNECTOR',id:id,idToDelete:[],source:source}),
           dispatch({type:'DELETE_LINE',id:id,idToDelete:[],source:source})
       },
           
       

         
    };
    
};



export default flow(DragSource(ItemTypes.MACHINE,zoneSource,collect),connect(mapStateToProps,mapDispatchToProps,null,{ withRef: true }))(DragItemZone);