import React from 'react';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../../ItemTypes.jsx';


const DragItemZone = ({connectDragSource,id,dragItem}) =>{
	
    return(connectDragSource(<div style={style(dragItem[id])} key={id}> {dragItem[id].name}</div>));
}



const style = (array) => {
	let height = 50;
	let left = array.left.toString();
	let top = array.top.toString();
	
	if(array.inSelected.length > array.outSelected.length ){
	    for (let i = 1 ;i < array.inSelected.length ; i++ ) {
	        height = height + 10;
	    }
	}else{
	    for (let i = 1 ;i < array.outSelected.length ; i++ ) {
	        height = height + 10;
	    }
	}
	return{

    	position: 'absolute',
    	border: '1px solid gray',
    	backgroundColor: 'white',
    	textAlign: 'center',
    	padding: '0.5rem 1rem',
    	cursor: 'move',
    	width: '140px',
    	height: height.toString() + 'px',
	    left: left+'px',
	    top: top+'px'
	};
	
};

const zoneSource = {
    beginDrag(props){
        let source = 'zone';
        const { id } = props;
        return { id , source};
    }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}



export default DragSource(ItemTypes.MACHINE,zoneSource,collect)(DragItemZone)