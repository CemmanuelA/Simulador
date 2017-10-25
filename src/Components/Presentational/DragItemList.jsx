import React from 'react';
import { DragSource} from 'react-dnd';
import { ListGroupItem,  Glyphicon } from 'react-bootstrap';

import { ItemTypes } from '../../ItemTypes.jsx';


const DragItemList = ({connectDragSource,collection,handleProperties,isDragging,id,deleteMachine,updateMachine}) =>{
  
  return(  connectDragSource(<div>
                                <ListGroupItem  className="list-item" onClick={() => handleProperties(id)} >
                                  {collection[id].name}
                                </ListGroupItem>
                                <div className="span-container">
                                  <Glyphicon id="firstSpan"glyph="cog" onClick={() => updateMachine(id)}/>
                                  <Glyphicon glyph="trash" onClick={() => deleteMachine(id)}/>
                                </div>
                            </div>)
      );
};


const listSource = {
    beginDrag(props){
        let source = 'list';
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


export default DragSource(ItemTypes.MACHINE,listSource,collect)(DragItemList)