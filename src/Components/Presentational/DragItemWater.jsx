import React from 'react';
import ReactDOM from 'react-dom';
import { dragSource } from 'react-dnd';
import flow from 'lodash/flow';
import { DragSource } from 'react-dnd';
import { connect }    from 'react-redux';
import { Glyphicon } from 'react-bootstrap';

import { ItemTypes } from '../../ItemTypes.jsx';
import DragItemCout from './DragItemCout.jsx';
import DragItemCin from './DragItemCin.jsx'


class DragItemWater extends React.Component{
      
          componentWillMount(){
             const {dragItemWater, index, createConnector,createCollection} = this.props;
             const id = dragItemWater[index].id;
             range(dragItemWater[index].inputs).map((i) => createConnector(id,'input',i));
             range(dragItemWater[index].outputs).map((i) => createConnector(id,'output',i));
             createCollection(id);
             this.dragRefIn = [];
             this.dragRefOut = [];
        }
/*-------------------------------------------------------------------------------------------------------*/
    componentDidMount(){
             const {dragItemWater, index, updateConnectorPosition} = this.props;
             const id = dragItemWater[index].id;
             const topParent = ReactDOM.findDOMNode(this).offsetTop;
             const leftParent = ReactDOM.findDOMNode(this).offsetLeft;
             range(dragItemWater[index].inputs).map((i) => {
                 const topChild = ReactDOM.findDOMNode(this.dragRefIn[i]).offsetTop;
                 const leftChild = ReactDOM.findDOMNode(this.dragRefIn[i]).offsetLeft;
                 updateConnectorPosition(id,i,'input',topParent+topChild,leftParent+leftChild)});
                 
             range(dragItemWater[index].outputs).map((i) => {
                 const topChild = ReactDOM.findDOMNode(this.dragRefOut[i]).offsetTop;
                 const leftChild = ReactDOM.findDOMNode(this.dragRefOut[i]).offsetLeft;
                 updateConnectorPosition(id,i,'output',topParent+topChild,leftParent+leftChild)});
             this.props.handleRefs(this.dragRefIn,this.dragRefOut,index,'water');

        }
/*-------------------------------------------------------------------------------------------------------*/
    shouldComponentUpdate(nextProps, nextState) {
            if ((this.props.top != nextProps.top ) || (this.props.left != nextProps.left) 
                || this.props.Connectors != nextProps.Connectors) {
              
              return true;
            } 
            return false;       
    }
/*--------------------------------------------------------------------------------------------------------*/
 componentDidUpdate(prevProps){
        if(prevProps != null){
              const  {index} = this.props;
            console.log('entroo')
            this.props.handleRefs(this.dragRefIn,this.dragRefOut,index,'water'); 
        }
    }
    render(){
         const {connectDragSource,index,dragItemWater,createLine,Connectors,deleteAdder} = this.props;
         const id = dragItemWater[index].id;
         console.log(Connectors,'Connectors-water')
        return(connectDragSource(<div style={style(dragItemWater[index])} key={index}> 
    
    							<div className='containerFlex adderInput'>
        							   <div>{range(dragItemWater[index].inputs).map( i =>
                							   {
                							    return  <DragItemCin key={i} ref={(ref) => this.dragRefIn[i] = ref} index={i}
                							                         indexDragI={index} Connectors={Connectors}
                							                         itemSource={dragItemWater} createLine={createLine}
                							                         type={dragItemWater[index].type}>
                							             </DragItemCin>;

                							   })}
        							   </div>
    							   
    							 </div>
    							 
    							 <div className='containerFlex center adderCenter'>
        							   <div><h4>{dragItemWater[index].name}</h4></div>
        							   
        							   <div className="icons">
        							        <Glyphicon glyph="trash" onClick={() => deleteAdder(id,index,'zone','water')}/>
        							   </div>
    							 </div>
    							 
    							 <div className='containerFlex adderOutput'>
    							 
        							 <div>{range(dragItemWater[index].outputs).map( i =>
                							   {
                							    return  <DragItemCout key={i}ref={(ref) => this.dragRefOut[i] = ref} index={i} 
                							                          indexDragI={index} Connectors={Connectors}
                							                          itemSource={dragItemWater}
                							                          type={dragItemWater[index].type}>
                							            </DragItemCout>;   
                							   })}
    							    </div>
    							 </div>
    							
    						</div>));
    }
}

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
	
	if(array.inputs > array.outputs ){
	    for (let i = 1 ;i < array.inputs ; i++ ) {
	        height = height + 14;
	    }
	}else{
	    for (let i = 1 ;i < array.outputs ; i++ ) {
	        height = height + 14;
	    }
	}
	return{
      
    	display:'flex',
    	flexDirection:'row',
    	position: 'absolute',
    	border: '1px solid black',
    	padding: '0.5rem 1rem',
    	textAlign: 'center',
    	padding:'0px',
    	cursor: 'move',
    	width: '100px',
    	borderRadius: '25px',
    	height: height.toString() + 'px',
	left: left +'px',
	top: top +'px'
	    
	};
	
};


const zoneSource = {
    beginDrag(props){
        let source = 'waterZone';
        let id;
        const { index, dragItemWater } = props;
        id = dragItemWater[index].id;
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
        deleteAdder(id,index,source,sourceAdder){
           dispatch({type:'DELETE_ADDER',index:index,source:sourceAdder}),
           dispatch({type:'DELETE_CONNECTOR',id:id,idToDelete:[],source:source}),
           dispatch({type:'DELETE_LINE',id:id})
       }
         
    };
    
};



export default flow(DragSource(ItemTypes.ADDER_WATER,zoneSource,collect),connect(mapStateToProps,mapDispatchToProps))(DragItemWater);
