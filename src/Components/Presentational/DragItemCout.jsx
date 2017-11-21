import React from 'react';
import ReactDOM from 'react-dom';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../../ItemTypes.jsx';

    
class DragItemCout extends React.Component{
	
    
	render(){
	    const {id,connectDragSource} = this.props   
	
        return(connectDragSource(<div key={id} style={styleConectors}></div>));
    
	}
    								
    								
    					
};




const styleConectors ={
	
			height:'8px',
			width:'8px',
			borderRadius:'25px',
			backgroundColor:'#009933',
			marginTop:'4px',
			cursor:'pointer'

};

const connectorSource = {
    beginDrag(props){
        const {  indexDragI, Connectors, index, itemSource,type} = props;
        let idOut ;
        let indexC
        let idDragI = itemSource[indexDragI].id;
        for (let i = 0; i < Connectors.length; i++) {
                        if(Connectors[i].id === itemSource[indexDragI].id){
                            indexC = i;
                           break
                        }
                    }
        console.log(indexC,'idx conector')
        console.log(index,'idxOut')
        console.log(Connectors)
        idOut = Connectors[indexC].outConnectors[index].id;
        return { idOut, index, indexC, idDragI,type};
    }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}




export default DragSource(ItemTypes.CONNECTOR,connectorSource,collect)(DragItemCout);