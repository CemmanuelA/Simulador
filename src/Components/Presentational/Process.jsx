import React from 'react';
import { Col, PanelGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import Properties from './Properties.jsx';
import DragItemList from './DragItemList.jsx';

const list = (tam) =>{
    let List = [];
    for (let i = 0 ; i < tam ; i++){
        
        List[i] = i;
    }
   return List
};



const Process = ({collection, handleProperties, updateMachine, deleteMachine,dragItem}) => {
                    
  /*<Panel expanded={true} header="Otros procesos" eventKey="2" className='panelTab' bsStyle="primary"></Panel>*/      
        return(
            <div className="container">
                 <PanelGroup>
                    <Panel expanded={true} header="Máquinas" eventKey="1" className='panelTab' bsStyle="primary">
                        
                        <ListGroup>
                        {list(collection.length).map((i) =>( <DragItemList  key={i} index={i} collection={collection} handleProperties={handleProperties} 
                                                                            deleteMachine={deleteMachine} updateMachine={updateMachine} dragItem={dragItem}/>))}
                                                                    
                        </ListGroup>
                     
                    </Panel>
                    
                    <Panel expanded={true} header="Propiedades" eventKey="3" bsStyle="primary"><Properties/></Panel>
                </PanelGroup>
           
                
            </div>);
};

export default Process;