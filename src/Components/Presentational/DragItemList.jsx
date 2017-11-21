import React from 'react';
import { DragSource} from 'react-dnd';
import { ListGroupItem,  Glyphicon } from 'react-bootstrap';

import { ItemTypes } from '../../ItemTypes.jsx';


const DragItemList = ({connectDragSource,collection,handleProperties,isDragging,index,deleteMachine,updateMachine,dragItem,
                      onClickListItem}) =>{
                        
  return(  connectDragSource(<div  className="list-item" >
                                <ListGroupItem onClick={() => handleProperties(index)} >
                                    {collection[index].name} 
                                </ListGroupItem>
                                
                                <ListGroupItem className="spanContainer">
                                  <Glyphicon id="firstSpan" glyph="cog" onClick={() => updateMachine(index)}/>
                                  <Glyphicon glyph="trash" 
                                  onClick={() => deleteMachine(index, idToDelete(dragItem,collection[index].machineId),'list')}/>
                                </ListGroupItem>
                            </div>)
      );
};

const idToDelete = (array,id) =>{
    const idToDelete = [];
    for(let i = 0; i < array.length; i++){
      if(array[i].machineId == id){
        idToDelete.push(array[i].id);
      }
    }
    return idToDelete;
}
const listSource = {
    beginDrag(props){
        let source = 'list';
        let id;
        const { collection, index } = props;
        id = collection[index].machineId;
        return { id, index, source};
    }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


export default DragSource(ItemTypes.MACHINE,listSource,collect)(DragItemList)