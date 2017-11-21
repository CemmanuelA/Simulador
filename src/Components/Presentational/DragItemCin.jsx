import React from 'react';
import ReactDOM from 'react-dom';
import { Alert } from 'react-bootstrap';
import { DropTarget } from 'react-dnd';

import { ItemTypes } from '../../ItemTypes.jsx';


let drop_item;

class DragItemCint extends React.Component{
    constructor(props){
        super(props)
        this.state = {showAlert:false}
    }
    
	
	render(){
	    const {id,connectDropTarget,isOver,canDrop} = this.props;
	    
        return(connectDropTarget(<div key={id} style={styleConectors}>
    
                                    {isOver && !canDrop && renderOverlay('red')}
				                    {!isOver && canDrop && renderOverlay('yellow')}
				                    {isOver && canDrop && renderOverlay('green')}
				                    {this.state.showAlert ?
				                     <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
				                     <p>No se pueden unir conectores de distintos tipos</p>
				                     </Alert>
				                     :
				                     null
				                    }
                                 </div>));
    								
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
/*-------------------------------------------------------------------------------------------------------------------*/
const renderOverlay = (color) => {
		return (
			<div className="containerFlex"
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					height: '8px',
					width: '8px',
					zIndex: 1,
					opacity: 0.5,
					backgroundColor: color,
				}}
			/>
		);
	};



/*-------------------------------------------------------------------------------------------------------------------*/
function collect (connect,monitor){
    return{
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}
/*-------------------------------------------------------------------------------------------------------------------*/
const connectorTarget = {
  /*canDrop(props,monitor){
        const availableConnectors = []
        const item = monitor.getItem();
        for (let i = 0; i < props.Connectors.length; i++) {
                if(props.dMachId != i){
                console.log(props.dMachId != i)
                    for (let j = 0; j < props.Connectors[i].inConnectors.length; j++) {
                        console.log(props.Connectors[i].id !== item.machId)
                        if(props.Connectors[i].inConnectors[j].canDrop){
                            availableConnectors.push(props.Connectors[i].inConnectors[j].id);
                        }
                
                    }
                    
                }
               
                
            }  
        console.log(availableConnectors)
        return availableConnectors[0];
        
    },*/
    drop(props,monitor,component){
        let item = monitor.getItem();
        let indexCin;
        let indexCout = item.indexC;
        const { createLine, indexDragI, index, Connectors,itemSource, type} = props;
        
        for (let i = 0; i< Connectors.length; i++) {
                        if(Connectors[i].id === itemSource[indexDragI].id){
                            indexCin = i;
                           break
                        }
                    }
        const x0 = Connectors[indexCout].outConnectors[item.index].left + 3;
        const y0 = Connectors[indexCout].outConnectors[item.index].top + 3 ;
        const x1 = Connectors[indexCin].inConnectors[index].left + 3;
        const y1 = Connectors[indexCin].inConnectors[index].top + 3 ;
        let idDragI = itemSource[indexDragI].id;
        console.log(item.type)
        console.log(type)
        debugger
       if(item.type === type){
            createLine(index,item.idOut,idDragI,item.idDragI,x0,x1,y0,y1);
       }else{
           alert('no se pueden conectar distintos tipos');
           //component.setState({showAlert:true})
           //setTimeout(()=>(component.setState({showAlert:false})),3000)
       }
        
    }
	
};



export default DropTarget(ItemTypes.CONNECTOR,connectorTarget,collect)(DragItemCint);